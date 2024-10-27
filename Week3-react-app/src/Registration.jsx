import React, { useRef, useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repPasswordRef = useRef();
  const buyerRef = useRef();
  const sellerRef = useRef();
  const tosRef = useRef();
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = (formData, repPassword, tosChecked) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   
    if (!formData.username || !formData.email || !formData.password || !repPassword) {
      alert("Please fill in all text fields.");
      return false;
    }
    
    if (!formData.email.match(mailformat)) {
      alert("Invalid e-mail address. Please enter your e-mail again.");
      return false;
    }
    
    if (formData.password.length < 8) {
      alert("Password is too short. Please select another password");
      return false;
    }
    
    if (formData.password !== repPassword) {
      alert("Passwords do not match. Please retry");
      return false;
    }
    
    if (!formData.buyer && !formData.seller) {
      alert("Please check at least one checkbox to be a seller or a buyer.");
      return false;
    }
    
    if (!tosChecked) {
      alert("Please agree to the Terms and Conditions, and Privacy Policy.");
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      username: nameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
      buyer: buyerRef.current.checked,
      seller: sellerRef.current.checked
    };
    
    const repPassword = repPasswordRef.current.value.trim();
    const tosChecked = tosRef.current.checked;

    const isValid = validateForm(formData, repPassword, tosChecked);
    
    if (isValid) {
      // Axios v1 POST request configuration
      const config = {
        method: 'post',
        url: 'https://reqres.in/api/users',
        headers: {
          'Content-Type': 'application/json'
        },
        data: formData
      };

      // Make the API call using Axios v1 syntax
      axios(config)
        .then(function (response) {
          // Create success message
          let formText = `${formData.username} registered as:\n`;
          formText += formData.buyer ? "buyer\n" : "";
          formText += formData.seller ? "seller" : "";
          
          // Show success alert
          alert("Form submitted successfully!");
          
          // Log the API response
          console.log("API Response:", response.data);
          console.log("Status:", response.status);
          
          // Update success message in UI
          setSuccessMessage(formText);
          
          // Reset form
          e.target.reset();
        })
        .catch(function (error) {
          console.error("Error submitting form:", error);
          alert("Error submitting form. Please try again.");
        });
    }
  };

  return (
    <section>
      <form className="center" onSubmit={handleSubmit} noValidate>
        <div className="textInput">
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            ref={nameRef}
            required 
            maxLength="50"
          />
        </div>
        <br />

        <div className="textInput">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            ref={emailRef}
            required
          />
        </div>
        <br />

        <div className="textInput">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            ref={passwordRef}
            required 
            minLength="8"
          />
        </div>
        <br />

        <div className="textInput">
          <label htmlFor="repPassword">Re-type password:</label>
          <input 
            type="password" 
            id="repPassword" 
            name="repPassword" 
            ref={repPasswordRef}
            required 
            minLength="8"
          />
        </div>
        <br />

        <div>
          <input 
            type="checkbox" 
            id="buyer" 
            name="buyer" 
            value="buyer"
            ref={buyerRef}
          />
          <label htmlFor="buyer">I want to buy produce directly from allotment owners.</label>
        </div>
        <br />

        <div>
          <input 
            type="checkbox" 
            id="seller" 
            name="seller" 
            value="seller"
            ref={sellerRef}
          />
          <label htmlFor="seller">I want to sell produce from my allotment.</label>
        </div>
        <br />

        <div>
          <input 
            type="checkbox" 
            id="tos" 
            name="tos" 
            value="tos" 
            ref={tosRef}
            required
          />
          <label htmlFor="tos">
            I agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
          </label>
        </div>
        <br />

        <button type="submit">Register</button>
        <a href="#">Learn more</a>
      </form>

      {/* Hidden section for success message */}
      {successMessage && (
        <div className="center" id="hiddenSection">
          <p id="hiddenParagraph" style={{ whiteSpace: 'pre' }}>
            {successMessage}
          </p>
        </div>
      )}
    </section>
  );
};

export default Registration;