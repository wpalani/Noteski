import { useEffect } from "react";
import { Store } from "react-notifications-component";
import { Noteski } from "../../../Noteski";

/**
 * Handles importing notes
 * 
 * @param {function} setImportInput - A function to set the value of the 'importInput' state.
 * @param {function} setNotes - A function to set the value of the 'notes' state.
 * 
 * Renders an input element that allows the user to import a JSON file of notes. When the file is selected,
 * it is read and passed to the 'attemptToImport' function for validation. If the file is a valid JSON file,
 * it is imported and the 'notes' state is updated. If the file is invalid, a notification is displayed to the user.
 */
const ImportNotesAction = ({ setImportInput, setNotes }) => {

    useEffect(() => {
        const fileInput = document.getElementById("noteski-notes-import-input");
        fileInput.addEventListener('change', handleFileUpload);
    }, [])

    const handleFileUpload = () => {
        const fileInput = document.getElementById("noteski-notes-import-input");
        const uploadedFile = fileInput.files[0];
        
        const reader = new FileReader();
        reader.onload = () => {
            if (uploadedFile.type === "application/json" || uploadedFile.type === ".json") {
                const uploadedNotes = reader.result;
                attemptToImport(uploadedNotes);

                // setImportInput(false);
            } else {
                reader.abort();
                
                Store.addNotification({
                    message: "Error: please make sure you're uploading a valid .Json file.",
                    type: "info",
                    insert: "bottom",
                    container: "bottom-left",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 3000,
                        pauseOnHover: true,
                        onScreen: false
                    },
                    slidingExit: {
                        duration: 80,
                    },
                });

                setImportInput(false);
            }
        };

        reader.readAsText(uploadedFile);
    }

    const attemptToImport = (uploadedNotes) => {
        const importedNotes = JSON.parse(uploadedNotes);
        const runImport = Noteski.importNotes(importedNotes);

        if (runImport) {
            setNotes(Noteski.getNotes());
            Store.addNotification({
                message: "Notes impoted successfully!",
                type: "success",
                insert: "bottom",
                container: "bottom-left",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 3000,
                    pauseOnHover: true,
                    onScreen: false
                },
                slidingExit: {
                    duration: 80,
                },
            });
        } else {
            Store.addNotification({
                message: "Error: imported data are corrupt or invalid.",
                type: "info",
                insert: "bottom",
                container: "bottom-left",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 3000,
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
        <div style={{
            "display": "none"
        }}>
            <input 
                type="file" 
                id="noteski-notes-import-input"
                accept=".json,application/json" 
            />
        </div>
    );
}

export default ImportNotesAction;