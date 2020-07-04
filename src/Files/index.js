import React, { useState, useEffect } from 'react';

import { useFiles } from './use-files';
import { addVersion, addFile, deleteFile } from '../api';
import { ASCENDING, DESCENDING } from '../constants/sortOrders';
import styles from './index.module.css';

/** Component representing the File object */
const File = ({ file, triggerRefresh }) => {

  /** Called when the "Rename" button is clicked, handles renaming an existing file */
  const onRename = () => {
    const newName = window.prompt('Rename this file');
    addVersion(file.id, newName);

    triggerRefresh();
  };

  /** Handles delete button click */
  const onDelete = () => {
    deleteFile(file.id);
    triggerRefresh();
  };

  /** Get the name of the latest version's file  name */
  const currentFileVersionName = file.versions[0].name;

  return (
    <div className={styles.file}>

      {/** Displays the name of the current version of the file and button for renaming */}
      <div className={styles.fileHeader}>
        <strong>
          <span role="img" aria-label="">📁 </span>
          {currentFileVersionName}
        </strong>
        <button className={`${styles.renameBtn} ${styles.btn}`} onClick={onRename}>Rename</button>
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

      {/** Display the id of this file and number of versions */}
      <span className={styles.idText}>File ID: <em>{file.id}</em></span>
      <span className={styles.revisionNumber}>Number of revisions: {file.versions.length}
        <span className={styles.delete} onClick={onDelete}>🗑️</span>
      </span>
    </div>
  );
}

/** Component rendering the list of files */
export default function Files() {

  // Stateful hooks for when a rename occurs and the sort order. Sort order is ascending by default
  const [refreshOccurred, updateRefreshOccurred] = useState(false);
  const [sortOrder, setSortOrder] = useState(ASCENDING);

  /** Listens for refreshes having occurred */
  useEffect(() => {
    if (refreshOccurred) updateRefreshOccurred(false);
  }, [refreshOccurred]);

  // List of files
  const files = useFiles(sortOrder, refreshOccurred);

  /** Trigerred when a file finishes executing a version rename and refreshes the file list */
  const triggerRefresh = () => updateRefreshOccurred(true);

  /** Handles sort button click */
  const onSortClick = () => {

    // If sort order is ascending, toggle it to descending
    if (sortOrder === ASCENDING) setSortOrder(DESCENDING);

    // Otherwise, if it's descending, toggle to ascending
    else if (sortOrder === DESCENDING) setSortOrder(ASCENDING);
  };

  /** Handles add file button click */
  const onAddClick = () => {
    const newFileName = window.prompt('Enter the name of the file');
    addFile(newFileName);

    // An addition of a file should trigger a refresh
    triggerRefresh();
  };

  /** Determines the current text to display in the sort button */
  const sortButtonText = (sortOrder === ASCENDING)
    ? "Sort Z - A" // For when the sort order is presently ascending
    : "Sort A - Z" // For when the sort order is presently descending

  return (
    <div className={styles.fileContainer}>

      {/* TODO: Implement sort feature according to task (3) */}
      <button className={`${styles.btn} ${styles.sortBtn}`} onClick={onSortClick}>
        {sortButtonText} ↕️
      </button>

      {/** Display the list of files */}
      {files.map(file =>
        <File
          file={file}
          key={file.id}
          triggerRefresh={triggerRefresh}
        />)}

      {/* TODO: Add a button to add a new file according to task (5) */}
      <button className={`${styles.btn} ${styles.addBtn}`} onClick={onAddClick}>
        New file 📄
      </button>
    </div >
  );
}
