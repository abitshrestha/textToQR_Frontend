import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
const Navigation=()=>{   
    const {uniqueID}=useParams();
    const [imageUrls,setImageUrls]=useState([]);
     useEffect(()=>{
     fetch(`https://texttoqr-backend.onrender.com/qrImage/${uniqueID}`)
          .then(response=>{
            console.log(response);
            return response.blob()})
          .then(imageBlob=>{
             console.log(imageBlob);
              const imageUrl=URL.createObjectURL(imageBlob);
              setImageUrls(imageUrl);
          })
          .catch(error=>console.error(`Error fetching images:`,error));
    },[]);
    const handleDownload=(imageUrls)=>{
      const link=document.createElement('a');
      link.href=imageUrls;
      link.download='qr_code.png';
      link.click();
    }
    console.log(imageUrls);
    return(
        <div>
          <h2>Generated QR Code</h2>
            <img  src={imageUrls} alt="My Qr Code"/>
            <button onClick={()=>handleDownload(imageUrls)} className='userButton downloadBtn'>Download QR Code</button>
        </div>
    )
}
export default Navigation;