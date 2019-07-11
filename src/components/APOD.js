import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

function APOD() {
  const [nasaAPOD, setNasaAPOD] = useState({});
  const [date, setDate] = useState("");

  useEffect(() => {
    const getNasaAPOD = () => {
      axios
        .get(
          `https://api.nasa.gov/planetary/apod?api_key=0qNDLQkLyXRtYhOt6OdBJLruhNO0tZFrtNt8giKe&date=${date}`
        )
        .then(res => {
          console.log(res);
          setNasaAPOD(res.data);
        })
        .catch(err => console.log(err));
    };

    getNasaAPOD();
  }, [date]);

  return (
    <div className="APODContainer">
      <h1>NASA APOD</h1>
      <input
        type="date"
        min="1995-06-16"
        onChange={e => setDate(e.target.value)}
      />
      <small>{nasaAPOD.date}</small>
      <h2>{nasaAPOD.title}</h2>
      {nasaAPOD.media_type === "video" ? (
        <ReactPlayer url={nasaAPOD.url} className="apod" />
      ) : (
        <img className="apod" src={nasaAPOD.hdurl} alt="APOD" />
      )}
      <p className="explanation">{nasaAPOD.explanation}</p>
    </div>
  );
}

export default APOD;
