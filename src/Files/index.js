import React, { useState, useEffect } from 'react';

import { useFiles } from './use-files';
import { addVersion } from '../api';

import styles from './index.module.css';

// TODO: Improve the implementation of this component according to task (4)
/** Component representing the File object */
const File = ({ file, triggerRenameRefresh }) => {

  /** Called when the "Rename" button is clicked, handles renaming an existing file */
  const onRename = async () => {
    const newName = window.prompt('Rename this file');
    await addVersion(file.id, newName);

    triggerRenameRefresh();
  };

  return (
    <div className={styles.file}>

      {/** Displays the name of the current version of the file and button for renaming */}
      <div className={styles.fileHeader}>
        <strong>📁 {file.versions[0].name}</strong>
        <button className={styles.renameBtn} onClick={onRename}>Rename</button>
      </div>


      {/** List of the previous versions of the file */}
      <ul>
        {file.versions.map((version, index) => (
          <li key={`${version.id}_${index}`}>
            {version.name}
          </li>
        ))}
      </ul>

    </div>
  );
}

/** Component rendering the list of files */
export default function Files() {

  // TODO: Replace this polling-like implementation according to task (2)
  const [renamedOccurred, updateRename] = useState(false);
  const files = useFiles();

  /** Trigerred when a file finishes executing a version rename and refreshes the file list */
  const triggerRenameRefresh = () => updateRename(true);

  /** Hook that listens for a save being trigged */
  useEffect(() => {

    // If a rename occurred, reset it back to default
    if (renamedOccurred) {
      updateRename(false);
    }

  }, [files]);

  return (
    <div className={styles.fileContainer}>
      {/** Display the list of files */}


      {/* TODO: Implement sort feature according to task (3) */}
      < button > Sort A - Z / Z - A</button >
      {files.map(file => <File file={file} key={file.id} triggerRenameRefresh={triggerRenameRefresh} />)}

      {/* TODO: Add a button to add a new file according to task (5) */}
    </div >
  );
}
