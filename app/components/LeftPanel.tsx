'use client';
import { useState } from 'react';

interface LeftPanelProps {
  year: number;
  onYearChange: (year: number) => void;
}

const LeftPanel = ({ year, onYearChange }: LeftPanelProps) => {
  const [startYear, setStartYear] = useState(1900);
  const [endYear, setEndYear] = useState(3000);

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  return (
    <div className="absolute top-0 left-0 z-10000 h-80 bg-gray-800 text-white w-64 flex-shrink-0 transition-all duration-300 overflow-y-auto">
      <div className="flex justify-between items-center p-2 border-b border-gray-700">
        <h2 className="text-xl font-bold">Timeline Controls</h2>
      </div>

      <div className="p-4">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Select Year</label>
          <select
            value={year}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <h3 className="text-xl font-bold">Legend</h3>
        <div className="mb-6 p-1 rounded-lg mt-2">

          <div className="text-xs">
            <div className="flex items-center"><span className="w-3 h-3 bg-[#800026] mr-1"></span>Severe</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-[#BD0026] mr-1"></span>High</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-[#E31A1C] mr-1"></span>Moderate</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-[#FC4E2A] mr-1"></span>Low</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-[#FFEDA0] mr-1"></span>Good</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;