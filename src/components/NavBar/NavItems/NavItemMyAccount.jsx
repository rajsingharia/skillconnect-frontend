
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useCountdown } from '../../../utils/Helper';
import { Tooltip } from '@mui/material';

export default function NavItemMyAccount() {

    const [days, hours, minutes, seconds] = useCountdown(localStorage.getItem('expiryDateTime'));
    const userId = localStorage.getItem('userId');

    return (
        <div className="my-account">
            <div className='d-flex flex-row align-items-center' >
                <div >
                    {
                        localStorage.getItem('token') &&
                        <h6 >
                            <span className="badge badge-pill badge-dark" style={{ 'marginRight': '10px', 'marginLeft': '10px' }}>
                                {days}d {hours}h {minutes}m {seconds}s
                            </span>
                        </h6>
                    }
                </div>
                <div className="btn-group">
                    <Tooltip title={`SSDS${userId}`}>
                        <button
                            type="button"
                            className="btn btn-outline-light"
                            data-toggle="dropdown"
                            aria-haspopup="false"
                            aria-expanded="false"
                            style={{ 'borderRadius': '50%', 'padding': '0.2rem', 'marginLeft': '10px' }}>

                            <img className="profile-pic" src="https://www.gravatar.com/avatar/00?d=mp" width="30" height="30" alt="" />

                        </button>
                    </Tooltip>

                    <div className="dropdown-menu dropdown-menu-right">
                        <button className="dropdown-item" type="button">
                            <Link className="dropdown-item" to="/account">MyAccount</Link>
                        </button>
                        <button className="dropdown-item" type="button">
                            <Link className="dropdown-item" to="/logout">Logout</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
