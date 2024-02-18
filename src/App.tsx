import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ColorSequence from "./pages/ColorSequence";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/colorsequence" element={<ColorSequence />} />
      </Routes>
    </>
  );
}

export default App;
