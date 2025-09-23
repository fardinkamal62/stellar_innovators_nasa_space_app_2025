import { LightPollutionData, PollutionLevel } from '../types';

interface RightPanelProps {
  data: LightPollutionData;
  isOpen: boolean;
  onToggle: () => void;
}

const RightPanel = ({ data, isOpen, onToggle }: RightPanelProps) => {
  const getPollutionColor = (level: PollutionLevel) => {
    switch(level) {
      case 'none': return 'text-green-500';
      case 'mild': return 'text-green-300';
      case 'moderate': return 'text-yellow-500';
      case 'heavy': return 'text-orange-500';
      case 'severe': return 'text-red-500';
      default: return 'text-white';
    }
  };

  const getPollutionDescription = (level: PollutionLevel) => {
    switch(level) {
      case 'none': return 'Minimal light pollution. Excellent star visibility.';
      case 'mild': return 'Some light pollution. Good star visibility.';
      case 'moderate': return 'Moderate light pollution. Limited star visibility.';
      case 'heavy': return 'Significant light pollution. Few stars visible.';
      case 'severe': return 'Extreme light pollution. Only brightest stars visible.';
      default: return '';
    }
  };

  return (
    <div className={`h-full bg-gray-800 text-white w-80 flex-shrink-0 transition-all duration-300 ${isOpen ? 'mr-0' : '-mr-80'}`}>
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Location Details</h2>
      </div>
      
      <div className="p-4">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{data.region}</h3>
          <p className="text-sm text-gray-300">
            Lat: {data.coordinates.lat.toFixed(4)}, Lng: {data.coordinates.lng.toFixed(4)}
          </p>
        </div>
        
        <div className="mb-6 p-4 bg-gray-900 rounded">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">Light Pollution Level</h4>
            <span className={`font-bold ${getPollutionColor(data.pollutionLevel)}`}>
              {data.pollutionLevel.charAt(0).toUpperCase() + data.pollutionLevel.slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            {getPollutionDescription(data.pollutionLevel)}
          </p>
          
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-red-500 h-2.5 rounded-full" 
              style={{ width: `${data.value}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0%</span>
            <span>{data.value}%</span>
            <span>100%</span>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Improvement Suggestions</h4>
          <ul className="space-y-2">
            {data.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span className="text-sm">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-8">
          <h4 className="font-semibold mb-3">Pollution Trend (2010-2023)</h4>
          <div className="h-32 bg-gray-900 rounded p-2">
            <div className="flex items-end h-24 gap-1">
              {data.trends.map((value, index) => (
                <div 
                  key={index} 
                  className="flex-1 flex items-end justify-center"
                  style={{ height: '100%' }}
                >
                  <div 
                    className="bg-red-500 w-full rounded-t"
                    style={{ height: `${value}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>2010</span>
              <span>2023</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;