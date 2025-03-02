import React from 'react';
import { MAP_STYLES } from '../utils/mapUtils';
import '../styles/MapStyleSelector.css';

const MapStyleSelector = ({ currentStyle, setCurrentStyle, id = "map-style" }) => {
  return (
    <div className="style-selector">
      <label htmlFor={id}>Map Style:</label>
      <select 
        id={id} 
        value={currentStyle}
        onChange={(e) => setCurrentStyle(e.target.value)}
        className="style-select"
      >
        {Object.keys(MAP_STYLES).map(styleKey => (
          <option key={styleKey} value={styleKey}>
            {MAP_STYLES[styleKey].name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MapStyleSelector; 