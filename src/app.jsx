import { useState } from "react";
import UtilityButton from "./components/utilityButton";
import styles from './app.module.css';

function App() {
	return(
		<div>
			<header>
				<h1>Backup System</h1>
			</header>

			<main>
				<UtilityButton text="Set Files"/>
				<UtilityButton text="Make a backup"/>
			</main>
		</div>
	);
}

export default App;