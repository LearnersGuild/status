const apiClient = require('../../gateway/codeship');

async function list(req, res) {
  // Authenticate the user
  const authorization = await apiClient.postAuth();

  // Use their first organization UUID
  const orgId = authorization.organizations[0].uuid;

  // Get the organization's projects
  let { projects } = (await apiClient.listProjects(orgId)).projects;

  // Embed the latest builds into each project
  projects = await Promise.all(projects.map(async (project) => {
    project.builds = (await apiClient.listBuilds(orgId, project.uuid)).builds;
    return project;
  }));

  // Render the list view with projects
  res.render('list', { projects });
}

module.exports = { list };
