import { useEffect, useRef } from "react";

/**
 * Note Editor content (Note Title and Body)
 * 
 * @returns {JSX} Rendered Title and Body
 */
const ModalContent = ({ title, setTitle, body, setBody, setIsSubmitable, color }) => {
    const initialTitle = useRef(title);
    const initialBody = useRef(body);

    useEffect(() => {
        titleAutoFocus();
    }, [])

    /**
     * Auto focus on title field upon modal open
     * 
     * @returns focus on title field
     */
    const titleAutoFocus = () => {
        const titleField = document.getElementById("note-modal-title");
        const selection = window.getSelection();
        const range = document.createRange();

        selection.removeAllRanges();
        range.selectNodeContents(titleField);
        range.collapse(false);
        selection.addRange(range);

        return titleField.focus();
    }

    /**
     * Check if note title and body fields have data to post or update
     * both fields are required and should have more than one charactar
     * 
     * @returns set setIsSubmitable value which keeps track of enable/disable submit buttons
     */
    const checkIfSubmitable = () => {
        const titleField = document.getElementById("note-modal-title");
        const bodyField = document.getElementById("note-modal-body");

        if (titleField.innerText.length < 1 || bodyField.innerText.length < 1) {
            return setIsSubmitable(false);
        } else {
            return setIsSubmitable(true);
        }
    }


    const handlePaste = (e) => {
        e.preventDefault();

        // strip out HTML from copied data
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);

        // remove execCommand auto-generated empty divs
        const gneratedDivs = document.querySelectorAll("#note-modal-body div");
        gneratedDivs.forEach(div => {
            const divContent = div.innerText;

            if (divContent.length < 1) {
                div.remove();
                return;
            }
        });
    }

    return (
        <div id="note-modal-content" className="has-scrollbar" style={{ backgroundColor: color }}>
            <div className="max-width">

                <div id="note-modal-title"
                    contentEditable
                    suppressContentEditableWarning={true}
                    data-placeholder="Title"
                    onPaste={handlePaste}
                    onInput={e => {
                        setTitle(e.target.innerText);
                        checkIfSubmitable();
                    }}
                    dangerouslySetInnerHTML={{ __html: initialTitle.current }}>
                </div>

                <br></br>

                <div id="note-modal-body"
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    data-placeholder="Take a note"
                    onPaste={handlePaste}
                    onInput={e => {
                        setBody(e.target.innerText);
                        checkIfSubmitable();
                    }}
                    dangerouslySetInnerHTML={{ __html: initialBody.current }}>
                </div>

            </div>
        </div>
    );
}

export default ModalContent;