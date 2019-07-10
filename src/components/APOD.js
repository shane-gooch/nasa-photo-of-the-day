import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

function APOD() {
  const [nasaAPOD, setNasaAPOD] = useState({});
  useEffect(() => {
    const getNasaAPOD = () => {
      axios
        .get(
          "https://api.nasa.gov/planetary/apod?api_key=0qNDLQkLyXRtYhOt6OdBJLruhNO0tZFrtNt8giKe"
        )
        .then(res => {
          console.log(res);
          setNasaAPOD(res.data);
        })
        .catch(err => console.log(err));
    };

    getNasaAPOD();
  }, []);
  return (
    <div className="APODContainer">
      <h1>NASA APOD</h1>
      {nasaAPOD.media_type === "video" ? (
        <ReactPlayer url={nasaAPOD.url} />
      ) : (
        <img src={nasaAPOD.hdurl} alt="APOD" />
      )}
    </div>
  );
}

export default APOD;
