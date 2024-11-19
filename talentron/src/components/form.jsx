import React, { useState } from "react";
import axios from "axios";

const Form = (props) => {
  const [formData, setFormData] = useState({
    state_id: "TN",
    district_code: "TN14",
    city: "thiruvannamalai",
    email: "saravananvijay005@gmail.com",
    notice_period: 2,
    expected_salary: 2,
    name: "saravanan",
    contact_no: 1234567895,
    resume: null,
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, resume: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData1 = new FormData();
    formData1.append("name", formData.name);
    formData1.append("email", formData.email);
    formData1.append("contact_no", formData.contact_no);
    formData1.append("district_code", formData.district_code);
    formData1.append("city", formData.city);
    formData1.append("expected_salary", formData.expected_salary);
    formData1.append("notice_period", formData.notice_period);
    formData1.append("state_id", formData.state_id);
    formData1.append("resume", formData.resume);

    console.log("formdara", formData);
    try {
      const response = await axios.post(
        "http://localhost:4000/job-seekers",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Success:", response);

      if (response.data) {
        setMessage(`Job Seeker created with ID: ${response.data.id}`);
      } else {
        const error = await response.json();
        console.log("error", error);
        setMessage(`Error: ${error}`);
      }
    } catch (err) {
      console.log("eror", err);
    }
  };

  return (
    <div>
      <div className="form-container">
        <h1>Job Seeker Form</h1>
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
              required
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
              required
            />
          </div>

          <div>
            <label htmlFor="state_id">State ID:</label>
            <input
              type="text"
              id="state_id"
              name="state_id"
              value={formData.state_id}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="district_code">District Code:</label>
            <input
              type="text"
              id="district_code"
              name="district_code"
              value={formData.district_code}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
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
              required
            />
          </div>

          <div>
            <label htmlFor="notice_period">Notice Period:</label>
            <input
              type="text"
              id="notice_period"
              name="notice_period"
              value={formData.notice_period}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="expected_salary">Expected Salary:</label>
            <input
              type="number"
              id="expected_salary"
              name="expected_salary"
              value={formData.expected_salary}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="resume">Resume:</label>
            <input
              type="file"
              id="resume"
              name="resume"
              fileref
              onChange={handleFileChange}
              required
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

export default Form;
