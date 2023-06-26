import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiryDateTime');
    navigate('/login', { replace: true });
    window.location.reload();
  }

  const cancel = () => {
    navigate('/home', { replace: true });
  }

  return (
    <>
      <h1>Are you sure you want to logout</h1>
      <div style={{'display':'flex','gap':'20px'}}>
        <Button onClick={logout} variant="contained" color="error">Yes</Button>
        <Button onClick={cancel} variant="contained" color="success">No</Button>
      </div>
    </>
  )
}
