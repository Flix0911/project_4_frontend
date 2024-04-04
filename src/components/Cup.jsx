import React from "react"
import { useState } from "react"
import "../styles/List.css"

function Cup({cup, onDelete, updateCup}) {

    // set state for editing
    const [ cupIsEditing, cupSetIsEditing ] = useState(false)

    // set state for title
    const [ cupTitle, setCupTitle ] = useState(cup.title)

    // set state for plate size
    const [ cupSize, setCupSize ] = useState(cup.size)

    // function for handling submit
    const handleCupUpdate = () => {
        // state would be true
        cupSetIsEditing(true)
    }

    // function for handling update submit
    const cupUpdateSubmit = (event) => {
        // prevent default will editing
        event.preventDefault()
        //prop of updatePlate
        updateCup(cup.id, {title: cupTitle, size: cupSize})
        // for state
        cupIsEditing(false)

    }


    // render container
    return (
        <div className="list-cup-container">
            {/* state */}
            {cupIsEditing ? (
                // onSubmit of clicking 1st "update plate" ~ run plateupdatesubmit function
                <form onSubmit={cupUpdateSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={cupTitle}
                        onChange={(event) => setCupTitle(event.target.value)}
                    />
                    <br />
                    <label htmlFor="size">Size:</label>
                    <input
                        type="text"
                        id="size"
                        name="size"
                        value={cupSize}
                        onChange={(event) => setCupSize(event.target.value)}
                    />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <>
                    {/* will send to home page the cup's title */}
                    <p className="list-item-title">{cup.title}</p>
                    {/* will send to homepage the cup's size */}
                    <p className="list-item-size">{cup.size}</p>
                    {/* delete said plate */}
                    <button className="delete-button" onClick={() => onDelete(cup.id)}>
                        Delete Cup
                    </button>
                    {/* run function to submit the updated cup */}
                    <button onClick={handleCupUpdate}>Update Cup</button>
                </>
            )}
        </div>
    );
}


export default Cup



// ----------------
// Old Cup.jsx page for reference


// import React from "react"

// function Cup({cup, onDelete}) {

//     // render the container
//     return<div className="cup-container">
//         {/* title of cup */}
//         <p className="cup-title">{cup.title}</p>
//         {/* size of cup */}
//         <p className="cup-size">{cup.size}</p>
//         {/* delete said cup */}
//             <button className="delete-button" onClick={() => onDelete(cup.id)}>
//             Delete Cup
//             </button>
//     </div>
// }

