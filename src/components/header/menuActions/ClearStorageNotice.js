import './ClearStorageNotice.css'
import AppButton from "../../ui/AppButton";
import { Noteski } from '../../../Noteski';
import { Store } from 'react-notifications-component';

/**
 * Displays a notice before deleting all the notes and preferences stored in the app's local storage.
 * It provides a way for the user to cancel or confirm the action.
 * It also handles the confirm action with handleClearStorageClick method.
 */
const ClearStorageNotice = ({ setShowClearStorageNotice }) => {

    const handleClearStorageClick = () => {

        try {
            Noteski.deleteNoteski();

            setShowClearStorageNotice(false);

            Store.addNotification({
                message: "Successfully deleted all data! Redirecting now...",
                type: "success",
                insert: "bottom",
                container: "bottom-left",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    pauseOnHover: true,
                    onScreen: false
                },
                slidingExit: {
                    duration: 80,
                },
            });

            setTimeout(() => {
                window.location.href = "https://noteski.me/";
            }, 2100);
        } catch (error) {
            setShowClearStorageNotice(false);

            Store.addNotification({
                message: "Something went wrong, try again later.",
                type: "info",
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
        <div id="clear-storage-notice">
            <div id="clear-storage-notice-container">

                <div id="clear-storage-notice-overlay" onClick={() => setShowClearStorageNotice(false)}></div>

                <div id="clear-storage-notice-content">

                    <div id="clear-storage-notice-content-bfs">
                        <div>
                            <span className="material-symbols-outlined">
                                info
                            </span>
                        </div>
                        <div>Before you continue</div>
                    </div>

                    <p>
                        This action will erase all of Noteski's local storage data including all your notes and prefrences. You'll be redirected out of the App once the data is erased.
                    </p>

                    <div id="clear-storage-notice-content-options">
                        <div id="a_cancel" onClick={() => setShowClearStorageNotice(false)}>Cancel</div>
                        <AppButton title={"Clear Storage"} action={handleClearStorageClick} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClearStorageNotice;