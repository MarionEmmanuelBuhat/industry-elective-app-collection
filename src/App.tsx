import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ColorSequence from "./pages/ColorSequence";
import ColorRoll from "./pages/ColorRoll";
import AlienAnimation from "./pages/AlienAnimation";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/colorsequence" element={<ColorSequence />} />
        <Route path="/colorroll" element={<ColorRoll />} />
        <Route path="/alien" element={<AlienAnimation />} />
      </Routes>
    </>
  );
}

export default App;
