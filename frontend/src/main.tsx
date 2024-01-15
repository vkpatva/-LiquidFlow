import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./styles/globals.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "ethereum";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <BrowserRouter>
  <ThirdwebProvider
    clientId={import.meta.env.VITE_THIRDWEB_APP_ID}
    activeChain={activeChain}
  >
    <App />
    <ToastContainer />
  </ThirdwebProvider>
</BrowserRouter>
);
