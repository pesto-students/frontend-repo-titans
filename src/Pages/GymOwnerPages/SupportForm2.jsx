import React, { useState } from "react";

export default function SupportForm2() {
    // Inline styles for the component
    const containerStyle = {
        padding: "16px",
        maxWidth: "640px",
        margin: "auto",
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
    };

    const headingStyle = {
        color: "red",
        fontSize: "2rem",
        fontWeight: "bold",
        marginBottom: "16px",
    };

    const introTextStyle = {
        marginBottom: "24px",
    };

    const formSectionStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "24px",
    };

    const formGroupStyle = {
        display: "flex",
        flexDirection: "column",
    };

    const subheadingStyle = {
        fontSize: "1.25rem",
        color: "red",
        fontWeight: "600",
        marginBottom: "8px",
    };

    const inputFieldStyle = {
        width: "100%",
        padding: "8px",
        border: "1px solid #444",
        borderRadius: "4px",
        backgroundColor: "#333",
        color: "white",
    };

    const addressFlexStyle = {
        display: "flex",
        gap: "16px",
    };

    const addressGroupStyle = {
        flex: "1",
    };

    const redLineStyle = {
        border: "0",
        height: "2px",
        backgroundColor: "red",
        margin: "24px 0",
    };

    // State for form fields
    const [images, setImages] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [agreed, setAgreed] = useState(false);
    const [formFields, setFormFields] = useState({
        addressLine1: "",
        addressLine2: "",
        pincode: "",
        googleMapsLink: "",
        description: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormFields(prevFields => ({ ...prevFields, [name]: value }));
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Welcome User</h1>
            <p style={introTextStyle}>
                To ensure we present your gym in the best light and provide essential information to our members, please complete the onboarding form below.
            </p>

            <form onSubmit={handleSubmit} style={formSectionStyle}>
                <div style={formGroupStyle}>
                    <h2 style={subheadingStyle}>Address Line 1</h2>
                    <input
                        type="text"
                        name="addressLine1"
                        placeholder="Address 1"
                        value={formFields.addressLine1}
                        onChange={handleInputChange}
                        style={inputFieldStyle}
                    />
                </div>

                <div style={addressFlexStyle}>
                    <div style={addressGroupStyle}>
                        <h2 style={subheadingStyle}>Address Line 2</h2>
                        <input
                            type="text"
                            name="addressLine2"
                            placeholder="Address 2"
                            value={formFields.addressLine2}
                            onChange={handleInputChange}
                            style={inputFieldStyle}
                        />
                    </div>

                    <div style={addressGroupStyle}>
                        <h2 style={subheadingStyle}>Pincode</h2>
                        <input
                            type="number"
                            name="pincode"
                            placeholder="Pincode"
                            value={formFields.pincode}
                            onChange={handleInputChange}
                            style={inputFieldStyle}
                        />
                    </div>
                </div>

                <div style={addressGroupStyle}>
                    <h2 style={subheadingStyle}>Google Maps Link:</h2>
                    <input
                        type="text"
                        name="googleMapsLink"
                        placeholder="Google Maps Link"
                        value={formFields.googleMapsLink}
                        onChange={handleInputChange}
                        style={inputFieldStyle}
                    />
                </div>

                <hr style={redLineStyle} />

                <div style={addressGroupStyle}>
                    <h2 style={subheadingStyle}>Gym Description:</h2>
                    <textarea
                        name="description"
                        placeholder="Enter Gym Description"
                        value={formFields.description}
                        onChange={handleInputChange}
                        style={{ ...inputFieldStyle, minHeight: "100px" }}
                    />
                </div>

                <hr style={redLineStyle} />

                <div style={formGroupStyle}>
                    <h2 style={subheadingStyle}>Upload Gym Images</h2>
                    <input
                        type="file"
                        multiple
                        onChange={handleImageUpload}
                        style={inputFieldStyle}
                    />
                </div>

                <hr style={redLineStyle} />

                <div style={formGroupStyle}>
                    <h2 style={subheadingStyle}>Facilities</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label>
                            <input
                                type="checkbox"
                                value="gym"
                        
                                onChange={handleFacilityChange}
                            />
                            Gym
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="shower"
                               
                                onChange={handleFacilityChange}
                            />
                            Shower
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="steam"
                               
                                onChange={handleFacilityChange}
                            />
                            Steam
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="locker"
                              
                                onChange={handleFacilityChange}
                            />
                            Locker
                        </label>
                    </div>
                </div>
                <hr style={redLineStyle} />

                <div style={formGroupStyle}>
                    <label>
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={handleAgreementChange}
                        />
                        I agree to the terms and conditions
                    </label>
                </div>

                <button type="submit" style={inputFieldStyle}>
                    Submit
                </button>
            </form>
        </div>
    );

    // Handlers for form functionality
    function handleImageUpload(event) {
        const files = Array.from(event.target.files);
        setImages(files);
    }

    function handleFacilityChange(event) {
        const options = event.target.options;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push(options[i].value);
            }
        }
        setSelectedFacilities(selected);
    }

    function handleAgreementChange(event) {
        setAgreed(event.target.checked);
    }

    function handleSubmit(event) {
        event.preventDefault();
        // Handle form submission logic
        console.log("Form submitted with the following data:");
        console.log("Address Line 1:", formFields.addressLine1);
        console.log("Address Line 2:", formFields.addressLine2);
        console.log("Pincode:", formFields.pincode);
        console.log("Google Maps Link:", formFields.googleMapsLink);
        console.log("Description:", formFields.description);
        console.log("Images:", images);
        console.log("Selected Facilities:", selectedFacilities);
        console.log("Agreed to Terms:", agreed);
    }
}