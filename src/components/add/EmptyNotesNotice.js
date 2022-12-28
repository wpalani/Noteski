/**
 * Displays a notice when the list of notes is empty.
 *
 * @param {object} props - The component's props.
 * @param {function} props.setShowModal - A function for setting the value of the "showModal" state.
 * @returns {JSX} The rendered JSX element.
 */
const EmptyNotesNotice = ({ setShowModal }) => {
    return ( 
        <div id="empty-notes-notice" className="max-width">
            <div id="empty-notes-notice-content">
                <p>
                    You currently don't have any notes. 
                    <span onClick={() => setShowModal(true)}> Add a note </span> 
                    to start using this App.
                </p>
            </div>
        </div>
     );
}
 
export default EmptyNotesNotice;