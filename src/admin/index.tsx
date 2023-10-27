import React from "react";
import ReactDOM from "react-dom/client"
import Admin from "./admin";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <Admin />
    </React.StrictMode>
);