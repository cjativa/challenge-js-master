import { useEffect, useState } from 'react';
import { getFiles } from '../api';

/** Hook that fetches files from the server, providing the desired sort order of the items */
export const useFiles = (sortOrder, renameOccurred) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    getFiles(sortOrder)
      .then(files => setFiles(files));

  }, [sortOrder, renameOccurred]);

  return files;
}
