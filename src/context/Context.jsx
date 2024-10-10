import { createContext, useEffect, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState(
    localStorage.getItem("PrevPrompts")
      ? JSON.parse(localStorage.getItem("PrevPrompts"))
      : [],
  );
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(false);

  useEffect(() => {
    localStorage.setItem("PrevPrompts", JSON.stringify(prevPrompt));
  }, [prevPrompt]);

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const Onsent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    prompt
      ? setPrevPrompt((prev) => [...prev])
      : setPrevPrompt((prev) => [
          {
            id: crypto.randomUUID(),
            item: input,
          },
          ...prev,
        ]);

    const response = prompt ? await run(prompt) : await run(input);
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 === 0) {
        newResponse += responseArray[i];
      } else {
        newResponse += `<b> ${responseArray[i]} </b>`;
      }
    }
    let newResponse2 = newResponse.split("*").join("<br>");
    let newResponse3 = newResponse2.split(":").join(": <br>");
    let newResponseArray = newResponse3.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    console.log(prevPrompt);

    setLoading(false);
    setInput("");
  };
  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    Onsent,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };
  if (prevPrompt.length > 4) {
    const updatedRecent = prevPrompt.slice(0, -1);
    setPrevPrompt(updatedRecent);
  }

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
