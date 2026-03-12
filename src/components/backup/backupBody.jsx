import { invoke } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";
import UtilityButton from "../utilityButton";
import ProgressBar from "./progressBar";

function backupBody() {	
	const [backupPath, setBackupPath] = useState("");

	const getBackupLocation = async () => {
		const storedBackupPath = await invoke("send_backup");
		if (storedBackupPath == "") setBackupPath("No backup path selected.\nPlease select one in order to backup files.");
		else setBackupPath(storedBackupPath);
	}

	const [pathList, setPaths] = useState([]);
	const [foldersList, setFolders] = useState([]);
	const [filesList, setFiles] = useState([]);

	const getPaths = async () => {
		const storedPaths = await invoke("send_paths");
		setPaths(storedPaths)

		const results = await Promise.all(
      storedPaths.map(path => invoke("check_folder", { pathString: path }))
    );

    const folders = storedPaths.filter((_, index) => results[index]);
    const files = storedPaths.filter((_, index) => !results[index]);

		setFolders(folders);
		setFiles(files);
	}

	useEffect(() => {
    getBackupLocation();
    getPaths();
  }, []);

	const backupPaths = async () => {	
		if (backupPath == "" || backupPath == "No backup path selected.\nPlease select one in order to backup files.") return;

		try {
			const folderResults = await Promise.all(
				foldersList.map(path => invoke("backup_folder", { folder: path }))
			)

			const fileResults = await Promise.all(
				filesList.map(path => invoke("backup_file", { file: path }))
			)
		} catch (err) {
			console.error("Backup Failed", err);
		}
	}

	return(<>
		<section>
			<h4>Backup Location</h4>
			<p>{backupPath}</p>
			<h4>Files to backup</h4>
			<p>{pathList.length}</p>
		</section>

		<UtilityButton text="Backup Files" onClick={backupPaths}/>
	</>);
}

export default backupBody;