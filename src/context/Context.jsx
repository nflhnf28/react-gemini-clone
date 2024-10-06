import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState(''); // to set input data 
  const [recentPrompt, setRecentPrompt] = useState(""); // data will be saved to recent prompt and display it on Main component
  const [prevPrompts, setPrevPrompts] = useState([]); // will use it to store all the history
  const [showResult, setShowResult] = useState(false); // will use it to show the result and change the UI to show
  const [loading, setLoading] = useState(false); // loading animation before show data
  const [resultData, setResultData] = useState(''); // display the result

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData(prev => prev + nextWord);
    }, 75 * index)
  }

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  }

  const onSent = async (prompt) => {
    setResultData('');
    setLoading(true);
    setShowResult(true);

    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts(prev => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }

    // Edit the response text to bold for the **
    let responseArray = response.split("**");
    let newResponse = '';
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    // Post-process to replace '##' with <h1> using RegEx
    newResponse = newResponse.replace(/##\s*(.+)/g, '<h1>$1</h1>');
    // Post-process to replace '*' with <br/>
    let newResponse2 = newResponse.split('*').join('</br>');

    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    // setResultData(newResponse2);
    setLoading(false);
    setInput('');
  }

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  }

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider;