import React, { useState } from 'react';

// The component now accepts a prop called onPredict
function StudentForm({ onPredict }) {
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('General');
  const [branch, setBranch] = useState('CSE');

  const handleSubmit = (event) => {
    event.preventDefault();
    const studentData = { rank, category, branch };

    // Instead of console.log, we now call the function passed from the parent
    onPredict(studentData);
  };

  // The rest of the form JSX is the same
  // In StudentForm.js
return (
  <div className="form-container">
    <h2>Enter Your Details to Predict Colleges</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Enter Your Rank:</label>
        <input
          type="number"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Select Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="General">General</option>
          <option value="OBC">OBC</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
          <option value="EWS">EWS</option>
        </select>
      </div>
      <div>
        <label>Select Preferred Branch:</label>
        <select value={branch} onChange={(e) => setBranch(e.target.value)}>
          <option value="CSE">Computer Science</option>
          <option value="ECE">Electronics & Communication</option>
          <option value="ME">Mechanical Engineering</option>
          <option value="Civil">Civil Engineering</option>
        </select>
      </div>
      <button type="submit">Predict Now</button>
    </form>
  </div>
);
}

export default StudentForm;