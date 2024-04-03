import React, { useState, useEffect } from "react";
import api from "../api";

function ShowPlate({ plateId }) {
    const [plate, setPlate] = useState(null);

    useEffect(() => {
        api.get(`/api/plates/show/${plateId}`)
            .then(response => {
                setPlate(response.data);
            })
            .catch(error => {
                console.error("Error fetching plate:", error);
            });
    }, [plateId]);

    return (
        <div>
            {plate ? (
                <div className="plate-container">
                    <p className="plate-title">{plate.title}</p>
                    <p className="plate-size">{plate.size}</p>
                </div>
            ) : (
                <p>Loading plate...</p>
            )}
        </div>
    );
}

export default ShowPlate;