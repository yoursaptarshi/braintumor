import React, { useState } from 'react';
import './Detect.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios'
const Detect = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageUpload = async(e) => {
    const uploadedImage = e.target.files[0];
    console.log(e.target.files[0])
    setImage(uploadedImage)

    const formData = new FormData();
    formData.append('image', uploadedImage);
    const config = {     
      headers: { 'content-type': 'multipart/form-data' }
  }

    const response = await axios.post('http://127.0.0.1:5000/predict',formData,config)
console.log(response.data.prediction)
    let isTumorDetected = await (response.data.prediction===1) ? true : false
    setResult(isTumorDetected);
  };

  return (
    <div className="detect-container">
      <div className="detectHeader">
      .
      </div>
     
      <div className="upload-form">
      
        <label htmlFor="image" className="upload-label">
        <CloudUploadIcon style={{marginRight:'1vw'}}/>
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          id="image"
          onChange={handleImageUpload}
          className="upload-input"
        />
      </div>
      {result !== null && (
        <div className={`result ${result ? 'tumor-detected' : 'no-tumor-detected'}`}>
          {result ? 'Brain Tumor Detected' : 'No Tumor Detected'}
        </div>
      )}

      <div className="steps">
        <div className="step">1. Click on "Upload Image" button</div>
        <div className="step">2. Select an image file</div>
        <div className="step">3. Wait for the result</div>
      </div>
    </div>
  );
};

export default Detect;
