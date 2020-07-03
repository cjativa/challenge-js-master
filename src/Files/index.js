import React, { useState, useEffect } from 'react';

import { useFiles } from './use-files';
import { addVersion } from '../api';
import { ASCENDING, DESCENDING } from '../constants/sortOrders';
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

  // Stateful hooks for when a rename occurs and the sort order. Sort order is ascending by default
  const [renamedOccurred, updateRenameOccurred] = useState(false);
  const [sortOrder, setSortOrder] = useState(ASCENDING);

  // List of files
  const files = useFiles(sortOrder);

  /** Trigerred when a file finishes executing a version rename and refreshes the file list */
  const triggerRenameRefresh = () => updateRenameOccurred(true);

  /** Handles sort button click */
  const onSortClick = () => {

    // If sort order is ascending, toggle it to descending
    if (sortOrder === ASCENDING) setSortOrder(DESCENDING);

    // Otherwise, if it's descending, toggle to ascending
    else if (sortOrder === DESCENDING) setSortOrder(ASCENDING);
  };

  /** Hook that listens for a save being trigged */
  useEffect(() => {

    // If a rename occurred, reset it back to default
    if (renamedOccurred) {
      updateRenameOccurred(false);
    }

  }, [renamedOccurred]);

  const sortButtonText = (sortOrder === ASCENDING)
    ? "Sort Z - A" // Display text to sort descending when the sort order is ascending
    : "Sort A - Z" // Display text to sort ascending when the sort order is descending

  return (
    <div className={styles.fileContainer}>


      {/* TODO: Implement sort feature according to task (3) */}
      <button onClick={onSortClick}>
      {sortButtonText}
      </button>

      {/** Display the list of files */}
      {files.map(file =>
        <File
          file={file}
          key={file.id}
          triggerRenameRefresh={triggerRenameRefresh}
        />)}

      {/* TODO: Add a button to add a new file according to task (5) */}
    </div >
  );
}
