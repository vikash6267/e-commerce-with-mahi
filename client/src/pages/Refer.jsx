import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaWhatsapp,
  FaCopy,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { referDetails } from "../serivces/operations/user";
import MyReferralProgram from "../components/core/Profile/ReferRalProgram";

const Refer = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [referData,setReferData] = useState([])
  const link = `https://www.wearabsence.com/login?refer=${user?.referralCode}`;

  const copyToClipboard = () => {
    navigator?.clipboard
      .writeText(link)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  };

  const moreShare = () => {
    const link = `https://www.wearabsence.com/login?refer=${user?.referralCode}`;
    const shareData = {
      title: "Check out this exclusive offer on Absence!",
      text: "Don't miss out on the latest trends and deals. Click the link to explore and join the fashion revolution!",
      url: link,
    };

    if (navigator?.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback
      alert(
        "Sharing is not supported on this browser. Copy this link to share: " +
          link
      );
    }
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      link
    )}`;
    window.open(url, "_blank");
  };

  const shareOnWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      link
    )}`;
    window.open(url, "_blank");
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      link
    )}&text=Check%20this%20out!`;
    window.open(url, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      link
    )}`;
    window.open(url, "_blank");
  };


  const fetchReferData = async()=>{
     const response = await referDetails(token)
     console.log(response)
    setReferData(response)
  }
  useEffect(()=>{
    if(token){
      fetchReferData()
    }

    
  },[])
  return (
    <div className="min-h-screen flex flex-col gap-5">


    <div className="flex flex-col w-11/12 mx-auto justify-center items-center space-y-4 md:space-y-0 md:flex-row md:justify-center md:items-center mt-[130px] gap-11 ">
      <button
        onClick={shareOnFacebook}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center"
      >
        <FaFacebook className="mr-2" /> Share on Facebook
      </button>
      <button
        onClick={shareOnWhatsApp}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center"
      >
        <FaWhatsapp className="mr-2" /> Share on WhatsApp
      </button>
      <button
        onClick={shareOnTwitter}
        className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded flex items-center"
      >
        <FaTwitter className="mr-2" /> Share on Twitter
      </button>
      <button
        onClick={shareOnLinkedIn}
        className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded flex items-center"
      >
        <FaLinkedin className="mr-2" /> Share on LinkedIn
      </button>
      <button
        onClick={copyToClipboard}
        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded flex items-center"
      >
        <FaCopy className="mr-2" /> Copy Link
      </button>
      <button
        onClick={moreShare}
        className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded flex items-center"
      >
        More option
      </button>
    
     
    </div>

    {
        referData &&  <MyReferralProgram referralData={referData} />
      }
    </div>

  );
};

export default Refer;
