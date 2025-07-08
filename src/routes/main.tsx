import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "@/components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <CookiesProvider>
        <App />
        <Toaster richColors position={"bottom-center"} />
      </CookiesProvider>
    </BrowserRouter>
  </>,
);
