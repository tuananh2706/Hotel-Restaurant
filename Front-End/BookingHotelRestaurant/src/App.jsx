import React from "react";
import "./App.css";
import RoutingPages from "./routing";
import { GobalProvider } from "./context";

function App() {
  return (
    <React.Fragment>
      <GobalProvider>
        <RoutingPages />
      </GobalProvider>
    </React.Fragment>
  );
}

export default App;
