'use client';

import dynamic from 'next/dynamic';
import {LightPollutionData} from '../types';

interface MapProps {
    year: number;
    onMapClick: (lat: number, lng: number) => void;
    pollutionData: LightPollutionData;
    regionData: Record<string, {
        intensity: number;
        population: number;
        suggestions: string[];
    }>;
}

const DynamicMap = dynamic(
    () => import('./Map'),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <span className="text-white">Loading choropleth map...</span>
            </div>
        )
    }
);

const MapWrapper = (props: MapProps) => {
    return <DynamicMap {...props} />;
};

export default MapWrapper;