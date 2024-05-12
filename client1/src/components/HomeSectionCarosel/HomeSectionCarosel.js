import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Button } from "@mui/material";
import { mens_kurta } from "../../Data/images";

const HomeSectionCarosel = ({data,sectionName}) => {
    const [activeIndex,setActiveIndex]=useState(0);
    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 5.5 },
    };

  const slidePrev=()=>setActiveIndex(activeIndex-1);
  const slideNext=()=>setActiveIndex(activeIndex+1);

  const syncActiveIndex=({item})=>setActiveIndex(item);

  const items = data.slice(0,12).map((item) => <HomeSectionCard product={item} />);

  return (
    <div className=" px-4 lg:px-8 border">
      <h2 className="text-2xl font-extrabold text-gray-800">{sectionName}</h2>
      <div className="relative p-5">
        <AliceCarousel
          items={items}
          responsive={responsive}
          disableButtonsControls
          disableDotsControls
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
        />
        {activeIndex!== items.length-5 && <Button
          variant="contained"
          onClick={slideNext}
          sx={{
            position: "absolute",
            top: "8rem",
            bgcolor: "white",
            right: "0rem",
            transform: "translateX(50%) rotate(90deg)",
          }}
          aria-label="next"
          className="z-50 bg-white"
          
        >
          <KeyboardArrowLeftIcon
            sx={{ transform: "rotate(90deg)", color: "black" }}
          />
        </Button>}

        {activeIndex!==0 && <Button
          variant="contained"
          sx={{
            position: "absolute",
            top: "8rem",
            bgcolor: "white",
            left: "0rem",
            transform: "translateX(-50%) rotate(-90deg)",
          }}
          aria-label="next"
          className="z-50 bg-white"
          onClick={slidePrev}
        >
          <KeyboardArrowLeftIcon
            sx={{ transform: "rotate(90deg)", color: "black" }}
          />
        </Button>}
      </div>
    </div>
  );
};

export default HomeSectionCarosel;
