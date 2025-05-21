import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RouterUrl from "./router";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <RouterUrl />
  </BrowserRouter>
);
