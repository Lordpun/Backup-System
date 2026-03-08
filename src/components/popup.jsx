import styles from './popup.module.css';
import UtilityButton from "./utilityButton";

function Popup({ pageTitle, mainBody, close }) {
	return(
		<div className={styles.background}>

		<div className={styles.popup}>
			<header>
				<h2>{pageTitle}</h2>
			</header>

			<main>
				<section>
					{mainBody}
				</section>

				<UtilityButton className={styles.closeButton} text="Close" onClick={close}/>
			</main>
		</div>

		</div>
	)
}

export default Popup;