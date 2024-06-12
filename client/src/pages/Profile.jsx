import React, { useState } from "react";
import ProfileContent from "../components/core/Profile/ProfileContent";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.profile);
  const [active, setActive] = useState(1);

  return (
    <div>
      {loading ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="mx-auto flex sm:gap-3 lg:gap-[100px] bg-[#f5f5f5]  relative mt-[60px] ">
            {/* <div className="w-[50px] 800px:w-[335px]   max-h-[calc(100vh-55px)]  min-h-[calc(100vh-55px)] ">
              <ProfileSidebar active={active} setActive={setActive} />
            </div> */}
            <div className=" max-h-[calc(100vh-80px)]  w-11/12 mx-auto  ">
              <ProfileContent active={active} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
