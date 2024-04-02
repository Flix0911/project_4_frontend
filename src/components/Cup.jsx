import React from "react"

function Cup({cup, onDelete}) {

    // render the container
    return<div className="cup-container">
        {/* title of cup */}
        <p className="cup-title">{cup.title}</p>
        {/* size of cup */}
        <p className="cup-size">{cup.size}</p>
        {/* delete said cup */}
            <button className="delete-button" onClick={() => onDelete(cup.id)}>
            Delete Cup
            </button>
    </div>
}

export default Cup