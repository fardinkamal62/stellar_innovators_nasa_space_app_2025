'use client';
import { useState } from 'react';

interface LeftPanelProps {
  year: number;
  onYearChange: (year: number) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const LeftPanel = ({ year, onYearChange, isOpen, onToggle }: LeftPanelProps) => {
  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(2050);
  
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  return (
    <div className={`h-full bg-gray-800 text-white w-64 flex-shrink-0 transition-all duration-300 ${isOpen ? 'ml-0' : '-ml-64'}`}>
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
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
        
        <div className="mt-8 p-4 bg-gray-900 rounded">
          <h3 className="font-bold mb-2">About Light Pollution</h3>
          <p className="text-sm text-gray-300">
            Light pollution is the excessive or inappropriate use of artificial light. It has several negative consequences including energy waste, disruption of ecosystems, and adverse health effects.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;