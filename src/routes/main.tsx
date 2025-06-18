import { createRoot } from "react-dom/client";
import "../styles/index.css";
import Router from "./index.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <Router />
  </>,
);
