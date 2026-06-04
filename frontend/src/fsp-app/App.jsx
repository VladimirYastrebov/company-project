import { Route, Routes } from "react-router-dom";
import { HomePage, EmployeById } from "./Pages/index.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/emploeyeById/:id" element={<EmployeById />}></Route>
    </Routes>
  );
}

export default App;
