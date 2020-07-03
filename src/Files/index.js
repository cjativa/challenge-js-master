import React from 'react';

import { useFiles } from './use-files';
import { addVersion } from '../api';

import styles from './index.module.css';

// TODO: Improve the implementation of this component according to task (4)
/** Component representing the File object */
const File = ({ file }) => {

  /** Called when the "Rename" button is clicked, handles renaming an existing file */
  const onRename = () => {
    const newName = window.prompt('Rename this file');
    addVersion(file.id, newName);
  };

  return (
    <div className={styles.file}>

      {/** Displays the name of the current version of the file and button for renaming */}
      <div className={styles.fileHeader}>
        <strong>{file.versions[0].name}</strong>
        <button className={styles.renameBtn} onClick={onRename}>Rename</button>
      </div>


      {/** List of the previous versions of the file */}
      <ul>
        {file.versions.map(version => (
          <li key={version.id}>
            {version.name}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default function Files() {
  // TODO: Replace this polling-like implementation according to task (2)
  const [state, setState] = React.useState();
  setInterval(() => setState(Math.random()), 1000);

  const files = useFiles();
  return (
    <>
      {/* TODO: Implement sort feature according to task (3) */}
      <button>Sort A-Z/Z-A</button>

      {/** Display the list of files */}
      <div className={styles.fileList}>
        {files.map(file => <File file={file} key={file.id} />)}
      </div>


      {/* TODO: Add a button to add a new file according to task (5) */}
    </>
  );
}
