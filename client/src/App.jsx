import { useReducer } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/product/MainPage";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import GlobalStore, {
  defaultStore,
  storeReducer,
} from "./lib/context/GlobalStore";
function App() {
  const globalStore = useReducer(storeReducer, defaultStore());

  return (
    <GlobalStore.Provider value={globalStore}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/calendar/:roomId" element={<Dashboard />} />
          <Route path="/calendar" element={<LandingPage/>}/>
        </Routes>
      </Router>
    </GlobalStore.Provider>
  );
}

export default App;
