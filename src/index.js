import React from "react";
import App from "./App";
import Modal from "react-modal";
import ReactDOM from 'react-dom';
import './main.css'; // Import your Tailwind CSS here

Modal.setAppElement("#root");

const container = document.getElementById('root');

ReactDOM.render(
    //<React.StrictMode>
      <App />,
    //</React.StrictMode>,
    document.getElementById('root')
  );