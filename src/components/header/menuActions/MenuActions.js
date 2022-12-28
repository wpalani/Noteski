import { useState } from "react";
import { Store } from "react-notifications-component";
import { Noteski } from "../../../Noteski";
import ClearStorageNotice from "./ClearStorageNotice";
import ImportNotesAction from "./ImportNotesAction";
import MenuAction from "./MenuAction";

/**
 * Displays a list of menu actions.
 * 
 * @param {object} props - The component's props.
 * @param {function} props.updateNotes - A function for updating the list of notes (pass down).
 * @returns {JSX} The rendered JSX element.
 */
const MenuActions = ({ updateNotes }) => {
    const [ShowClearStorageNotice, setShowClearStorageNotice] = useState(false);
    const [importInput, setImportInput] = useState(false);

    const handleImportNotesClick = () => {
        const renderInput = async () => {
            setImportInput(true);
        }
        renderInput().then(() => {
            // Invoke input
            const fileInput = document.getElementById("noteski-notes-import-input");

            // Ceate mouse event click on input
            const fileInputEvt = new MouseEvent("click", {
                view: window,
                bubbles: true,
                cancelable: true,
            });

            // Promp file upload dialog (input click)
            fileInput.dispatchEvent(fileInputEvt);
        })
    }

    const handleExportNotesClick = () => {
        // If user has notes then export
        if (Noteski.getNotes()) {
            Noteski.exportNotes();
        } else {
            Store.addNotification({
                message: "You don't have any notes to export.",
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
        <div id="menu-actions">

            <MenuAction
                title="Import Notes"
                description="Import Noteski .JSON file"
                icon="file_upload"
                action={() => handleImportNotesClick()}
            />
            {importInput && <ImportNotesAction setImportInput={setImportInput} setNotes={updateNotes}/>}

            <MenuAction
                title="Export Notes"
                description="Export Noteski .JSON file"
                icon="file_download"
                action={() => handleExportNotesClick()}
            />

            <MenuAction
                title="Clear Storage"
                description="Clear Noteski Storage data"
                icon="delete"
                action={() => setShowClearStorageNotice(true)}
            />
            {ShowClearStorageNotice && <ClearStorageNotice setShowClearStorageNotice={setShowClearStorageNotice} />}

        </div>
    );
}

export default MenuActions;