'use client';
import { useState } from 'react';

const regionCoordinates: Record<string, { lat: number, lng: number }> = {
  "Dhaka": { lat: 23.8103, lng: 90.4125 },
  "Chittagong": { lat: 22.3569, lng: 91.7832 },
  "Rajshahi": { lat: 24.3745, lng: 88.6042 },
  "Khulna": { lat: 22.8456, lng: 89.5403 },
  "Sylhet": { lat: 24.8949, lng: 91.8687 },
  "Rangpur": { lat: 25.7439, lng: 89.2752 },
  "Barisal": { lat: 22.7010, lng: 90.3535 },
  "Mymensingh": { lat: 24.7471, lng: 90.4203 }
};

interface LeftPanelProps {
  year: number;
  onYearChange: (year: number) => void;
  currentRegion: string;
  onDistrictChange?: (region: string) => void;
}

const LeftPanel = ({ year, onYearChange, currentRegion, onDistrictChange }: LeftPanelProps) => {
  const [startYear, setStartYear] = useState(2017);
  const [endYear, setEndYear] = useState(2080);

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  return (
    <div className="absolute top-0 left-0 z-10000 h-110 bg-gray-800 text-white w-64 flex-shrink-0 transition-all duration-300 overflow-y-auto">
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
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Select District</label>
          <select
            value={currentRegion}
            onChange={(e) => onDistrictChange?.(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          >
            {Object.keys(regionCoordinates).map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <h3 className="text-xl font-bold">Legend</h3>
        <div className="mb-6 p-1 rounded-lg mt-2">

          <div className="text-xs">
            <div className="flex items-center"><span className="w-3 h-3 bg-[#ef4444] mr-1"></span>Severe</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-[#f97316] mr-1"></span>High</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-[#eab308] mr-1"></span>Moderate</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-[#86efac] mr-1"></span>Low</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-[#4ade80] mr-1"></span>Tolerable</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;