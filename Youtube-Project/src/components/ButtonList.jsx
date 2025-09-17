import React from "react";
import Button from "./Button.jsx";

const list = [
  "All",
  "Music",
  "Gaming",
  "JavaScript",
  "WWE Superstars",
  "Mixes",
  "Live",
  "Data Structures",
  "Apple",
  "Reverberation",
  "Skills",
  "Indian pop music",
  "Superhero movies",
  "Thrillers",
];

const ButtonList = () => {
  return (
    <div className="flex">
      {list.map((item, index) => (
        <Button key={index} name={item} />
      ))}
    </div>
  );
};

export default ButtonList;
