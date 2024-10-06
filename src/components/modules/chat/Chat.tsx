"use client"; // This line ensures the component is treated as a client component

import React from "react";

const Chat = () => {
  const printContent = () => {
    window.print();
  };

  return (
    <div>
      <button onClick={printContent}>Print this out!</button>
      <div className="print-content">
        <h1>Hello, World!</h1>
        <p>This will be printed!</p>
      </div>
      <div className="non-print-content">
        <h2>This content will not be printed</h2>
        <p>It remains on the UI but is excluded from the printout.</p>
      </div>
    </div>
  );
};

export default Chat;
