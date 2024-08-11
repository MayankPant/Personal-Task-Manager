import React from 'react'
import Card from "./Card.jsx";
import taskCompleted from "../assets/resources/task-completed.svg";
import pending from "../assets/resources/pending.svg";
import completed from '../assets/resources/completed.svg'
import FabButton from './FabButton'
import '../styles/Main.css'

const fabButtonStyles={
  
    backgroundColor: '#673AB7',
    color: 'white',
    border: 'none',
    fontSize: '24px',
  
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

export default Main;