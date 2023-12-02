import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Screens Here
import Home from "./screens/Home";
import About from "./screens/About";
import ContactUs from "./screens/Contact";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
