import { open } from '@tauri-apps/plugin-dialog';
import { invoke } from "@tauri-apps/api/core";
import { useState } from 'react';
import styles from "./pathItem.module.css";

function backupItem({ filePath, update }) {
  const handleSelectFile = async () => {
    try {
      const selected = await open({
        multiple: false,
        directory: true,
      });

      if (selected === null) {
        return;
      } else {
        await invoke("set_backup", {pathString: selected});
				await update();
      }
    } catch (err) {
      console.error(err);
    }
  };

	return(
	<div className={styles.path}>
		<button onClick={handleSelectFile}>Change</button>

		<p>{filePath}</p>
	</div>
	);
}

export default backupItem;