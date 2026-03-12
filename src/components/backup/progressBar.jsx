import styles from './progressBar.module.css';
import UtilityButton from "../utilityButton";

function progressBar({ pageTitle, text, closeable, close }) {
	return(
		<div className={styles.background}>

		<div className={styles.popup}>
			<h4>{pageTitle}</h4>
			<p>{text}</p>
			{closeable && (<UtilityButton text="Close" onClick={close}/>)}
		</div>

		</div>
	)
}

export default progressBar;