import React, { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import { getAllDiaryEntries, createDiaryEntry } from "./diaryService";
import axios from "axios";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    getAllDiaryEntries().then((data) => setDiaryEntries(data));
  }, []);

  const setNotificationMessage = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  const diaryEntryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiaryEntry = {
      date,
      visibility,
      weather,
      comment,
    };

    const response = await createDiaryEntry(newDiaryEntry);
    if (axios.isAxiosError(response)) {
      response.response
        ? setNotificationMessage(response.response.data)
        : setNotificationMessage("Undefined Error");
    } else {
      setDiaryEntries(diaryEntries.concat(response));
    }

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <div>
      <h1>Flight diary</h1>
      <h2>Add new entry</h2>
      {notification !== "" ? (
        <h3 style={{ color: "red" }}>{notification}</h3>
      ) : null}
      <form onSubmit={diaryEntryCreation}>
        <div>
          Date:
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          Visibility: great:
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility("great")}
          />
          good:
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility("good")}
          />
          ok:
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility("ok")}
          />
          poor:
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility("poor")}
          />
        </div>
        <div>
          Weather: sunny:
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather("sunny")}
          />
          rainy:
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather("rainy")}
          />
          cloudy:
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather("cloudy")}
          />
          stormy:
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather("stormy")}
          />
          windy:
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather("windy")}
          />
        </div>
        <div>
          Comment:
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      <div>
        {diaryEntries.map((entry) => (
          <div key={entry.id}>
            <h3>{entry.date}</h3>
            <p>
              visibility: {entry.visibility}
              <br />
              weather: {entry.weather}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
