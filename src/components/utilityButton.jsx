import styles from './utilityButton.module.css';

function UtilityButton({ text, onClick }) {
	return (
		<button onClick={onClick}>
			{text} 
		</button>
	)
}

export default UtilityButton;