import React from "react"
import { useState } from "react"
import "../styles/List.css"

function Plate({plate, onDelete, updatePlate}) {

    // set state for editing
    const [ plateIsEditing, plateSetIsEditing ] = useState(false)

    // set state for title
    const [ plateTitle, setPlateTitle ] = useState(plate.title)

    // set state for plate size
    const [ plateSize, setPlateSize ] = useState(plate.size)

    // function for handling submit
    const handlePlateUpdate = () => {
        // state would be true
        plateSetIsEditing(true)
    }

    // function for handling update submit
    const plateUpdateSubmit = (event) => {
        // prevent default will editing
        event.preventDefault()
        //prop of updatePlate
        updatePlate(plate.id, {title: plateTitle, size: plateSize})
        // for state
        plateIsEditing(false)

    }


    // render container
    return (
        <div>
            {/* state */}
            {plateIsEditing ? (
                // onSubmit of clicking 1st "update plate" ~ run plateupdatesubmit function
                <form onSubmit={plateUpdateSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input className="form-input-home"
                        type="text"
                        id="title"
                        name="title"
                        value={plateTitle}
                        onChange={(event) => setPlateTitle(event.target.value)}
                    />
                    <br />
                    <label htmlFor="size">Size:</label>
                    <input className="form-input-home"
                        type="text"
                        id="size"
                        name="size"
                        value={plateSize}
                        onChange={(event) => setPlateSize(event.target.value)}
                    />
                    <br />
                    <button className="form-button-home" type="submit">Submit</button>
                    {/* for exiting editing */}
                    <button className="form-button-home" type="button" onClick={() => plateSetIsEditing(false)}>Exit</button>
                </form>
            ) : (
                <>
                    <div className="return-container">
                        {/* will send to home page the plate's title */}
                        <p className="info-paragraph">Title: {plate.title}</p>
                        {/* will send to homepage the plate's size */}
                        <p className="info-paragraph">Size: {plate.size}</p>
                        {/* delete said plate */}
                        <button className="form-button-list" onClick={() => onDelete(plate.id)}>
                            Delete Plate
                        </button>
                        {/* run function to submit the updated plate */}
                        <button className="form-button-list" onClick={handlePlateUpdate}>Update Plate</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Plate



// --------------------
// Below was previous Plate.jsx page for reference

//  {/* title of plate */}
//  <p className="plate-title">{plate.title}</p>
//  {/* size of plate */}
//  <p className="plate-size">{plate.size}</p>
//  {/* be able to delete the plate */}
//      <button className="delete-button" onClick={() => onDelete(plate.id)}>
//      Delete Plate
//      </button>

//      <button onClick={() => updatePlate(plate.id, { title: plateTitle, size: plateSize })}>Update Plate</button>