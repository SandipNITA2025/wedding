import React from "react";
import { FiSettings } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import { MdOutlineTimer } from "react-icons/md";
import { SlCalender, SlUserFemale, SlUser } from "react-icons/sl";
import { RiPlayListLine } from "react-icons/ri";
import { BsBoundingBox } from "react-icons/bs";
import { MdOutlineLiveTv, MdOutlineStars } from "react-icons/md";
import { GiRoyalLove } from "react-icons/gi";
import {
  AiOutlineCamera,
  AiOutlineVideoCamera,
  AiOutlineGift,
} from "react-icons/ai";

const iconsData = [
  {
    id: 1,
    icon: <AiOutlineCamera size={32} className="text-[#F79489]" />,
    name: "Image Hub",
  },
  {
    id: 2,
    icon: <AiOutlineVideoCamera size={32} className="text-[#F79489]" />,
    name: "Video Gallery",
  },
  {
    id: 3,
    icon: <MdOutlineTimer size={32} className="text-[#F79489]" />,
    name: "Countdown",
  },
  {
    id: 4,
    icon: <SlCalender size={28} className="text-[#F79489]" />,
    name: "Calendar",
  },
  {
    id: 5,
    icon: <BsBoundingBox size={29} className="text-[#F79489]" />,
    name: "Management",
  },
  {
    id: 6,
    icon: <RiPlayListLine size={30} className="text-[#F79489]" />,
    name: "Playlist",
  },
  {
    id: 7,
    icon: <MdOutlineLiveTv size={30} className="text-[#F79489]" />,
    name: "Live Streaming",
  },
  {
    id: 8,
    icon: <SlUser size={29} className="text-[#F79489]" />,
    name: "Team Groom",
  },
  {
    id: 9,
    icon: <SlUserFemale size={29} className="text-[#F79489]" />,
    name: "Team  Bride",
  },
  {
    id: 10,
    icon: <GiRoyalLove size={30} className="text-[#F79489]" />,
    name: "Recommendations",
  },
  {
    id: 11,
    icon: <AiOutlineGift size={31} className="text-[#F79489]" />,
    name: "Gift Registry",
  },
  {
    id: 12,
    icon: <MdOutlineStars size={30} className="text-[#F79489]" />,
    name: "Inspirations",
  },
];

const Home = () => {
  return (
    <div className=" flex items-center justify-center w-screen mx-auto h-screen ">
      {/* Mobile View start */}
      <div className=" ">
        <div className=" relative w-[325px] flex items-center justify-center bg-white h-[640px]">
          <div className=" w-[90%] text-black bg-white shadow-md h-[400px] grid grid-cols-3 place-items-center gap-1 p-3 py-5">
            {iconsData.map((i) => (
              <div
                key={i.id}
                className=" min-w-[50px] cursor-pointer active:scale-95  items-center justify-center flex flex-col space-y-1"
              >
                {i.icon}
                <p className=" text-[11px] font-medium text-[#F79489]">
                  {i.name}
                </p>
              </div>
            ))}
          </div>

          {/* BOTTOMBAR START*/}
          <div className="buttom-nav drop-shadow-[0_8px_8px_rgba(0,0,0,0.5)] absolute bottom-0 h-[60px] bg-white w-full p-2 flex items-center justify-around">
            <div className=" cursor-pointer text-[#F79489] active:scale-95">
              <FiSettings size={20} />
            </div>
            <div className=" cursor-pointer text-[#F79489] active:scale-95">
              <BiMessageDetail size={22} />
            </div>
            <div className=" cursor-pointer text-[#F79489] active:scale-95">
              <FaUser size={20} />
            </div>
          </div>
          {/* BOTTOMBAR END*/}
        </div>
      </div>
      {/* Mobile View end */}
    </div>
  );
};

export default Home;
