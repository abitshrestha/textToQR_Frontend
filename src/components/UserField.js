import React from 'react'
import { useState} from 'react';
import {useNavigate} from 'react-router-dom'

const UserField=()=>{
    const navigate = useNavigate();
    const [error,setError]=useState('');
    const [value,setValue]=useState('');
    const [uniqueID,setUniqueID]=useState('');
    const [isLoading,setIsLoading]=useState(false);
    const handleClick=async(e)=>{
        e.preventDefault();
        if(value.trim()===''){
            setError("Input can't be empty");
        }
        else{
            setError('');
            const response=await fetch('https://texttoqr-backend.onrender.com/generateQR',{
                method:'post',
                body:JSON.stringify({
                    userText:value
                }),
                headers:{
                    'Content-type':'application/json',
                }
            });
            if(response.ok){
                setIsLoading(true);
                const data=await response.json();
                setUniqueID(data.uniqueID);
                const qrCodeUrl = `/qrImage/${data.uniqueID}`;
                setIsLoading(false);
                navigate(qrCodeUrl);
            }
        
            // result=await result.json();
            // console.warn(result);
        }
    }
    const handleChange = (e) => {
        setValue(e.target.value);
        if(value.trim().length>0){
            setError('');
        }
    }

    return(
        <div className='userInputs'>
            <h1>Convert your text to QR code</h1>
            <input type="text" onChange={handleChange} value={value} name='userText' placeholder="enter your text to convert to QR...."/>
            <p className='error'>{error?error:''}</p>
            {isLoading?<div><p>Loading...</p><br/><p>This may take a while...</p></div>:""}
            <button onClick={handleClick} className="userButton" type="button">Generate</button>
        </div>
    )
}

export default UserField;
