import { invoke } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";
import styles from "./fileBody.module.css";
import PathItem from "./pathItem";

function fileBody() {
	const [backupPath, setBackup] = useState([])
	const [paths, setPaths] = useState([]);

	const updateList = async () => {
		const backupPath = await invoke("send_backup");
		const pathList = await invoke("send_paths");
		setBackup(backupPath);
		setPaths(paths);
	}

	useEffect( () => {
		updateList();
	}, []);

	return(<>
		<section className={styles.store}>
			<h4>Backup Location</h4>
			<p>Recommended to chose something on an external drive</p>
			{ backupPath != "" && (<PathItem filePath={backupPath}/>)}
			{ backupPath == "" && (<PathItem filePath="None"/>)}

		</section>

		<section className={styles.backups}>
			<h4>Files to backup</h4>

			{paths.map((path) => {
				<PathItem key={path} filePath={path} />
			})}
		</section>	
	</>);
}

export default fileBody;