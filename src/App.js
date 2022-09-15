import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavbarComponent } from "./component";
import { Home, Success } from "./pages";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sukses" element={<Success />} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}
