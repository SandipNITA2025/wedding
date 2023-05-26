import React, { useState } from "react";
import PopupPoll from "./components/PopupPoll";
import Home from "./pages/Home";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=" relative flex items-center justify-center flex-col w-screen mx-auto h-screen ">
      {/* <Home/> */}
      <button
        onClick={() => setIsOpen(true)}
        className=" absolute text-white font-medium top-0 left-0 text-xl bg-orange-500 p-2 px-4 m-4"
      >
        Create New Poll
      </button>
      {isOpen ? <PopupPoll setIsOpen={setIsOpen} /> : ""}
    </div>
  );
};

export default App;
