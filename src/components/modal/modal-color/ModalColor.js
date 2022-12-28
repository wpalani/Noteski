import './ModalColor.css';
import { useState, useEffect } from "react";
import { Noteski } from "../../../Noteski";
import ColorPicker from "./ColorPicker";
import PickedColor from "./PickedColor";

/**
 * A color picker modal for the Note Editor (Modal).
 * 
 * @param {string} color - The currently selected color.
 * @param {function} update - A function to update the selected color.
 * 
 * @returns {JSX} A color picker.
 */
const ModalColor = ({ color, update }) => {
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        hidePickerOnWindowClick();
    }, [])

    const hidePickerOnWindowClick = () => {
        window.addEventListener("click", (e) => {
            if (
                e.target.id === "modal-color-picker" ||
                e.target.parentNode.id === "modal-color-picker" ||
                e.target.id === "modal-color-picked"
            ) {
                return;
            } else {
                setShowPicker(false);
            }
        });
    }

    const renderColorOptions = () => {
        const colors = Noteski.colors;
        let options = [];

        for (const color in colors) {
            options.push({
                "colorHEX": colors[color],
                "colorName": color
            });
        }

        return options.map((option) =>
            <ColorPicker
                selected={color}
                update={update}
                color={option.colorHEX}
                id={option.colorName}
                key={option.colorName}
            />
        )
    }

    return (
        <div id="modal-color">
            <div id="modal-color-content">

                <PickedColor color={color} showPicker={setShowPicker} />

                {showPicker &&
                    <div id="modal-color-picker">
                        {renderColorOptions()}
                    </div>
                }



            </div>
        </div>
    );
}

export default ModalColor;