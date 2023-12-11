import React from "react";

const Error = () => {
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f8f9fa",
    },
    content: {
      textAlign: "center",
      padding: "20px",
      border: "1px solid #dc3545",
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      maxWidth: "400px",
      width: "90%",
    },
    heading: {
      color: "#dc3545",
    },
    paragraph: {
      marginTop: "10px",
      color: "#495057",
    },
  };

  return (
    <div style={styles.container}>
      <main style={styles.content}>
        <h1 style={styles.heading}>An Error Occurred</h1>
        <p style={styles.paragraph}>Couldn't find this page 👀</p>
      </main>
    </div>
  );
};

export default Error;
