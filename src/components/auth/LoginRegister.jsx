import React, { useState } from 'react'
import Login from '../../pages/Login'
import Register from '../../pages/Register'

export default function LoginRegister() {

    const [showLogin, setShowLogin] = useState(true);

    return (
        <div> 
            {
                showLogin ?
                <Login setShowLogin={setShowLogin} />
                :
                <Register setShowLogin={setShowLogin} />
            }
        </div>  
    );
}
