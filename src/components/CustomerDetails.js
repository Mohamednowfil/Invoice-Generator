import React from "react";

const CustomerDetails = ({ label, details, setDetails }) => {
  return (
    <div>
      <h3>{label} Details</h3>
      <input
        type="text"
        placeholder="Name"
        value={details.name}
        onChange={(e) => setDetails({ ...details, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={details.email}
        onChange={(e) => setDetails({ ...details, email: e.target.value })}
      />
      <textarea
        placeholder="Address"
        value={details.address}
        onChange={(e) => setDetails({ ...details, address: e.target.value })}
      />
    </div>
  );
};

export default CustomerDetails; 
