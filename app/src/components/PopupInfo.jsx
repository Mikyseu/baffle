import { useState } from 'react';

function PopupInfo({ onCancelClick, onButtonClick }) {
  const [showPopup, setShowPopUp] = useState(false);

  const handleButtonClick = () => {
    setShowPopUp(true);
    if (onButtonClick) {
      onButtonClick();
    }
  };

  const handlePopupClose = () => {
    setShowPopUp(false);
    if (onCancelClick) {
      onCancelClick();
    }
  };

  return (
    <main className="h-screen w-screen z-30 fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-40 ">
      <div className="bg-[#6E8BB3] mx-4 p-4 rounded-md bg-opacity-80 animate-jump-in animate-once animate-duration-[1000ms]">
        <div>
          <button
            onClick={handlePopupClose}
            className="float-right w-6 h-6 mb-4"
          >
            <img src="../../public/X.png" alt="close" />
          </button>
          <p className="text-md font-bold text-white mb-1">Selected sunoId</p>
          <img src="../../public/sunoId info.png" alt="information" />{' '}
        </div>
      </div>
    </main>
  );
}

export default PopupInfo;
