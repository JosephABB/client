import React from 'react';
import './CurrentSession.css';

function CurrentSession(props) {
    const allSessions = props.session.data.map(exercise => {
        return (
            <li key={exercise.exerciseName}>
                {exercise.exerciseName}: {exercise.sets} sets of {exercise.reps} @ {exercise.weight}
            </li>
        )
    });

    return (
        <div>
            <p>{allSessions}</p>
        </div>
    )
}

export default CurrentSession;