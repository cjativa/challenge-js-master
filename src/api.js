import { ASCENDING, DESCENDING } from './constants/sortOrders';

const files = [
  {
    id: 'the-file-id-1',
    versions: [
      { id: 1, name: 'test.txt' },
      { id: 0, name: 'test.txt' },
    ],
  },
  {
    id: 'the-file-id-2',
    versions: [
      { id: 1, name: 'recipes.doc' },
      { id: 0, name: 'recipes.doc' },
    ],
  },
  {
    id: 'the-file-id-3',
    versions: [
      { id: 1, name: 'picture.png' },
      { id: 0, name: 'photo.png' },
    ],
  },
];

/** Handles returning the files in a sorted order. Default sort is ascending.
 * Sorts the file list using the version of the file at index 0 of the versions list
 */
export async function getFiles(sortOrder = ASCENDING) {

  // Get copy of our files list so as to not overwrite the above constant -- as Array.sort sorts a list in place
  const fileList = [...files];

  // If the sort order is ascending, sort it by file name ascending
  if (sortOrder === ASCENDING) {
    return fileList.sort((a, b) => {

      const nameA = a.versions[0].name;
      const nameB = b.versions[0].name;

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;

    });
  }

  // Any other case will be descending
  else if (sortOrder === DESCENDING) {
    return fileList.sort((a, b) => {

      const nameA = a.versions[0].name;
      const nameB = b.versions[0].name;

      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }

      // names must be equal
      return 0;

    });
  }
}

export async function addFile(name) {
  // TODO: Implement this API to add a new file according to task (5).
}

/** Adds a new version to the version list of a file */
export async function addVersion(fileId, name) {
  // TODO: Insert the new version on the beginning of the stack according to task (1)

  // Find the file to add the version to
  const file = files.find(f => f.id === fileId);

  // Increment the current version id for adding to the list
  const versionId = file.versions[file.versions.length - 1].id + 1;

  // Add the new version to the top of the stack instead of end
  const newVersion = { id: versionId, name };
  file.versions = [newVersion, ...file.versions]
}
