import React from "react";
import ReactDOM from "react-dom/client"
import "./index.css"
import Admin from "../admin/admin"

const index = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
index.render(
    <React.StrictMode>
        <Admin></Admin> // for now
    </React.StrictMode>
)