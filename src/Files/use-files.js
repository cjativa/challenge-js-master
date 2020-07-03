import { useEffect, useState } from 'react';
import { getFiles } from '../api';

export function useFiles() {
  const [files, setFiles] = useState([]);

  useEffect(() => {

    /** Rewrote the .then() handler using await/async */
    const fetchFiles = async () => {
      const files = await getFiles();
      setFiles(files)
    };

    fetchFiles();
  }, []);

  return files;
}
