import { useState, useEffect } from "react"
import api from "../api"

// GOAL
// View all plates and cups

// -----------------------------------
// STATE

function Home(){
    // need to keep track of all plates
    const [ plates, setPlates ] = useState([])

    // state to make a new plate ~ title
    const [ plateTitle, setPlateTitle ] = useState("")

    // state to make a new plate ~ size
    const [ plateSize, setPlateSize ] = useState("")

    // need to track all of the cups
    const [ cups, setCups ] = useState([])

    // state to make a new cup ~ title
    const [ cupTitle, setCupTitle ] = useState("")

    // state to make a new cup ~ size 
    const [ cupSize, setCupSize ] = useState("")

// -----------------------------------
// USE EFFECT

    // Ran for plates
    useEffect(() => {
        getPlates()
    }, [])

    // Ran for cups
    useEffect(() => {
        getCups()
    }, [])

// -----------------------------------
// FUNCTIONS FOR GETTING PLATES OR CUPS

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

    // function to get a cup
    const getCups = () => {
        // fetch all cups from below endpoint
        api.get("/api/cups/")
        // take the response
        .then((res) => res.data)
        // take said data, setCups, upload to function of setCups and log it
        .then((data) => {setCups(data); console.log(data)})
        // catch the error and alert if necessary
        .catch((error) => alert(error));
    };

// -----------------------------------
// FUNCTIONS FOR DELETING PLATES OR CUPS

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
            // update the screen upon completition
            getPlates();
        // catch the error
        }).catch ((error) =>  alert(error))
    }

    // function for deleting a cup ~ need the id
    const deleteCup = (id) => {
        // delete the plate at said endpoint
        api.delete(`/api/cups/delete/${id}`)
        // take the res and check
        .then((res) => {
            // if response is good
            if(res.status === 204)
                // send an alert
                alert("Cup was deleted")
            // else ~ send another alert
            else
                alert("Failed to delete the cup")
            // update the screen
            getCups();
        // catch the error
        }).catch ((error) => alert(error))
    }

// -----------------------------------
// FUNCTIONS FOR CREATING PLATES OR CUPS

    // function for creating a plate ~ will take in an event
    const createPlate = (event) => {
        // prevent default
        event.preventDefault()
        // post to said route, and take in the title and size
        api.post("/api/plates/", {title: plateTitle, size: plateSize})
            // take that response 
            .then((res) => {
            // if message is received for creation
            if (res.status === 201) alert("Plate created")
            // else, alert how it didn't work
            else alert("Failed to record a plate")
            // call the function upon creating a plate
            getPlates();
            // catch the error
        }).catch((error) =>(error))
    }

    // function for a creaping a cup ~ event of submittion
    const createCup = (event) => {
        // prevent default of pagreloading upon state change
        event.preventDefault()
        // post to the route ~ title and size
        api.post("/api/cups/", {title: cupTitle, size: cupSize})
        // take the response
        .then((res) => {
        // if status received is for creation
        if (res.status === 201) 
        // alert
        alert("Cup created")
        // if not
        else alert("Failed to record a cup")
        // reload the new cup
        getCups();
        // catch the error if needed
        }).catch((error) => (error))
    }
// -----------------------------------
// HTML for a Plate
 
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

        {/* ----------------------------------- */}
        {/* HTML for a Plate  */}

        <div>
            <h2>Cups</h2>

        </div>
        <h2>Create a Cup:</h2>
        <form
        // use createCup function upon submit
        onSubmit={createCup}>
            {/* for Title of cup */}
            <label htmlFor="title">Title:</label>
            <br/>
            {/* input for title of cup */}
            <input 
                type="text" 
                id="title" 
                name="title" 
                required 
                onChange={(event) => 
                setCupTitle(event.target.value)}
                value={cupTitle}
             />
             {/* input for size of cup */}
             <label htmlFor="size">Plate size:</label>
             <br/>
             <input
                type="size"
                id="size"
                name="size"
                required
                onChange={(event) => setCupSize(event.target.value)}
                value={cupSize}
                />
                <br/>
                {/* submit */}
                <input type="submit" value="Submit"></input>
        </form>
    </div>
}

export default Home