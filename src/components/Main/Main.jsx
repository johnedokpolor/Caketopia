import React, { useContext, useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
import Logo from "../../assets/bmalogo.jpg";
import { FaMoon, FaSun, FaRegCompass, FaCode, FaRegCopy } from "react-icons/fa";
import { MdOutlineLightbulb } from "react-icons/md";
import { FaRegMessage, FaCheck } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { auth, db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Main = ({ handleDark, dark }) => {
  const {
    Onsent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(Context);
  const [copy, setCopy] = useState(false);
  const [userData, setUserData] = useState(null);
  const [fname, setFname] = useState(null);

  const navigate = useNavigate();

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      try {
        const docRef = doc(db, "Users", user.uid);
        await getDoc(docRef).then((user) => {
          setUserData(user.data());

          const names = user.data().name.split(" ");
          setFname(names[0]);
        });
      } catch (error) {
        navigate("/auth");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
      navigate("/auth");
    } catch (error) {}
  };

  const copyInput = () => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
    navigator.clipboard.writeText(resultData);
  };

  const Cards = [
    {
      id: 0,
      img: <FaRegCompass />,
      text: "Suggest beautiful places to see on an upcoming road trip.",
    },
    {
      id: 1,
      img: <MdOutlineLightbulb />,
      text: "Briefly summarize the concept: Urban Planning.",
    },
    {
      id: 2,
      img: <FaRegMessage />,
      text: "Brainstorm team bonding activities for our work retreat.",
    },
    {
      id: 3,
      img: <FaCode />,
      text: "Improve the readability of the following code.",
    },
  ];
  return (
    <div className="relative min-h-screen flex-1 pb-[20vh] sm:pb-[15vh]">
      {userData && (
        <div className="flex items-center justify-between p-5 text-xl text-[#585858] dark:text-white">
          <div>
            <p>Beema</p>
            <p className="text-sm">Gemini 1.5 Flash</p>
          </div>

          <div className="flex items-center gap-5">
            <div className="md:cursor-pointer" onClick={() => handleDark()}>
              {dark ? <FaSun /> : <FaMoon />}
            </div>
            <div className="group relative w-full md:cursor-pointer">
              <div className="relative bottom-1 mt-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#386bbd] text-white">
                {userData.name.slice(0, 1)}
              </div>
              <div className="absolute right-0 z-[50] mt-3 hidden w-[300px] flex-col items-center rounded-xl bg-bar p-3 group-hover:flex dark:bg-[#1f1f1f] md:w-[400px]">
                <p className="text-center text-lg">{userData.email}</p>
                <div className="mt-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#386bbd] text-white">
                  {userData.name.slice(0, 1)}
                </div>

                <p className="mt-3">Hi, {fname}!</p>
                <button
                  onClick={logout}
                  className="w-/13 mx-auto mt-4 rounded-md border border-gray-500 bg-transparent p-3 text-base"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {userData && (
        <div className="m-auto max-w-[900px]">
          {showResult ? (
            <>
              <div className="result max-h-[70vh] overflow-y-scroll px-[5%]">
                <div className="mb-6 flex items-center gap-4 md:mb-10">
                  <div className="relative bottom-1 mt-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#386bbd] text-white">
                    {userData.name.slice(0, 1)}
                  </div>
                  <p className="capitalize">{recentPrompt}</p>
                </div>
                <div className="loader flex items-start gap-4">
                  <img className="rounded-md" src={Logo} />
                  {loading ? (
                    <div className="flex w-full flex-col gap-4">
                      <hr className="rounded-sm border-none" />
                      <hr className="rounded-sm border-none" />
                      <hr className="rounded-sm border-none" />
                    </div>
                  ) : (
                    <div>
                      <p
                        className="text-lg font-medium leading-[1.8]"
                        dangerouslySetInnerHTML={{ __html: resultData }}
                      ></p>
                      <div
                        onClick={copyInput}
                        className="w-fit rounded-full p-3 hover:bg-[#dfe4ea] dark:hover:bg-[#1f1f1f]"
                      >
                        {copy ? <FaCheck /> : <FaRegCopy />}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="greet my-8 p-5 text-5xl font-bold text-[#c4c7c5]">
                <p className="mb-4">
                  <span>Hello, {fname}.</span>
                </p>
                <p>How can I help you today?</p>
              </div>
              <div className="grid grid-cols-2 gap-6 p-4 md:grid-cols-3 lg:grid-cols-4">
                {Cards.map(({ id, img, text }) => (
                  <div
                    onClick={() => setInput(text)}
                    key={id}
                    className="relative h-[200px] rounded-lg bg-bar p-5 hover:bg-[#dfe4ea] dark:bg-[#1f1f1f] dark:hover:bg-[#383838] md:w-[210px] md:cursor-pointer lg:w-full"
                  >
                    <p className="text-[16px] text-[#585858] dark:text-white">
                      {text}
                    </p>

                    <div className="absolute bottom-3 right-3 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white text-xl dark:bg-[#131314]">
                      {img}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="absolute bottom-0 m-auto w-full max-w-[900px] px-5">
            <div className="relative flex w-full items-center justify-between gap-5 rounded-[50px] bg-bar px-5 py-2 dark:bg-[#1f1f1f]">
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    Onsent();
                  }
                }}
                onChange={(e) => setInput(e.target.value)}
                className="w-[80%] border-0 bg-transparent p-2 text-[17px] outline-0 dark:text-white md:flex-1"
                type="text"
                value={input}
                placeholder="Enter a prompt here"
              />
              <div className="absolute right-4 flex items-center gap-1 md:relative md:gap-3">
                {input && (
                  <IoMdSend
                    onClick={() => Onsent()}
                    className="w-5 text-2xl md:w-6 md:cursor-pointer"
                  />
                )}
              </div>
            </div>
            <p className="mx-auto my-3 text-center font-[300] opacity-80 md:text-[13px]">
              GLai may make mistakes. Check important info.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
