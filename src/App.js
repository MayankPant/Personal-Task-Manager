import "./App.css";
import AppBar from "./Components/AppBar";
import Card from "./Components/Card";
import taskCompleted from "./assets/resources/task-completed.svg";
import pending from "./assets/resources/pending.svg";
import completed from './assets/resources/completed.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FabButton from './Components/FabButton'

const fabButtonStyles={
  
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#673AB7',
    color: 'white',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s',
  
}

const Main = () => {
  return (
    <div className="App-main">
      <Card
        icon={taskCompleted}
        title={"Total Tasks"}
        subtitle={"tasks in total"}
        number={20}
      />
      <Card
        icon={pending}
        title={"Pending Tasks"}
        subtitle={"tasks pending"}
        number={8}
      />
      <Card
        icon={completed}
        title={"Completed Tasks"}
        subtitle={"tasks completed"}
        number={12}
      />
      <FabButton text={'+'} onClick={""}  styles={fabButtonStyles}/>
    </div>
  );
};
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppBar />
      </header>
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
