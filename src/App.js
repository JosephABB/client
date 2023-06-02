import React, { useState } from 'react';
import './App.css';
import PrevSessions from "./components/PrevSessions";
import CurrentSession from './components/CurrentSession';

function App() {
  const [inputValues, setInputValues] = useState({
    exerciseName: "",
    sets: "",
    reps: "",
    weight: ""
});

//array that contains each exercise and it's data for a given session
const [allSessions, setAllSessions] = useState([]);

//object that contains the session's name and its array of allSessions 
const [gymSession, setGymSession] = useState({
    name: "",
    date: "",
    data: []
});

//function called when user enters an input value
function handleInputChange(event) {
    const { name, value } = event.target;
    setInputValues((prevState) => ({
        ...prevState,
        [name]: value
    }));
}

//function called when the user wants to add an exercise to a session
function handleSubmit(event) {
  event.preventDefault();
  const newObject = {
      exerciseName: inputValues.exerciseName,
      sets: inputValues.sets,
      reps: inputValues.reps,
      weight: inputValues.weight
  };
  setGymSession((prevState) => ({
      name: prevState.name,
      date: prevState.date,
      data: [...prevState.data, newObject]
  }));
  setInputValues({
      exerciseName: "",
      sets: "",
      reps: "",
      weight: ""
  });
}

const handleObjectSubmit = async (event) => {
    event.preventDefault();
    const newObjects = [...allSessions, gymSession];
    setAllSessions(newObjects);
    setGymSession({
        name: "",
        date: "",
        data: []
    })

    // send HTTP post request to server
    try {
        const response = await fetch("http://localhost:5050/api/data", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gymSession),
        });

        const data = await response.json();
    } catch (error) {
        console.error(error);
    }
};

//function called when the user enters a session's name
function handleObjectNameChange(event) {
  setGymSession((prevState) => ({
      ...prevState,
      name: event.target.value
  }));
}

//function called when user enters a session's date
function handleObjectDateChange(event) {
  setGymSession((prevState) => ({
    ...prevState,
    date: event.target.value
  }));
}

return (
    <div>
      <div className='sessionContainer'>
        <form className='sessionHeader' onSubmit={handleObjectSubmit}>
          Session Name: 
          <input
            type="text"
            value={gymSession.name}
            onChange={handleObjectNameChange}
          />
          Session Date:
          <input
            type="date"
            value={gymSession.date}
            onChange={handleObjectDateChange} 
          />
          <button type="submit">Save Gym Session</button>
        </form>
        <form className='sessionInputField' onSubmit={handleSubmit}>
          Exercise Name:
          <input
            type="text"
            name="exerciseName"
            value={inputValues.exerciseName}
            onChange={handleInputChange}
          />
          Number of Sets:
          <input
            type="text"
            name="sets"
            value={inputValues.sets}
            onChange={handleInputChange}
          />
          Number of Reps:
          <input
            type="text"
            name="reps"
            value={inputValues.reps}
            onChange={handleInputChange}
          />
          Weight Used:
          <input
            type="text"
            name="weight"
            value={inputValues.weight}
            onChange={handleInputChange}
          />
          <button type="submit">Add Exercise</button>
          <CurrentSession session={gymSession} />
        </form>
      </div>
      <PrevSessions sessions={allSessions} />
    </div>
  );
}

export default App;
