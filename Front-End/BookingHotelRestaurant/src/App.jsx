import React from "react";
import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";

function App() {
  return (
    <React.Fragment>
      <Header />
      <div className="bg-slate-100 h-[100vh]">
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
