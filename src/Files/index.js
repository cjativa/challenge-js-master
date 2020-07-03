import React, { useState, useEffect } from 'react';

import { useFiles } from './use-files';
import { addVersion } from '../api';
import { ASCENDING, DESCENDING } from '../constants/sortOrders';
import styles from './index.module.css';

/** Component representing the File object */
const File = ({ file, triggerRenameRefresh }) => {

  /** Called when the "Rename" button is clicked, handles renaming an existing file */
  const onRename = () => {
    const newName = window.prompt('Rename this file');
    addVersion(file.id, newName);

    triggerRenameRefresh();
  };

  const currentFileVersionName = file.versions[0].name;

  return (
    <div className={styles.file}>

      {/** Displays the name of the current version of the file and button for renaming */}
      <div className={styles.fileHeader}>
        <strong>
          <span role="img" aria-label="">📁</span>
          {currentFileVersionName}
        </strong>
        <button className={styles.renameBtn} onClick={onRename}>Rename</button>
      </div>


      {/** List of the previous versions of the file */}
      <ul>
        {file.versions.map((version, index) => (
          <li className={styles.listItem} key={`${version.id}_${index}`}>

            {/** Display the file name for this version */}
            <span>{version.name}</span>

            {/** Indicate that this is the latest revision if it's the 0th element */}
            {(index === 0)
              ? <span className={styles.latest}><em>Latest revision</em></span>
              : ''}
          </li>
        ))}
      </ul>

      <span className={styles.revisionNumber}>Number of revisions {file.versions.length}</span>
    </div>
  );
}

/** Component rendering the list of files */
export default function Files() {

  // Stateful hooks for when a rename occurs and the sort order. Sort order is ascending by default
  const [renamedOccurred, updateRenameOccurred] = useState(false);
  const [sortOrder, setSortOrder] = useState(ASCENDING);

  useEffect(() => {
    if (renamedOccurred) updateRenameOccurred(false);
  }, [renamedOccurred]);

  // List of files
  const files = useFiles(sortOrder, renamedOccurred);

  /** Trigerred when a file finishes executing a version rename and refreshes the file list */
  const triggerRenameRefresh = () => updateRenameOccurred(true);

  /** Handles sort button click */
  const onSortClick = () => {

    // If sort order is ascending, toggle it to descending
    if (sortOrder === ASCENDING) setSortOrder(DESCENDING);

    // Otherwise, if it's descending, toggle to ascending
    else if (sortOrder === DESCENDING) setSortOrder(ASCENDING);
  };

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
