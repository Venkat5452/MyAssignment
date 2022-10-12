import React, { useState } from "react";
import { Link,} from "react-router-dom";
import { Form} from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Signup() {
  localStorage.removeItem('token');
  const navigate=useNavigate();
    const [user,SetUser]=useState({
        name:"",
        email:"",
        password:""

    });
    const handleSubmit = async (e) => {
      e.preventDefault()
        const {name,value}=e.target
        SetUser ({
            ...user,
            [name]:value
        })
      };

      const signup1 =async (e) => {
        e.preventDefault();
          const {name,email,password}=user
          if(name && email && password && password.length>=6) {
             axios.post("http://localhost:9002/signup",user)
             .then(res => {
              alert(res.data.message)
              if(res.data.message==="SuccessFully Registered") {
                localStorage.setItem('token',name);
              }
              navigate("/");
            })
          }
          else {
            alert("Invalid Input");
          }
          
      }
  return (
    <>
      <div className="pp">
        <div className="p-4 box">
          <h2 className="mb-3">You can Signup here..</h2>
          <Form onSubmit={signup1}>
          <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                type="text"
                name="name"
                value={user.name}
                placeholder="Name"
                onChange={handleSubmit}
              />
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                placeholder="Email address"
                onChange={handleSubmit}
              />
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                minLength={'6'}
                onChange={handleSubmit}
              />
            </Form.Group>
  
            <div className="d-grid gap-2">
              <Button variant="primary" type="Submit" >
                Sign UP
              </Button>
            </div>
          </Form>
            <div className="p-3 box text-center mt-3">
              Move To Login page.. <Link to="/login">Login</Link>
            </div> 
        </div>
      </div>  
      </>
  )
}

export default Signup;