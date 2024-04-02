import { useState, useEffect } from "react"
import api from "../api"

// GOAL
// View all plates and cups

function Home(){
    // need to keep track of all plates
    const [ plates, setPlates ] = useState([])

    // state to make a new plate ~ name
    const [ plateTitle, setPlateTitle ] = useState("")

    // state to make a new plate ~ size
    const [ plateSize, setPlateSize ] = useState("")

    useEffect(() => {
        getPlates()
    }, [])

    // function to get a plate
    const getPlates = () => {
        // will fetch all my plates
        api.get("/api/plates/")
        // res data
        .then((res) => res.data)
        // then take a data and set into setPlates
        // see data when we load
        .then((data) => {setPlates(data); console.log(data)})
        // if an error, return an alert
        .catch((error) => alert(error));
    };

    // logic for deleting a plate
    // take in the id of the plate to delete
    const deletePlate = (id) => {
        // delete the plate that has been pulled by id
        api.delete(`/api/plates/delete/${id}`)
        .then((res) => {
            // if response is correct, notify of deletion
            if(res.status === 204) 
                alert("Plate was deleted")
            // else
            else 
                // alert the failure  
                alert("Failed to delete the plate")
        // catch the error
        }).catch ((error) =>  alert(error))
        // update the screen upon completition
        getPlates()
    }

    // function for creating a plate ~ will take in an event
    const createPlate = (event) => {
        // prevent default
        event.preventDefault()
        // post to said route, and take in the name, size, and quantity
        api.post("/api/plates/", {title: plateTitle, size: plateSize}).then((res) => {
            // if message is received for creation
            if (res.status === 201) alert("Plate created")
            // else, alert how it didn't work
            else alert("Failed to record a plate")
            // catch the error
        }).catch((error) =>(error))
        // call the function upon creating a plate
        getPlates();
    }
 
    return<div>
        <div>
            <h2>Plates</h2>

        </div>
        <h2>Create a Plate:</h2>
        <form
        // use createPlate function upon submit
        onSubmit={createPlate}>
            {/* for Title of plate */}
            <label htmlFor="title">Title:</label>
            <br/>
            {/* input for title of plate */}
            <input 
                type="text" 
                id="title" 
                name="title" 
                required 
                onChange={(event) => 
                setPlateTitle(event.target.value)}
                value={plateTitle}
             />
             {/* input for size of plate */}
             <label htmlFor="size">Plate size:</label>
             <br/>
             <input
                type="size"
                id="size"
                name="size"
                required
                onChange={(event) => setPlateSize(event.target.value)}
                value={plateSize}
                />
                <br/>
                {/* submit */}
                <input type="submit" value="Submit"></input>
        </form>
    </div>
}

export default Home