import React,{useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import alertContext from "../context/alert/alertContext";

const Login = () => {
    const { showAlert } = useContext(alertContext);
    const [credentials,setCredentials]=useState({email:"",password:""})
    let navigate=useNavigate();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response=await fetch(`http://localhost:5000/api/auth/login/`,{
            method:'POST',
            headers: {
              'Content-Type':'application/json',
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        })
        const json=await response.json();
        console.log(json)
        if(json.success){
            localStorage.setItem('token',json.token)
            showAlert("Logged in successfully!", "success");
            navigate("/")
        }
        else{
            showAlert("Invalid credentials", "danger");
        }
    }

    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
  return (
    <>
    <div className='container mt-4'>
    <h1 className="my-3">Login to continue to iNoteBook</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" name="email" value={credentials.email} id="email" aria-describedby="emailHelp" onChange={onChange}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" value={credentials.password} id="password" onChange={onChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
    </>
  )
}

export default Login