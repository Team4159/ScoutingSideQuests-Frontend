import React from "react";
import ReactDOM from "react-dom/client"
import "./index.css"
import Admin from "../admin"

const index = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
index.render(
    <React.StrictMode>
        <Admin /> {/*for now */}
    </React.StrictMode>
)