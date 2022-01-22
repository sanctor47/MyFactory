import React from "react";
import styled from "styled-components";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./components/Users";
export default function App() {
  return (
    <Router>
      <Div>
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/users" element={<Users />} />
        </Routes>
      </Div>
    </Router>
  );
}

const Div = styled.div`
  position: relative;
`;
