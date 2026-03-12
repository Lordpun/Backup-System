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

	const [total, setTotal] = useState(0);
	const [completed, setCompleted] = useState(0);
	const [percentText, setPercentText] = useState("0% Completed");

	const backupFiles = async (fileArray, functionName) => {
		for (const path of fileArray) {
	    await invoke(functionName, { pathString: path });
	    setCompleted(completed + 1);
	    setPercentText(`${(completed / total) * 100}% Completed`);
		}		
	}

	const backupPaths = async () => {	
		showProgress(true);
		setTotal(pathList.length);

		await backupFiles(foldersList, "backup_folder");
		await backupFiles(filesList, "backup_file");
	}

	const [progressVisible, showProgress] = useState(false);

	return(<>
		<section>
			<h4>Backup Location</h4>
			<p>{backupPath}</p>
			<h4>Files to backup</h4>
			<p>{pathList.length}</p>
		</section>

		<UtilityButton text="Backup Files" onClick={backupPaths}/>

		{ progressVisible && <ProgressBar pageTitle="Backing Up..." text={percentText} closeable={false} close={() => showProgress(false)}/>}
		{ progressVisible && <ProgressBar pageTitle="Backup Done!" text="" closeable={true} close={() => showProgress(false)}/>}
	</>);
}

export default backupBody;