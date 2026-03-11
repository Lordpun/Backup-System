import { invoke } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";
import styles from "./fileBody.module.css";
import PathItem from "./pathItem";
import BackupItem from "./backupItem";

function fileBody() {
	const [selectedValue, setSelectedValue] = useState("folder");

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
	}

	const handleSelectFile = async (file) => {
		if (selectedValue == "folder") dir = true;
		if (selectedValue == "file") dir = false;
    try {
      const selected = await open({
        multiple: false,
        directory: selectedValue,
      });

      if (selected === null) {
        return;
      } else {
        await invoke("add_path", file)
        updateList();
      }
    } catch (err) {
      console.error(err);
    }
  };

	const [backupPath, setBackup] = useState([])
	const [paths, setPaths] = useState([]);

	const updateList = async () => {
		const storedBackupPath = await invoke("send_backup");
		const storedPathList = await invoke("send_paths");
		setBackup(storedBackupPath);
		setPaths(storedPathList);
		await invoke("update_config");
	}

	useEffect( () => {
		updateList();
	}, []);

	return(<>
		<section className={styles.store}>
			<h4>Backup Location</h4>
			<p>Recommended to chose something on an external drive</p>
			{ backupPath != "" && (<BackupItem filePath={backupPath} update={updateList}/>)}
			{ backupPath == "" && (<BackupItem filePath="None" update={updateList}/>)}
		</section>

		<section className={styles.backups}>
			<h4>Files to backup</h4>

			{paths.map((path) => {
				<PathItem key={path} filePath={path} update={updateList}/>
			})}

			<section className={styles.addPath}>
				<h4>Add path</h4>
				<p>Choose type</p>

				<select onChange={handleChange}>
					<option value="Folder">Folder</option>
					<option value="File">File</option>
				</select>
				
				<button onClick={() => handleSelectFile(file)}>Add path</button>
			</section>
		</section>	
	</>);
}

export default fileBody;