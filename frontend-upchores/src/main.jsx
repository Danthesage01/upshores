import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { Provider } from "react-redux";

import { store } from "./app/store.js";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={7000}
      />
    </StrictMode>
  </Provider>
);
