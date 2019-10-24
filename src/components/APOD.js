import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import Faker from "faker";
import "semantic-ui-css/semantic.min.css";

import {
  Input,
  Image,
  Divider,
  Button,
  Icon,
  Grid,
  Segment
} from "semantic-ui-react";

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
          setNasaAPOD(res.data);
        })
        .catch(err => console.log(err));
    };
    getNasaAPOD();
  }, [date]);

  const randomDateHandler = () => {
    const dateNow = Faker.date.recent();
    const randomDate = Faker.date
      .between("1995-06-16", dateNow)
      .toISOString()
      .slice(0, 10);
    setDate(randomDate);
  };

  return (
    <div className="APODContainer">
      <h1 className="title">NASA APOD</h1>
      <Segment>
        <Grid columns={2} relaxed="very">
          <Grid.Column>
            <Input
              type="date"
              className="dateInput"
              focus
              icon="calendar alternate"
              min="1995-06-16"
              onChange={e => setDate(e.target.value)}
            />
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <Button
              animated
              color="blue"
              className="randomButton"
              onClick={randomDateHandler}
            >
              <Button.Content visible>Random</Button.Content>
              <Button.Content hidden>
                <Icon name="paper plane" />
              </Button.Content>
            </Button>
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
      <h2>{nasaAPOD.title}</h2>
      <p>{nasaAPOD.date}</p>
      {nasaAPOD.media_type === "video" ? (
        <ReactPlayer url={nasaAPOD.url} className="apod" />
      ) : (
        <Image className="apod" rounded src={nasaAPOD.hdurl} alt="APOD" />
      )}
      <Divider horizontal>Descrption</Divider>
      <p className="explanation">{nasaAPOD.explanation}</p>
    </div>
  );
}

export default APOD;
