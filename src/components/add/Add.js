import "./Add.css";
import Modal from "../modal/Modal";
import { useState } from "react";
import EmptyNotesNotice from "./EmptyNotesNotice";

/**
 * Displays an "Add" button and a modal for creating a new note.
 *
 * @param {object} props - The component's props.
 * @param {array} props.notes - An array of notes.
 * @param {function} props.setNotes - A function for updating the list of notes.
 * @returns {JSX} The rendered JSX element.
 */
const Add = ({ notes, setNotes }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <section id="add">
            <div id="add-content" className="max-width">
                <div className="add-content-mobile">Add A New Note</div>
                <div className="add-content-mobile">
                    <button
                        className="noteski-btn"
                        onClick={() => setShowModal(true)}
                    >Add Note</button>
                </div>

                <div className="add-content-desktop" onClick={() => setShowModal(true)}>
                    <span class="material-symbols-outlined">
                        edit_note
                    </span>
                    <div>
                        Take a note...
                    </div>
                </div>
            </div>
            {!notes && <EmptyNotesNotice setShowModal={setShowModal} />}
            {showModal && <Modal note="" index="" setNotes={setNotes} setShowModal={setShowModal} />}
        </section>
    );


}

export default Add;