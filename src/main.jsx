import React from "react";
import ReactDOM from "react-dom/client";
import UtilityButton from "./components/utiltiyButton";
import styles from './main.module.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  	<header>
  		<h1>Backup System</h1>
  	</header>

  	<main>
  		<UtilityButton text="Set Files"/>
  		<UtilityButton text="Make a backup"/>
  	</main>
  </React.StrictMode>,
);
