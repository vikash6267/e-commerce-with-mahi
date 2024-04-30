import React from "react";
// import MetaData from "../components/core/MetaData"
import HeroSlider from "../components/core/HeroSlider";
function Home() {
  return (
    <div>
      <div className=" mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
      
      {/* <MetaData title="Absence" /> */}

      <div className=" w-screen mt-[64px] h-[calc(100vh - 60px)]">
              <div className="w-screen">
                <HeroSlider />;
              </div>
              
              
              
              </div>



      </div>
    </div>
  );
}

export default Home;
