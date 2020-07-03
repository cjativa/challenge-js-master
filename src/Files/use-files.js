import { useEffect, useState } from 'react';
import { getFiles } from '../api';

/** Hook that fetches files from the server, providing the desired sort order of the items */
export function useFiles(sortOrder) {
  const [files, setFiles] = useState([]);

  useEffect(() => {

    /** Rewrote the .then() handler using await/async */
    const fetchFiles = async () => {
      const files = await getFiles(sortOrder);
      setFiles(files)
    };

    fetchFiles();
  }, [sortOrder]); // Any time the sort order changes, let's call the server for the sorted list

  return files;
}
