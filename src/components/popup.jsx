import styles from './popup.module.css';
import UtilityButton from "./components/utiltiyButton";

function Popup({ pageTitle, mainBody}) {
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

				<UtilityButton text="Close" />
			</main
		</div>

		</div>
	)
}

export default Popup;