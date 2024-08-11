import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Components/Main.jsx";
import Header from "./Components/Header.jsx";



function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
