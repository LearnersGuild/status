const apiClient = require('../../gateway/codeship');

async function getProjects(req, res) {
  async function appendBuildsToProjects(project) {
    project.builds = (await apiClient.getBuilds(orgId, project.uuid)).builds;
    return project;
  }

  // Authenticate the user
  const authorization = await apiClient.authenticate();

  // Use their first organization UUID
  const orgId = authorization.organizations[0].uuid;

  // Get the organization's projects
  let projects = (await apiClient.getProjects(orgId)).projects;

  // Embed the latest builds into each project
  projects = await Promise.all(projects.map(appendBuildsToProjects));

  // Render the getProjects view with projects
  res.render('index', { projects });
}

module.exports = { getProjects };
