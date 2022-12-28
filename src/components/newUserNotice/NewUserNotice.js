import { useEffect } from 'react';
import { Noteski } from '../../Noteski';
import { Store } from 'react-notifications-component';
import AppButton from '../ui/AppButton';
import './NewUserNotice.css';

/**
 * Displays a notice to new users about Local Storage API perms
 */
const NewUserNotice = ({ updateIsNewUser }) => {

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

    const handleGetStartedClick = () => {
        try {
            // craete local storage data
            Noteski.createLocalStorage();
            // update state to close modal
            updateIsNewUser(Noteski.isNewUser());
            // restore body scroll after modal closing
            enableBodyScroll();
        } catch (error) {
            Store.addNotification({
                message: "Failed to create local storage object",
                type: "error",
                insert: "bottom",
                container: "bottom-left",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    pauseOnHover: true,
                    onScreen: false
                },
                slidingExit: {
                    duration: 80,
                },
            });
        }
    }


    return (
        <div id="new-user-notice">
            <div id="new-user-notice-container">

                <div id="new-user-notice-overlay"></div>

                <div id="new-user-notice-content">

                    <div id="new-user-notice-content-bfs">
                        <div>
                            <span className="material-symbols-outlined">
                                info
                            </span>
                        </div>
                        <div>Before you start</div>
                    </div>

                    <p>
                        Noteski uses the browser's local storage API to store the notes you take. By continuing to use this app you agree to give Noteski the permission to interact with your browser's local storage. Your notes data will not be shared, uploaded or posted anywhere else but your local storage.
                    </p>

                    <div id="new-user-notice-content-options">
                        <a href="google.com">Cancel</a>
                        <AppButton title={"Get Started"} action={handleGetStartedClick} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewUserNotice;