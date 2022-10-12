import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {useState} from 'react';

function DashBoard() {
  const [name,setname]=useState("");
  const navigate=useNavigate();
  useEffect(()=>{
    function f() {
      if(!localStorage.getItem('token')) {
          navigate("/login");  
      }
      else {
        setname(localStorage.getItem('token'));
      }
    }
      f();
  });
  const handlelogout=()=>{
    localStorage.removeItem('token');
    navigate('/');
  }
  return (
    <>

    <div className='pp'>
       <h2>Welcome to DashBoard <br></br><h1 className='text-success'> {name} </h1>
    <br></br>
      <Button variant='primary' onClick={handlelogout}>Log out</Button> </h2>
    </div>
    </>

  )
}

export default DashBoard;