import React, { useEffect, useState } from 'react';
import './PrevSessions.css';

/* Component that displays previous sessions with a button */
function PrevSessions(sessions) {
    const [collapsedSessions, setCollapsedSessions] = useState([]);

    // toggles individual sessions 
    const toggleSession = (sessionID) => {
        if (collapsedSessions.includes(sessionID)) {
            setCollapsedSessions(collapsedSessions.filter((_id) => _id !== sessionID));
        } else {
            setCollapsedSessions([...collapsedSessions, sessionID]);
        }
    };

    // variable for previous sessions
    const [dbSessions, setDBSessions] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    // send HTTP post request to server for all gym sessions
    const fetchData = async () => {
        // send HTTP post request to server
        try {
            const response = await fetch("http://localhost:5050/api");   
            const dbSessions = await response.json();
            setDBSessions(dbSessions);
        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    };

    return (
        <div>
            <button onClick={() => setCollapsedSessions([])}>
                Expand All
            </button>
            <button onClick={() => setCollapsedSessions(dbSessions.map((item) => item._id))}>
                Collapse All
            </button>
            <div>
                <h2 className='prevSessionsHeader'>Previous Sessions</h2>
                    <ul>
                        {dbSessions.map((item) => (
                            <li key={item._id} className='container'>
                                <h3 onClick={() => toggleSession(item._id)}>{item.name} ({item.date})</h3>
                                {!collapsedSessions.includes(item._id) && (
                                    <ul>
                                        {item.data && item.data.map((exercise) => (
                                            <li key={exercise.exerciseName}>
                                                {exercise.sets} sets of {exercise.reps} {exercise.exerciseName} 
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
            </div>
        </div>
    );
}

export default PrevSessions;