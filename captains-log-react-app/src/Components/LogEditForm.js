import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function LogEditForm() {
  let { index } = useParams();
  let navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  console.log(index);
  const [log, setLog] = useState({
    captainName: "",
    title: "",
    daysSinceLastCrisis: 0,
    mistakesWereMadeToday: false,
    post: "",
  });

  const handleTextChange = (event) => {
    setLog({ ...log, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setLog({ ...log, mistakesWereMadeToday: !log.mistakesWereMadeToday });
  };

  useEffect(() => {
    axios
      .get(`${API}/logs/${index}`)
      .then((response) => {
        setLog(response.data);
      })
      .catch((error) => {
        console.log(error);
        // navigate(`/not-found`)
      });
  }, [index, navigate, API]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateLog(log, index);
  };

  const updateLog = (updatedBookmark) => {
    axios
      .put(`${API}/logs/${index}`, updatedBookmark)
      .then(() => {
        navigate(`/logs/${index}`);
      })
      .catch((c) => console.warn("catch", c));
  };

  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="captainName">Captain's Name:</label>
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
      <Link className="back" to="/logs">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default LogEditForm;
