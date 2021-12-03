import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import moment from "moment";

const App = () => {
  const [y, setY] = useState(0);
  const [loading, setLoading] = useState(false);
  const [num, setNum] = useState(0);
  const [minute, setMinute] = useState(moment().format("mm"));
  const [second, setSecond] = useState(moment().format("ss"));

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    let intervalId;

    intervalId = setInterval(() => {
      const computedSecond =
        String(second).length === 1 ? `0${second}` : second;
      const computedMinute =
        String(minute).length === 1 ? `0${minute}` : minute;

      setSecond(computedSecond);
      setMinute(computedMinute);
      if (Number(second) === 59) {
        setSecond("00");
        setMinute((minute) =>
          Number(minute) === 0 || Number(minute) < 9
            ? `0${Number(minute) + 1}`
            : Number(minute) + 1
        );
      } else {
        setSecond((second) =>
          Number(second) === 0 || Number(second) < 9
            ? `0${Number(second) + 1}`
            : Number(second) + 1
        );
      }
    }, 1000);
    return () => {
      window.removeEventListener("scroll", listenToScroll);
      clearInterval(intervalId);
    };
  }, [second, minute]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setTimeout(() => {
      setLoading(true);
    }, 3000);
    await setNum(Math.floor(Math.random() * 101));
  };

  const listenToScroll = () => {
    setY(window.scrollY);
  };

  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <div
            style={{
              position: "fixed",
              height: "100vh",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              placeContent: "center",
            }}
          >
            <img src={logo} className="App-logo" alt="logo" />
            <p>{num}</p>
            <p>{y}</p>
            <p>
              {minute}:{second}
            </p>
          </div>
        ) : (
          <>
            <p>Loading...</p>
          </>
        )}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
};

export default App;
