// Vistas:
import Landing from "./views/Landing/Landing.jsx";
import Home from "./views/Home/Home.jsx";
import { Route, Routes } from "react-router-dom";
// Variables de entorno:
import getParamsEnv from "./functions/getParamsEnv.js";
const { ROOT, HOME } = getParamsEnv();

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={ROOT} element={<Landing />} />
        <Route path={HOME} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;