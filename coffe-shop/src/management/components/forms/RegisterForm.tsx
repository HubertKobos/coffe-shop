import React, {useState} from 'react'
import {Form, Button} from "react-bootstrap"
import { registerCall } from '../../apiCalls/apiCalls'
import { ApiError, AuthenticateResponse } from '../../apiCalls/apiTypes'
import { useNavigate } from 'react-router-dom'

export default function RegisterForm() {
    const navigate = useNavigate()

    const [email, setEmail] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [surname, setSurname] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    
    const arePasswordsTheSame = ():boolean => {
        if(password.length > 4 && confirmPassword.length > 4){
            if(password === confirmPassword){
                return true
            }
        }
        return false
    }

    const buttonHandler = ():void =>{
        if(arePasswordsTheSame()){
            registerCall(
                {
                    "email": email,
                    "firstName": firstName,
                    "surname": surname,
                    "password": password
                }
            ).then((response: AuthenticateResponse | ApiError) =>{
                    if("data" in response){
                        if(response.status === 200){
                            navigate("/login")
                        }
                    }else{
                        console.error(response.message)
                    }
                
            })
            
        }
    }
    
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" }}>
        <Form >
            <Form.Group className='mb-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Enter email" id='email'/>

            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>First name</Form.Label>
                <Form.Control onChange={(e) => setFirstName(e.target.value)} required type="text" placeholder="Enter first name" id='firstName'/>

                <Form.Label>Surname</Form.Label>
                <Form.Control onChange={(e) => setSurname(e.target.value)} required type="text" placeholder="Enter surname" id="surname" />

            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="Password" id="password"/>

                <Form.Label className='mt-3'>Confirm password</Form.Label>
                <Form.Control onChange={(e) => setConfirmPassword(e.target.value)} required type="password" placeholder="Confirm password" id="confirmPassword" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formLoginButton">
                <Form.Text style={{float: "left", textDecoration: "underline", cursor: "pointer"}}>login</Form.Text>
            </Form.Group>
            <Button onClick={() => buttonHandler()} variant="primary" type="button" style={{float: "right"}}>
                Register
            </Button>
        </Form>
    </div>
  )
}
