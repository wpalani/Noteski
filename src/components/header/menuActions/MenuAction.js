import ActionIcon from "../../ui/ActionIcon";

/**
 * Creates a menu action item
 * 
 * @param {object} props - The component's props.
 * @param {string} props.title - The title of the menu action.
 * @param {string} props.description - The description of the menu action.
 * @param {string} props.icon - The icon to display for the menu action (Material Icon).
 * @param {function} props.action - A function to execute when the menu action is clicked.
 * @returns {JSX} The rendered JSX for the menu item.
 */
const MenuAction = ({ title, description, icon, action }) => {
    return (
        <div className="menu-action" onClick={action}>
            <div>
                <h5>{title}</h5>
                <p>{description}</p>
            </div>
            <div>
                <ActionIcon icon={icon} />
            </div>
        </div>
    );
}

export default MenuAction;