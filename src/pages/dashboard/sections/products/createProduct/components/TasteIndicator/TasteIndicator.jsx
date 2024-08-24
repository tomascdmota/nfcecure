import React from 'react';
import './TasteIndicator.scss'; // Assuming you have a tasteIndicator.scss file for styling

const TasteIndicator = ({ tasteValue }) => {
  const indicatorPosition = (tasteValue /10) *100 + '%'; // Adjusted for new line positioning

  return (
    <div className="taste-indicator">
      <div className="line"></div>
      <div className="indicator" style={{ left: indicatorPosition }}></div>
      <div className="label left">Light</div>
      <div className="label right">Bold</div>
    </div>
  );
}

export default TasteIndicator;