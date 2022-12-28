import ActionIcon from "../ui/ActionIcon";
import MenuActions from "./menuActions/MenuActions";
import Github_Logo from '../../assests/svg/github.svg';
import { useEffect } from "react";

/**
 * App menu
 * 
 * @param {object} props - The component's props.
 * @param {function} props.setShowMenu - A function for setting the value of the "showMenu" state.
 * @param {function} props.setNotes - A function for updating the list of notes (pass down).
 * @returns {JSX} The rendered JSX element.
 */
const Menu = ({ setShowMenu, setNotes }) => {
    useEffect(() => {
        disableBodyScroll();
    }, []);

    const disableBodyScroll = () => {
        const body = document.body;
        body.classList.add("no-scroll");
    }

    const enableBodyScroll = () => {
        const body = document.body;
        body.classList.remove("no-scroll");
    }

    const handleCloseClick = () => {
        setShowMenu(false);
        enableBodyScroll();
    }

    return (
        <div id="menu">
            <div id="menu-container">

                <div id="menu-overlay" onClick={handleCloseClick}></div>

                <div id="menu-content">
                    <div id="menu-content-header">
                        <h4>Actions</h4>
                        <ActionIcon icon="close" action={handleCloseClick}/>
                    </div>

                    <MenuActions updateNotes={setNotes}/>

                    <div id="header-credits">
                        <div id="header-credits-github">
                            <a href="https://github.com/aalani95" target="_blank" rel="noreferrer">
                                <img src={Github_Logo} alt="Github" />
                                <p>Noteski on Github</p>
                            </a>
                        </div>

                        <div id="header-credit-author">
                            <a href="https://alani.dev/" target="_blank" rel="noreferrer">
                                <p>Alani.dev</p>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Menu;