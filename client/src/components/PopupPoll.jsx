import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const PopupPoll = ({ setIsOpen }) => {
  const [authId, setAuthId] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className=" absolute top-0 flex items-center justify-center w-screen mx-auto h-screen  backdrop-blur-sm">
      <div className=" w-[430px] bg-white p-3 py-4 border-2 rounded-md border-gray-300">
        <div className=" flex items-center justify-between text-black mb-2">
          <h2 className=" text-lg font-medium">Add Poll Details</h2>
          <RxCross2
            onClick={() => setIsOpen(false)}
            className=" cursor-pointer"
            size={20}
          />
        </div>
        <hr />
        <form
          onSubmit={handleSubmit}
          className=" mt-2 flex flex-col text-black bg-white gap-3 w-full px-4"
        >
          <div className="flex flex-col space-y-1">
            <span className=" text-base font-medium">Poll question :</span>
            <label>
              <input
                type="text"
                placeholder="Enter poll question*"
                className=" w-full border-b-[1.55px] border-l-[1.55px] border-r-[1.55px] rounded-[4px] focus:outline-0 p-1 border-gray-500"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </label>
          </div>
          <div className="flex flex-col space-y-1">
            <span className=" text-base font-medium">Poll options : </span>
            {options.map((option, index) => (
              <label key={index}>
                <input
                  type="text"
                  className="mt-1 w-full border-b-[1.55px] border-l-[1.55px] border-r-[1.55px] rounded-[4px] focus:outline-0 p-1 border-gray-500"
                  value={option}
                  placeholder={`Enter poll option ${index + 1}`}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </label>
            ))}
          </div>
          <button
            className=" bg-[#008083] rounded-sm text-base font-medium text-white p-1 w-fit px-6"
            type="submit"
          >
            Create Poll
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupPoll;
