import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Components/Main.jsx";
import Header from "./Components/Header.jsx";
import TaskList from "./Components/TaskList.jsx";


function App() {
  return (
    <div className="App">
      <Router>
      <Header />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="tasklist" element={<TaskList />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
