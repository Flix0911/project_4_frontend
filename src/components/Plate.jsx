import React from "react"

function Plate({plate, onDelete}) {


    // render container
    return<div className="plate-container">
        {/* title of plate */}
        <p className="plate-title">{plate.title}</p>
        {/* size of plate */}
        <p className="plate-size">{plate.size}</p>
        {/* be able to delete the plate */}
            <button className="delete-button" onClick={() => onDelete(plate.id)}>
            Delete Plate
            </button>
    </div>
}

export default Plate