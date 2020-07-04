import { useEffect, useState } from 'react';
import APIFunctions from '../api';

/** Hook that fetches files from the server, providing the desired sort order of the items */
export const useFiles = (sortOrder, renameOccurred) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
   const fetchedFiles =  APIFunctions.getFiles(sortOrder);
   setFiles(fetchedFiles);
    
  }, [sortOrder, renameOccurred]);

  return files;
}
