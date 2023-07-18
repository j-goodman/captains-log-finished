import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function LogNewForm(props) {
  let navigate = useNavigate();

  const [log, setLog] = useState({
    captainName: "",
    title: "",
    daysSinceLastCrisis: 0,
    mistakesWereMadeToday: false,
    post: "",
  });

  const addLog = () => {
    axios
      .post(`${API}/logs`, log)
      .then(() => {
        navigate(`/logs`);
      })
      .catch((c) => console.warn("catch", c));
  };

  const handleTextChange = (event) => {
    setLog({ ...log, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setLog({
      ...log,
      mistakesWereMadeToday: !log.mistakesWereMadeToday,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addLog();
  };

  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Captain's Name:</label>
        <input
          id="captainName"
          value={log.captainName}
          type="text"
          onChange={handleTextChange}
        />
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={log.title}
          onChange={handleTextChange}
        />
        <label htmlFor="post">Post:</label>
        <textarea
          id="post"
          name="post"
          value={log.post}
          onChange={handleTextChange}
          placeholder="What happened today?"
        />
        <label htmlFor="daysSinceLastCrisis">Days Since Last Crisis</label>
        <input
          id="daysSinceLastCrisis"
          type="number"
          min="0"
          step="1"
          name="daysSinceLastCrisis"
          value={log.daysSinceLastCrisis}
          onChange={handleTextChange}
        />
        <label htmlFor="mistakesWereMadeToday">Mistakes were made today:</label>
        <input
          id="mistakesWereMadeToday"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={log.mistakesWereMadeToday}
        />

        <br />
        <input type="submit" />
      </form>
      <Link to="/logs">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default LogNewForm;
