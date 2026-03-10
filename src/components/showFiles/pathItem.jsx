import { invoke } from "@tauri-apps/api/core";
import styles from "./pathItem.module.css";

function pathItem({ filePath }) {
	const removeFile = async () => {
		await invoke("remove_file", { filePath });
	}

	return(
	<div className={styles.path}>
		<button onClick={removeFile}>Remove</button>

		<p>{filePath}</p>
	</div>
	);
}

export default pathItem;