import Logo from "./Logo";
import './Header.css';
import ActionIcon from "../ui/ActionIcon";
import Menu from "./Menu";
import { useState } from "react";

/**
 * App's header.
 *
 * @param {object} props - The component's props.
 * @param {function} props.setNotes - A function for updating the list of notes (pass down).
 * @returns {JSX} The rendered JSX element.
 */
const Header = ({ setNotes }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <header>
            <div id="header-content" className="max-width">
                <div>
                    <Logo />
                </div>
                <div>
                    <ActionIcon icon="menu" action={() => setShowMenu(true)}/>
                    { showMenu && <Menu setShowMenu={setShowMenu} setNotes={setNotes}/> }
                </div>
            </div>
        </header>
    );
}

export default Header;