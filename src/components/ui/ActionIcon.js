import './UI.css'

/**
 * Reuseable Icon element to be used in the App
 * 
 * @param {string} icon - A google material icon name.
 */
const ActionIcon = ({ icon, action, disabled }) => {
    return (
        <div
            className="noteski-action-icon no-select"
            onClick={action}
            disabled={disabled}>
            <span className="material-symbols-outlined">{icon}</span>
        </div>
    );
}

export default ActionIcon;