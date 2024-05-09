import React, {useState} from 'react'
import {Form, Button} from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { REGISTER_PATH } from '../../consts/managementconsts'
import { loginCall } from '../../apiCalls/apiCalls'
import { ApiError, AuthenticateResponse } from '../../apiCalls/apiTypes'
import { useAppDispatch } from '../../../../hooks'
import { login } from '../../../features/auth/authSlice'

export default function LoginForm() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("")

    const registerButtonHandler = ():void => {
        navigate(REGISTER_PATH)    
    }

    const loginButtonHandler = (): void =>{
        loginCall(
            {
                email: email,
                password: password
            }
        ).then((response: AuthenticateResponse | ApiError) =>{
            if("data" in response){
                if(response.status === 200){
                    localStorage.setItem("user", JSON.stringify(response.data))
                    dispatch(login(response.data))
                    navigate("/management")
                }
            }else{
                console.error(response.message)
            }
        
    })
    }
    
    
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" }}>
        <Form >
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>email</Form.Label>
                <Form.Control required onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
                <Form.Text onClick={() => registerButtonHandler()} style={{float: "left", textDecoration: "underline", cursor: "pointer"}}>Register</Form.Text>
            </Form.Group>
            <Button onClick={() => loginButtonHandler()} variant="primary" type="button" style={{float: "right"}}>
                Login
            </Button>
        </Form>
    </div>
  )
}
