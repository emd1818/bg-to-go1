import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import BGtoGo from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BGtoGo />
  </StrictMode>
);
