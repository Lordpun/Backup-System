import styles from './popup.module.css';
import UtilityButton from "./utilityButton";

function Popup({ pageTitle, mainBody, close }) {
	return(
		<div className="background">

		<div className="popup">
			<header>
				<h2>{pageTitle}</h2>
			</header>

			<main>
				<section>
					{mainBody}
				</section>

				<UtilityButton text="Close" onClick={close}/>
			</main>
		</div>

		</div>
	)
}

export default Popup;