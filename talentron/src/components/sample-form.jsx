import React, { useState } from "react";

const SampleForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    mail_id: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target; // Destructure the name and value from the input
    setFormData({
      ...formData, // Spread existing values
      [name]: value, // Update the specific field
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", formData); // Log form data for debugging

    // Example: Send form data to an API
    fetch("http://localhost:4000/trainingSessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Convert form data to JSON
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Form submitted successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error submitting the form.");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange} // Handle changes for this input
        />
        <input
          name="mail_id"
          placeholder="Email"
          value={formData.mail_id}
          onChange={handleChange} // Handle changes for this input
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SampleForm;
