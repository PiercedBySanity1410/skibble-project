import { createRoot } from "react-dom/client";
import "./base.scss";
import "./styles/index.scss";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <App />
);
