/**
 * Displays radio input as color circle.
 * When the radio input is selected and its value changes, the 'update' function is called with the value of 'color' passed as an argument.
 */
const ColorPicker = ({ selected, update, color, id }) => {

    return (
        <>
            <input 
                type="radio" 
                name="note-color" 
                id={id} 
                defaultChecked={selected === color ? true : false}
                onChange={ () => update(color) }
            />
            <label 
                htmlFor={id} 
                style={{
                    backgroundColor: color
                    }}
            ></label>
        </>
    );
}

export default ColorPicker;