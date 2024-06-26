import { useState, useEffect } from "react"
import api from "../api"
import Plate from "../components/Plate"
import Cup from "../components/Cup"
import { Link } from "react-router-dom"
import "../styles/List.css"

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
        api.delete(`/api/plates/delete/${id}/`)
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
        api.delete(`/api/cups/delete/${id}/`)
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
            if (res.status === 201) { alert("Plate created")
            // empty out the field
            setPlateSize("")
            setPlateTitle("")
            getPlates()
            // else, alert how it didn't work
            }else alert("Failed to record a plate")
            // call the function upon creating a plate
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
        if (res.status === 201) {
        // alert
        alert("Cup created")
        // empty out the field
        setCupSize("")
        setCupTitle("")
        getCups()
        // if not
        } else alert("Failed to record a cup")
        // reload the new cup
        // catch the error if needed
        }).catch((error) => (error))
    }

// -----------------------------------
// FUNCTIONS FOR UPDATING PLATES OR CUPS

    // function for plate
    const updatePlate = (plateId, plateUpdateData) => {
        // put request to the id of the plate
        api.put(`/api/plates/update/${plateId}/`, plateUpdateData)
        // take the response
        .then((res) => {
            // response is good
            if (res.status === 200)
                alert("Plate has been updated")
            // if not
            else
                alert("Failed to update plate")
            getPlates();
        // catch the error
        }).catch((error) => alert(error))
    }

    // function for cup
    const updateCup = (cupId, cupUpdateData) => {
        // put request to the id of the plate
        api.put(`/api/cups/update/${cupId}/`, cupUpdateData)
        // take the response
        .then((res) => {
            // response is good
            if (res.status === 200)
                alert("Cup has been updated")
            // if not
            else
                alert("Failed to update cup")
            getCups();
        // catch the error
        }).catch((error) => alert(error))
    }

// -----------------------------------
// HTML for a Plate
 
    return<div className="list-container-home">
        <div className="map-container">
            <h2 className="create-prompt-container">Create a Plate:</h2>
            <form className="form-container-home"
            // use createPlate function upon submit
            onSubmit={createPlate}>
                {/* for Title of plate */}
                <label htmlFor="title" className="title-container">Title:</label>
                <br/>
                {/* input for title of plate */}
                <input className="form-input-home"
                    type="text" 
                    id="title" 
                    name="title" 
                    required 
                    onChange={(event) => 
                    setPlateTitle(event.target.value)}
                    value={plateTitle}
                />
                {/* input for size of plate */}
                <label htmlFor="size" className="size-container">Plate size:</label>
                <br/>
                <input className="form-input-home"
                    type="size"
                    id="size"
                    name="size"
                    required
                    onChange={(event) => setPlateSize(event.target.value)}
                    value={plateSize}
                    />
                    <br/>
                    {/* submit */}
                    <input type="submit" value="Submit" className="form-button-home"></input>
                    
            </form>
            <h2 className="h2-container">Plates</h2>
            {plates.map((plate) => <Plate plate={plate} onDelete={deletePlate} key={plate.id} updatePlate={updatePlate}/>)}
        </div>
        

        {/* ----------------------------------- */}
        {/* HTML for a Cup  */}

        <div className="map-container">
            <h2 className="create-prompt-container">Create a Cup:</h2>
            <form className="form-container-home"
            // use createCup function upon submit
            onSubmit={createCup}>
                {/* for Title of cup */}
                <label htmlFor="title" className="title-container">Title:</label>
                <br/>
                {/* input for title of cup */}
                <input className="form-input-home" 
                    type="text" 
                    id="title" 
                    name="title" 
                    required 
                    onChange={(event) => 
                    setCupTitle(event.target.value)}
                    value={cupTitle}
                />
                {/* input for size of cup */}
                <label htmlFor="size" className="size-container">Cup size:</label>
                <br/>
                <input className="form-input-home"
                    type="size"
                    id="size"
                    name="size"
                    required
                    onChange={(event) => setCupSize(event.target.value)}
                    value={cupSize}
                    />
                    <br/>
                    {/* submit */}
                    <input type="submit" value="Submit" className="form-button-home"></input>
            </form>
            <h2 className="h2-container">Cups</h2>
            {/* will display from component */}
            {cups.map((cup) => <Cup cup={cup} onDelete={deleteCup}  key={cup.id} updateCup={updateCup}/>)}

        </div>
        
    </div>
}

export default Home