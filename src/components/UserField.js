import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserField = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const [uniqueID, setUniqueID] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  const handleClick = async (e) => {
    e.preventDefault();
    if (value.trim() === '') {
      setError("Input can't be empty");
    } else {
      setError('');
      setIsLoading(true); // Set isLoading to true while fetching data
      try {
        const response = await fetch('https://texttoqr-backend.onrender.com/generateQR', {
          method: 'post',
          body: JSON.stringify({
            userText: value,
          }),
          headers: {
            'Content-type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUniqueID(data.uniqueID);
          const qrCodeUrl = `/qrImage/${data.uniqueID}`;
          navigate(qrCodeUrl);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false); // Set isLoading to false after fetching data
      }
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (value.trim().length > 0) {
      setError('');
    }
  };

  return (
    <div className='userInputs'>
      <h1>Convert your text to QR code</h1>
      <input type='text' onChange={handleChange} value={value} name='userText' placeholder='enter your text to convert to QR....' />
      <p className='error'>{error ? error : ''}</p>
      {isLoading?<div><p>Processing...</p><br/><p className='hold'>Hold On!This may take while</p></div>:""}
        <button onClick={handleClick} className='userButton' type='button'>
          Generate
        </button>

    </div>
  );
};

export default UserField;
