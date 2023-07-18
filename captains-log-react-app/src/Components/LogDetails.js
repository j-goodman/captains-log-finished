import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function LogDetails() {
  const [log, setLog] = useState([]);
  let { index } = useParams();
  // let index = useParams().index
  let navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/logs/${index}`)
      .then((response) => {
        setLog(response.data);
      })
      .catch((error) => navigate(`/not-found`));
  }, [index, navigate, API]);
  const deleteLog = () => {
    axios
      .delete(`${API}/logs/${index}`)
      .then(() => {
        navigate(`/logs`);
      })
      .catch((c) => console.warn("catch", c));
  };
  const handleDelete = () => {
    deleteLog();
  };
  return (
    <>
      <article className="container log-details">
        <h3>
          {log.mistakesWereMadeToday ? <span>💥</span> : null} {log.title} - By{" "}
          {log.captainName}
        </h3>
        <h5>{log.post}</h5>
        <h6>
          <span>Days since last crisis: </span>
          {log.daysSinceLastCrisis}
        </h6>
        <p>{log.description}</p>
      </article>
      <div className="showNavigation">
        <div>
          <Link to={`/logs`}>
            {" "}
            <button>Back</button>
          </Link>
        </div>

        <div>
          <Link to={`/logs/${index}/edit`}>
            {" "}
            <button>Edit</button>
          </Link>
        </div>
        <div>
          {" "}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </>
  );
}

export default LogDetails;
