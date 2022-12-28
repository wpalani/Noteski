import { useEffect, useState } from 'react';
import { Noteski } from '../../Noteski';
import { Store } from 'react-notifications-component';
import './Modal.css';
import ModalContent from './modal-content/ModalContent';
import ActionIcon from '../ui/ActionIcon';
import AppButton from '../ui/AppButton';
import ModalColor from './modal-color/ModalColor';

/**
 * Note Editor Modal
 * It includes various functions for interacting with the editor like save new notes, edit or delete.
 * 
 * @returns Rendered JSX for the Notes Editor (Modal)
 */
const Modal = ({
    note,
    index,
    setShowModal,
    setModalNote,
    setModalNoteIndex,
    setNotes
}) => {

    const [id, setID] = useState(index);
    const [title, setTitle] = useState(note.title);
    const [body, setBody] = useState(note.body);
    const [color, setColor] = useState(note.color ? note.color : "#ffc");
    const [isSubmitable, setIsSubmitable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        disableBodyScroll();
    }, []);


    const disableBodyScroll = () => {
        const body = document.body;
        body.classList.add("no-scroll")
    }

    const enableBodyScroll = () => {
        const body = document.body;
        body.classList.remove("no-scroll")
    }

    const handleSave = (e) => {
        e.preventDefault();
        // post new
        try {
            // map storage to array
            let notes = Noteski.getNotes();

            if (!notes) {
                notes = [];
            }

            notes.unshift({
                "title": title,
                "body": body,
                "color": color,
                "pinned": false
            });

            // update storage and app Notes component
            Noteski.updateNotes(notes);
            setNotes(Noteski.getNotes());

            // disable button
            setIsSubmitable(false);

            // AppButton UI Loading
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);

                // AppButton UI Success
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);

                    // update modals ID
                    const savedNote = Noteski.getSavedNote();
                    setID(savedNote.index);
                }, 6000);

            }, 2000);
        } catch (error) {
            // AppButton UI Loading
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);

                // AppButton UI Error
                setIsError(true);
                setTimeout(() => {
                    setIsError(false);
                }, 6000);

            }, 2000);
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault();

        try {
            // map storage to array
            let notes = Noteski.getNotes();
            notes[id] = {
                "title": title,
                "body": body,
                "color": color,
                "pinned": false
            };

            // update storage and app Notes component
            Noteski.updateNotes(notes);
            setNotes(Noteski.getNotes());

            // update component states
            setIsSubmitable(false);

            // AppButton UI Loading
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);

                // AppButton UI Success
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                }, 6000);

            }, 2000);
        } catch (error) {
            // AppButton UI Loading
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);

                // AppButton UI Error
                setIsError(true);
                setTimeout(() => {
                    setIsError(false);
                }, 6000);

            }, 2000);
        }


    }

    const handleDelete = (e) => {
        e.preventDefault();

        // delete
        let notes = Noteski.getNotes();

        notes.splice(id, 1);

        Noteski.updateNotes(notes);
        setNotes(Noteski.getNotes());

        closeModal();

        Store.addNotification({
            message: "Your note was successfully deleted!",
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

    /**
     * Handles color only update requests
     */
    useEffect(() => {
        const handleColorOnlyUpdate = () => {
            if (id !== "") {

                try {
                    // map storage to array
                    let notes = Noteski.getNotes();
                    const thisNote = notes[id];
                    notes[id] = {
                        "title": thisNote.title,
                        "body": thisNote.body,
                        "color": color,
                        "pinned": thisNote.pinned
                    };

                    // update storage and app Notes component
                    Noteski.updateNotes(notes);
                    setNotes(Noteski.getNotes());
                } catch (error) {
                    Store.addNotification({
                        message: "Error updating the color.",
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
        }
        handleColorOnlyUpdate();

        // eslint-disable-next-line 
    }, [color])


    const closeModal = () => {
        if (!index === "") {
            setModalNote("");
            setModalNoteIndex("");
        }

        enableBodyScroll();
        setShowModal(false);
    }

    return (
        <div id="note-modal">
            <div id="note-modal-container">

                <div id="note-modal-header">
                    <div id="note-modal-header-content" className="max-width">
                        <div>
                            <ActionIcon icon="west" action={closeModal} />
                            {id === "" ? <h4>Make a Note</h4> : <h4>Note Editor</h4>}
                        </div>

                        <div>
                            <ModalColor color={color} update={setColor} />
                            {id === ""
                                ? <AppButton
                                    title="Save"
                                    action={handleSave}
                                    disabled={!isSubmitable ? true : false}
                                    isLoading={isLoading}
                                    isSuccess={isSuccess}
                                    isError={isError} />
                                : <AppButton
                                    title="Update"
                                    action={handleUpdate}
                                    disabled={!isSubmitable ? true : false}
                                    isLoading={isLoading}
                                    isSuccess={isSuccess}
                                    isError={isError} />}

                            {id !== "" && <ActionIcon icon="delete" action={handleDelete} />}
                        </div>
                    </div>
                </div>

                <ModalContent
                    title={title}
                    setTitle={setTitle}
                    body={body}
                    setBody={setBody}
                    setIsSubmitable={setIsSubmitable}
                    color={color}
                />

            </div>
        </div>
    );
}

export default Modal;