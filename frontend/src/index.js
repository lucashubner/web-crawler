import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Container from '@material-ui/core/Container';

ReactDOM.render(
  <BrowserRouter>
	<Container fixed>
    <App />
	</Container>
  </BrowserRouter>,
  document.getElementById("root")
);
