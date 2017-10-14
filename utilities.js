function deepCompare(objectA, objectB) {
  return Object.values(objectA).join('') === Object.values(objectB).join('');
}

function deepIncludes(array, object) {
  for (let i = 0; i < array.length; i += 1) {
    if (deepCompare(array[i], object)) {
      return true;
    }
  }
  return false;
}

function removeDuplicateProjects(projectsArray) {
  const result = [];
  for (let i = 0; i < projectsArray.length; i += 1) {
    const alreadyInResult = deepIncludes(result, projectsArray[i]);
    if (!alreadyInResult && projectsArray[i].repository_name !== null) {
      result.push(projectsArray[i]);
    }
  }
  return result;
}

module.exports = { removeDuplicateProjects };
