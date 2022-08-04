import React from "react";
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";


import App from "./client/App";

const container  = document.querySelector('#root')
const root = ReactDOM.createRoot(container)
root.render(
<BrowserRouter>
    <App />
</BrowserRouter>)