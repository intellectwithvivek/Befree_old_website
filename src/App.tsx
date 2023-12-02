import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Screens Here
import Home from "./screens/Home";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
