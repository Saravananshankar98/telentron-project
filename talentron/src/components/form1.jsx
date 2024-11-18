import React, { useState } from "react";
import axios from "axios";

const Form12 = () => {
  const [formData, setFormData] = useState({
    name: "saravanan",
    contact_no: 1234567895,
    email: "saravananv15@gmail.com",
    website_url: "asfafwaf",
    linkedin_url: "sadfwfa",
    high_level_requirement: "frond end developer",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData1 = new FormData();
    formData1.append("name", formData.name);
    formData1.append("email", formData.email);
    formData1.append("contact_no", formData.contact_no);
    formData1.append("website_url", formData.website_url);
    formData1.append("linkedin_url", formData.linkedin_url);
    formData1.append("high_level_requirement", formData.expect_in);

    console.log("formdara", formData);
    try {
      const response = await axios.post(
        "http://localhost:4000/employers",
        formData,
        {}
      );

      console.log("Success:", response);

      if (response.data) {
        setMessage(`Tainer data created with ID: ${response.data.id}`);
      } else {
        const error = await response.json();
        console.log("error", error);
        setMessage(`Error: ${error}`);
      }
    } catch (err) {
      // setMessage("Error: Could not connect to the server.");
    }
  };

  return (
    <div>
      <div className="form-container">
        <h1>Trainer Form</h1>
        <div id="div"></div>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="contact_no">Contact No:</label>
            <input
              type="text"
              id="contact_no"
              name="contact_no"
              value={formData.contact_no}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="website_url">website_url:</label>
            <input
              type="text"
              id="website_url"
              name="website_url"
              value={formData.website_url}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="linkedin_url">linkedin Url:</label>
            <input
              type="text"
              id="linkedin_url"
              name="linkedin_url"
              value={formData.linkedin_url}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="expect_in">Expected IN:</label>
            <input
              id="expect_in"
              name="expect_in"
              value={formData.high_level_requirement}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
        {message && (
          <p
            className={`message ${
              message.includes("Error") ? "error" : "success"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Form12;
