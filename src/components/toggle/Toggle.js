import { useEffect, useState } from "react";
import "./Toggle.css";

/**
 * A toggle input which allow users to disable note editing.
 * Not used in the App currently.
 */
const Toggle = () => {
    const [toggle, setToggle] = useState(true);

    useEffect(() => {
        const notes = document.getElementById('text-lorem');

        if (!toggle) {
            notes.classList.add('disabled');
        } else {
            notes.classList.remove('disabled');
        }

    }, [toggle])

    return (
    <section id="toggle">
            <div id="toggle-content" className="max-width">
                <div>
                    Enable Notes Editing
                </div>
                <div>
                    <label className="toggle-switch" htmlFor="notes-toggle">
                        <input
                            type="checkbox"
                            id="notes-toggle"
                            checked={toggle}
                            onChange={e => setToggle(e.target.checked)} />
                        <span className="toggle-slider toggle-round"></span>
                    </label>
                </div>
            </div>
        </section>
    );
}

export default Toggle;