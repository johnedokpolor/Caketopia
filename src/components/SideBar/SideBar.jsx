import React, { useContext } from "react";
import { useState } from "react";
import { Context } from "../../context/context";
import { FaBars, FaHistory, FaQuestion } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegMessage, FaPlus } from "react-icons/fa6";

const BottomItems = [
  { id: 0, img: <FaQuestion />, text: "Help" },
  { id: 1, img: <FaHistory />, text: "Activity" },
  { id: 2, img: <IoSettingsOutline />, text: "Setting" },
];
const SideBar = () => {
  const [extended, setExtended] = useState(false);
  const { Onsent, prevPrompt, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = (prompt) => {
    Onsent(prompt);
    setRecentPrompt(prompt);
  };
  return (
    <div className="sidebar hidden h-screen flex-col justify-between bg-bar px-5 py-6 transition-all duration-500 dark:bg-[#1f1f1f] md:flex">
      <div className="top">
        <div
          onClick={() => setExtended((prev) => !prev)}
          className="relative right-2 ml-2 w-fit rounded-full p-4 text-lg hover:bg-[#dfe4ea] dark:hover:bg-[#383838] md:cursor-pointer"
        >
          <FaBars />
        </div>
        <div
          onClick={newChat}
          className="mt-10 flex h-10 w-fit items-center justify-center gap-2 rounded-full bg-[#e6eaf1] p-3 text-base text-gray-500 dark:bg-[#131314] dark:text-white md:cursor-pointer"
        >
          <FaPlus />
          {extended && <p>New Chat</p>}
        </div>
        {extended && (
          <div className="recent flex flex-col">
            <p className="mb-5 mt-8">Recent</p>
            {prevPrompt.map(({ id, item }) => (
              <div
                data-aos="fade"
                key={id}
                className="recent-entry flex items-center hover:bg-[#383838] dark:text-white md:cursor-pointer"
                onClick={() => loadPrompt(item)}
              >
                <FaRegMessage />
                <p className="capitalize">{item.slice(0, 21)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        {BottomItems.map(({ id, img, text }) => (
          <div
            key={id}
            className="bottom-items recent-entry flex items-center hover:bg-[#383838] dark:text-white"
          >
            <div className="text-lg">{img}</div>
            {extended && <p>{text}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
