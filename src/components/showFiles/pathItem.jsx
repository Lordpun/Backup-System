import { invoke } from "@tauri-apps/api/core";
import styles from "./pathItem.module.css";

function pathItem({ filePath, update }) {
	const removeFile = async () => {
		await invoke("remove_file", { path_string: filePath });
		await update();
	}

	return(
	<div className={styles.path}>
		<button onClick={removeFile}>Remove</button>

		<p>{filePath}</p>
	</div>
	);
}

export default pathItem;