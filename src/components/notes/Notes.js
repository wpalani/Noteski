import { memo, useState } from 'react';
import './Notes.css';
import Modal from '../modal/Modal';

/**
 * Displays notes
 * It also displays a modal (Note Editor) when a note is clicked, which allows the user to view and edit the note's details.
 * 
 * @param {array} notes - An array of notes to be displayed.
 * @param {function} setNotes - A function to update the notes array.
 * @returns {JSX} Rendered notes grid.
 */
const Notes = ({ notes, setNotes }) => {
    const [modalNote, setModalNote] = useState("");
    const [modalNoteIndex, setModalNoteIndex] = useState("");
    const [showModal, setShowModal] = useState(false);

    return (
        <section id="notes">
            <div id="notes-content" className="max-width">

                {notes.map((note, index) => (

                    <div className="note-item"
                        style={{ backgroundColor: note.color }}
                        key={index}
                        onClick={() => {
                            setShowModal(true);
                            setModalNote(note);
                            setModalNoteIndex(index);
                            console.log(note.color);
                        }}>
                        <div className="note-item-container">
                            <div className="note-item-content">

                                <div className="note-item-title">
                                    <h4>{note.title}</h4>
                                </div>

                                <div className="note-item-body">
                                    <p>{note.body}</p>
                                </div>

                            </div>
                        </div>
                    </div>

                ))}

                {
                    showModal && <Modal note={modalNote}
                        index={modalNoteIndex}
                        setModalNote={setModalNote}
                        setShowModal={setShowModal}
                        setModalNoteIndex={setModalNoteIndex}
                        setNotes={setNotes}
                    />
                }

            </div>
        </section>
    );
}

export default memo(Notes);