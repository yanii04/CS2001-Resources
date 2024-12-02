import React, { useState } from "react";
import axios from "axios";

export default function Registration() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repPassword, setRepPassword] = useState('');
    const [buyer, setBuyer] = useState(false);
    const [seller, setSeller] = useState(false);
    const [tos, setTos] = useState(false);

    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handlerepPasswordChange = (e) => setRepPassword(e.target.value);
    const handleBuyerChange = (e) => setBuyer(e.target.checked);
    const handleSellerChange = (e) => setSeller(e.target.checked);
    const handleTosChange = (e) => setTos(e.target.checked);

    const validateForm = () => {
        let formValid = true;

        if (!name || !email || !password || !repPassword) {
            alert("Please fill in all text fields.");
            formValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Invalid e-mail address. Please enter your e-mail again.");
            formValid = false;
        } else if (password.length < 8) {
            alert("Password is too short. Please select another password");
            formValid = false;
        } else if (password !== repPassword) {
            alert("Passwords do not match. Please retry");
            formValid = false;
        } else if (!buyer && !seller) {
            alert("Please check at least one checkbox to select being a seller or a buyer in the system.");
            formValid = false;
        } else if (!tos) {
            alert("Please agree to the Terms and Conditions, and Privacy Policy.");
            formValid = false;
        }

        return formValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            try {
                const response = await axios.post('https://reqres.in/api/users', {
                    name,
                    email,
                    password,
                    buyer,
                    seller
                });

                console.log(response);

                if (response.status === 201) {
                    alert("Registered successfully.");

                    // Clear input fields after successful registration
                    setName("");
                    setEmail("");
                    setPassword("");
                    setRepPassword("");
                    setBuyer(false);
                    setSeller(false);
                    setTos(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (

        <>
        <p>This is Register Page.</p>
        <form className="registration" noValidate onSubmit={handleSubmit}>
            <label className="labelText">Name: </label>
            <input
                type="text"
                className="inputText"
                name="name"
                required
                autoComplete="off"
                value={name}
                onChange={handleNameChange} /><br /><br />

            <label className="labelText">Email:</label>
            <input
                type="email"
                className="inputText"
                name="email"
                required
                autoComplete="off"
                value={email}
                onChange={handleEmailChange} /><br /><br />

            <label className="labelText">Password:</label>
            <input
                type="password"
                className="inputText"
                name="password"
                required
                minLength="8"
                value={password}
                onChange={handlePasswordChange} /><br /><br />

            <label className="labelText">Re-type password:</label>
            <input
                type="password"
                className="inputText"
                name="repPassword"
                required
                value={repPassword}
                onChange={handlerepPasswordChange} /><br /><br />

            <input
                type="checkbox"
                name="buyer"
                checked={buyer}
                onChange={handleBuyerChange} />
            <label>I want to buy produce directly from allotment owners.</label><br />

            <input
                type="checkbox"
                name="seller"
                checked={seller}
                onChange={handleSellerChange} />
            <label>I want to sell produce from my allotment.</label><br /><br />

            <input
                type="checkbox"
                name="tos"
                checked={tos}
                required
                onChange={handleTosChange} />
            <label>I agree to the Terms of Use and Privacy Policy.</label>
            <br /><br />

            <button type="submit">Submit</button>
        </form></>
    );
}
