// importing necessary libraries and hooks
import React, { useState, useEffect, useRef } from "react";
// importing styling
import "./Textarea.css";

// importing package for sentiment analysis
var Sentiment = require("sentiment");
var sentimentAnalysis = new Sentiment();

// component 
function Textarea() {
  // declaring state variables

  // state variable for outputting timestamps in list area
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  const [stopTimer, setStopTimer] = useState(false); // variable for starting and stopping the timer
  // variable for confirming the edited text on particular timestamp
  const [save, setSave] = useState(false);
  // variable for storing information of the timestmap that is to be edited to be passed down to save functionality as a parameter
  const [stateForEdit, setStateForEdit] = useState({});
  // variable for setting the boundary of textarea based on sentiments
  const [sentiment, setSentiment] = useState(0);

  // array for blacklisting words
  const blacklist = [
    "stupid",
    "idiot",
    "retard",
    "imbecile",
    "fool",
    "moron",
    "pig",
    "cheap",
    "bloody",
  ];

  // declaring a ref for controlling textarea input
  const inputRef = useRef("");

  // function for calculating sentiment of the text
  const calculateSentiment = sentence => {
    const result = sentimentAnalysis.analyze(sentence);
    return result.score;
  };

  // this useEffect will only execute once at the start when component is rendered or page is reloaded
  useEffect(() => {
    // checking if 'data' and 'text' are present in local storage or not
    if (localStorage.getItem("data") === null)
      localStorage.setItem("data", JSON.stringify([]));
    if (localStorage.getItem("text") === null)
      localStorage.setItem("text", "");

    // getting 'data' array from local storage to get last timestamp's text
    let timeStampDataArray = JSON.parse(localStorage.getItem("data"));

    // this condition is to check if there is any text saved in local storage then the text from the last checkpoint will be prefilled in textarea
    if (timeStampDataArray.length === 0) 
      inputRef.current.value = "";
     else 
      inputRef.current.value =
        timeStampDataArray[timeStampDataArray.length - 1].text;
  }, []);

  // this is the main logic of the app
  useEffect(() => {
    // if timer is not stopped only then the following functionality will work
    if (!stopTimer) {
      const id = setInterval(() => {
        // filtering entered text based on blacklisted words
        let blacklistFilteredtext = [];
        inputRef.current.value.split(" ").forEach(word => {
          if (!blacklist.includes(word.trim().toLowerCase())) {
            blacklistFilteredtext.push(word);
          }
        });
        blacklistFilteredtext = blacklistFilteredtext.join(" ");

        // printing time just to see that functionality is running at every 5 seconds
        console.log(`${new Date().toLocaleTimeString()} : `);

        let timeStampDataArray = JSON.parse(localStorage.getItem("data"));

        // checking if any text is entered in the input box or not
        if (blacklistFilteredtext.trim().length > 0) {
          // this condition will run when the first timestamp is to be saved so we don't need to check with the text saved at previous timestamp
          if (timeStampDataArray.length === 0) {
            const temp = {
              timestamp: new Date().toLocaleTimeString(),
              text: blacklistFilteredtext,
              sentiment: calculateSentiment(blacklistFilteredtext),
            };
            timeStampDataArray = [...timeStampDataArray, temp];
            localStorage.setItem("text", inputRef.current.value);
            localStorage.setItem("data", JSON.stringify(timeStampDataArray));
            console.log(localStorage);
            setList(JSON.parse(localStorage.getItem("data")));
          }
          // this else block will run if the timestamp array already has some values and therefore we need to check if the present text entered in textarea is equal to the previous text or not
          else {
            // checking the above mentioned condition
            if (timeStampDataArray[timeStampDataArray.length - 1].text !== blacklistFilteredtext) {
              const temp = {
                timestamp: new Date().toLocaleTimeString(),
                text: blacklistFilteredtext,
                sentiment: calculateSentiment(blacklistFilteredtext),
              };
              timeStampDataArray = [...timeStampDataArray, temp];
              localStorage.setItem("text", inputRef.current.value);

              localStorage.setItem("data", JSON.stringify(timeStampDataArray));
              console.log(localStorage);
              setList(JSON.parse(localStorage.getItem("data")));
              console.log(list);
            }
          }
        }
      }, 5000);
      // clearing the setInterval timer
      return () => clearInterval(id);
    }
  });

  // handling the click on timestamp
  const handleTimeStampClick = (event, index) => {
    event.preventDefault();
    const timeStampDataArray = JSON.parse(localStorage.getItem("data"));
    const data = timeStampDataArray[index];
    inputRef.current.disabled = true;
    inputRef.current.value = data.text;
    setStopTimer(true);
    setSave(false);
    setSentiment(data.sentiment);
  };

  // function for starting the timer again
  const handleStartTimer = () => {
    setStopTimer(false);
    const timeStampDataArray = JSON.parse(localStorage.getItem("data"));
    inputRef.current.value = timeStampDataArray[timeStampDataArray.length - 1].text;
    inputRef.current.disabled = false;
    setSentiment(0);
  };

  // function for handling click on edit button of the timestamp
  const handleEdit = (index, timestamp) => {
    const timeStampDataArray = JSON.parse(localStorage.getItem("data"));
    const toBeEdited = {
      ...timeStampDataArray.filter(obj => obj.timestamp === timestamp),
    };

    //  this state is passed to the saveHandler function because that is the function that will do the necessary changes needed everywhere on the UI and in the storage
    setStateForEdit({
      timeStampDataArray,
      toBeEdited,
      timestamp,
    });

    inputRef.current.value = toBeEdited[0].text;
    inputRef.current.disabled = false;
    setSave(true);
  };

  // function for handling click on save edited button 
  const saveHandler = stateForEdit => {
    const { timeStampDataArray, toBeEdited, timestamp } = stateForEdit;

    let blacklistFilteredtext = [];
    inputRef.current.value.split(" ").forEach(word => {
      if (!blacklist.includes(word.trim().toLowerCase()))
        blacklistFilteredtext.push(word);
    });
    blacklistFilteredtext = blacklistFilteredtext.join(" ");
    toBeEdited.text = blacklistFilteredtext;

    for (let i = 0; i < timeStampDataArray.length; i++) {
      if (timestamp === timeStampDataArray[i].timestamp) {
        const temp = {
          timestamp: timeStampDataArray[i].timestamp,
          text: toBeEdited.text,
          sentiment: calculateSentiment(toBeEdited.text),
        };
        timeStampDataArray[i] = temp;
        console.log(timeStampDataArray[i]);
      }
    }

    localStorage.setItem("data", JSON.stringify(timeStampDataArray));
    localStorage.setItem("text", inputRef.current.value);
    console.log(JSON.parse(localStorage.getItem("data")));
    setSave(false);
    inputRef.current.disabled = true;
  };

  // function for handling tweer button
  const tweetHandle = () => {
    const tweet = inputRef.current.value;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweet} `;
    window.open(twitterUrl, "_blank");
  };

  return (
    <>
      <div className="vertical"></div>

      <div className="container">
        <div className="text-area-component">
          <h1 className="text-area__heading">Text area component</h1>
          <textarea
            className={`text-area__input ${
              sentiment !== 0
                ? sentiment > 0
                  ? "positive"
                  : "negative"
                : "neutral"
            }`}
            ref={inputRef}
          ></textarea>
          <div className="text-area__button-container">
            <button
              className="text-area__button"
              type="button"
              disabled={!stopTimer}
              onClick={handleStartTimer}
            >
              Start Timer
            </button>
            <button
              className="text-area__button"
              disabled={!save}
              onClick={() => saveHandler(stateForEdit)}
            >
              Save Edited
            </button>
            <button
              className="text-area__button twitter"
              type="button"
              disabled={list.length === 0 ? true : false}
              onClick={tweetHandle}
            >
              Tweet
            </button>
          </div>
        </div>
        <div className="list-component stuck">
          <h1 className="list__heading">List Component</h1>
          <ul className="list-component__ul">
            {list.map((obj, index) => {
              return (
                <li className="list-component__li" key={index}>
                  <a
                    className="list-component__a"
                    href="/"
                    onClick={event => handleTimeStampClick(event, index)}
                  >
                    {obj.timestamp}
                  </a>
                  {stopTimer && (
                    <button
                      className="list-component__edit"
                      onClick={() => handleEdit(index, obj.timestamp)}
                      type="button"
                    >
                      Edit
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Textarea;
