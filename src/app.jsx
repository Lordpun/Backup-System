import { useState } from "react";
import UtilityButton from "./components/utilityButton";
import Popup from "./components/popup";
import FileBody from "./components/showFiles/fileBody";
import styles from './app.module.css';

function App() {
	const [showFiles, setShowFiles] = useState(false);
  const [showBackup, setShowBackup] = useState(false);

	const closeFiles = () => setShowFiles(false);
	const closeBackups = () => setShowFiles(false);

	return(<>
		<header>
			<h1>Backup System</h1>
		</header>

		<main>
			<UtilityButton text="Set Files" onClick={() => setShowFiles(true)}/>
			<UtilityButton text="Make a backup" onClick={() => setShowBackup(true)}/>
		</main>

		{showFiles && (<Popup pageTitle="Set Files" mainBody={<FileBody />} close={closeFiles}/>)}
		{/*{showBackup && (<Popup pageTitle="Backing Up" close={closeBackups}/>)}*/}
	</>);
}

export default App;