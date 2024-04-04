import React from "react";
import profile from "../images/profile.jpeg"
import "../styles/Footer.css"

function Footer() {
    return <div className="card">
    <div className="profile-sidebar">
        <img className="profile-image" src={profile} alt="Profile Image"/>
            <ul className='social-list'>
                <li className='social-item'><a className='social-link' href="https://www.linkedin.com/in/erickvalenciadev/">LinkedIn</a></li>

                <li className='social-item'><a className='social-link' href="https://github.com/Flix0911">GitHub</a></li>

            </ul>
        </div>

    </div>
}

export default Footer