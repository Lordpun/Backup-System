import styles from './utilityButton.module.css';

function UtilityButton({ text, onClick }) {
	return (
		<button className={styles.utility} onClick={onClick}>
			{text} 
		</button>
	)
}

export default UtilityButton;