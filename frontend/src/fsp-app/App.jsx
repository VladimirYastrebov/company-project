import { Route, Routes } from "react-router-dom";
import { HomePage, EmployeById } from "./Pages/index.js";
// In your main.jsx after importing i18n
import "../shared/i18n";
import i18n from "../shared/i18n";

// Check what LanguageDetector detected
console.log('Detected language:', i18n.language);
console.log('Languages from detector:', i18n.services.languageDetector.detect());

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/emploeyeById/:id" element={<EmployeById />}></Route>
    </Routes>
  );
}

export default App;
