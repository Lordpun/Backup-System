import styles from "./fileBody.module.css";
import PathItem from "./pathItem";

function fileBody() {
	return(<>
		<section class={styles.store}>
			<h4>Backup Location</h4>
			<p>Recommended to chose something on an external drive</p>
			<PathItem filePath="/home/user/backups"/>
		</section>

		<section class={styles.backups}>
			<h4>Files to backup</h4>

			<PathItem filePath="/home/user/path1"/>
			<PathItem filePath="/home/user/path2"/>
		</section>	
	</>);
}

export default fileBody;