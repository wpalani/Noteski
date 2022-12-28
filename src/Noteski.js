/**
 * Noteski is an object that contains various methods for managing and interacting with application
 * 
 * @property {string} App - The name of the app, used for storing and retrieving data from local storage.
 * @property {object} colors - An object containing color codes for the colors used as notes BGs.
 */
export const Noteski = {
    App: 'Noteski',
    colors: {
        yellow: "#ffc",
        green: "#cfc",
        purple: "#ccf",
    },

    /**
     * Checks whether the current user is new or not, based on the presence of the app's data in local storage.
     * 
     * @returns {boolean}
     */
    isNewUser() {
        if (!localStorage.getItem(this.App)) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * Creates a new entry in local storage for the app, if one does not already exist.
     */
    createLocalStorage() {
        if (!localStorage.getItem(this.App)) {
            const notes = [];
            localStorage.setItem(this.App, JSON.stringify(notes));
        }
    },


    /**
     * Returns the list of notes stored in local storage, or false if no notes are found or the user is new.
     * 
     * @returns {object}
     */
    getNotes() {
        if (this.isNewUser()) {
            return false;
        }

        const storage = JSON.parse(localStorage.getItem(this.App));

        if (storage.length === 0) {
            return false;
        } else {
            return storage;
        }

    },

    /**
     * Updates the list of notes stored in local storage with the provided data.
     * 
     * @param {object} data 
     */
    updateNotes(data) {
        localStorage.setItem(this.App, JSON.stringify(data));
    },

    /**
     * Returns the first note in the list of notes stored in local storage, or false if no notes are found or the user is new.
     * 
     * @returns {object}
     */
    getSavedNote() {
        const notes = this.getNotes();
        const firstNote = notes[0];
        const savedNote = {
            index: 0,
            title: firstNote.title,
            body: firstNote.body,
            pinned: firstNote.pinned
        }

        return savedNote;
    },

    /**
     * Exports the list of notes as a .json file and prompts the user to download it.
     */
    exportNotes() {
        const notes = this.getNotes();

        // Create a blob of the notes data
        const notesBlob = new Blob([JSON.stringify(notes)], {
            type: 'application/json'
        });

        const exportedFileName = this.App + '.json';

        // Create temporary link to download Blob asset
        const link = document.createElement("a");
        link.download = exportedFileName;
        link.href = window.URL.createObjectURL(notesBlob);
        link.dataset.downloadurl = ["application/json", link.download, link.href].join(":");

        // Using MouseEvent instance rather than .click() for better browser support 
        const downloadEvt = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
        })

        // Download the .json file
        link.dispatchEvent(downloadEvt);
        // Remove link from DOM
        link.remove()
    },

    /**
     * Imports a list of notes from a .json file and updates the app's data in local storage with the imported notes.
     * Returns true or false depending on the success of the process.
     * 
     * @param {object} data 
     * @returns {bool}
     */
    importNotes(data) {
        let importResult = true;

        if (data instanceof Object && data !== null) {

            const notes = Object.keys(data);

            const validateData = () => {
                for (let item in notes) {
                    const note = data[item];

                    if (
                        false === note.hasOwnProperty('title')
                        || null === note.title
                        || 'string' !== typeof note.title
                    ) {
                        importResult = false;
                        break;
                    }

                    if (
                        false === note.hasOwnProperty('body')
                        || null === note.body
                        || 'string' !== typeof note.body
                    ) {
                        importResult = false;
                        break;
                    }

                    if (
                        false === note.hasOwnProperty('color')
                        || null === note.color
                        || 'string' !== typeof note.color
                    ) {
                        importResult = false;
                        break;
                    }

                    if (
                        false === note.hasOwnProperty('pinned')
                        || null === note.pinned
                        || 'boolean' !== typeof note.pinned
                    ) {
                        importResult = false;
                        break;
                    }
                }
            }

            const processData = () => {
                if (!importResult) {
                    return;
                }

                const existingNotes = Noteski.getNotes();
                let importedNotes = [];

                for (let item in notes) {
                    const note = data[item];

                    importedNotes.push(note);
                }

                const mergedNotes = [...existingNotes, ...importedNotes];
                Noteski.updateNotes(mergedNotes);
            }

            validateData();
            processData();

            return importResult;
        }

    },

    /**
     * Deletes the app data from the local storage.
     * 
     * @returns {boolean}
     */
    deleteNoteski() {
        localStorage.removeItem(this.App);
        return true;
    },
}