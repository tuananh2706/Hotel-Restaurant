import React from "react";
import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import HomePage from "./pages/homePage";

function App() {
  
  return (
    <React.Fragment>
      <Header />
      <div className="bg-slate-100 flex justify-center">
        <HomePage />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
