import React,{useState,useContext} from 'react'    
import { useNavigate } from 'react-router-dom'
import alertContext from '../context/alert/alertContext';

const SignUp = () => {
    const REACT_URL=process.env.REACT_APP_BASE_URL
    const { showAlert } = useContext(alertContext);
    const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
    let navigate=useNavigate();

    
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const {name,email,password,cpassword}=credentials
        if(password !== cpassword) {
            alert("Passwords do not match");
            return;  // Stop submission
        }
        const response=await fetch(`${REACT_URL}/api/auth/signup`,{
            method:'POST',
            headers: {
              'Content-Type':'application/json',
            },
            body:JSON.stringify({name,email,password})
        })
        const json=await response.json();
        console.log(json)
        if(json.success){
            localStorage.setItem('token',json.token)
            showAlert("Account created successfully", "success");
            navigate("/")
        }
        else{
            alert(json.error ||"Invalid credentials")
        }
    }

    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
  return (
    <div className='container mt-4'>
        <h1 className="my-3">Create an account to use iNoteBook</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" name="name" id="name" onChange={onChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" onChange={onChange}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" id="password" onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onChange} minLength={5} required/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default SignUp