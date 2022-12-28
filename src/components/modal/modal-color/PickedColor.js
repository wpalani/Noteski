/**
 * Shows the picked color.
 * When clicked shows the color picker to change the color.
 */
const PickedColor = ({ color, showPicker }) => {
    return (
        <div id="modal-color-picked"
            style={{
                backgroundColor: color
            }}
            onClick={ () => showPicker( true ) }>
        </div>
    );
}

export default PickedColor;