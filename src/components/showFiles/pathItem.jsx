import styles from "./pathItem.module.css";

function pathItem({ filePath }) {
	return(
	<div className={styles.path}>
		<button>Remove</button>

		<p>{filePath}</p>
	</div>
	);
}

export default pathItem;