
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () =>
{
    const navigate = useNavigate();
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[msg, setMsg] = useState('');
    const submit = async (e) => {
        e.preventDefault();
        // console.log('emali:', email,
        // 'password:', password);
        setMsg('');
        try 
        {

            const response =await axios.post('http://localhost:8080/login', {email, password})
            if (response.status === 200) {
                // console.log("Login successful");
                localStorage.setItem("token", response.data.token);
                navigate("/");
            }else {
                console.log("Login failed");
            }
        }catch(error)
        {
            if (error.response) {
                console.log("Error:", error.message);
            }
        }
        
    }
    return (
        <form onSubmit={submit}>
            <div>logo goes here</div>
            <h1>{msg}</h1>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type='submit'> Submit</button>

            
        </form>
    )
}

export default Login;