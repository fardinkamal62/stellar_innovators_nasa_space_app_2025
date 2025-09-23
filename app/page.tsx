'use client';
import {useState} from 'react';
import DynamicMap from './components/DynamicMap';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import Navigation from './components/Navigation';
import {LightPollutionData, PollutionLevel} from './types';

type YearData = {
    [region: string]: {
        intensity: number;
        population: number;
        suggestions: string[];
    }
};

type BangladeshDataType = {
    [year: number]: YearData;
};

const bangladeshData: BangladeshDataType = {
    2020: {
        "Dhaka": {
            intensity: 90,
            population: 36000000,
            suggestions: [
                'Use shielded lighting fixtures to direct light downward',
                'Implement motion sensors for outdoor lighting',
                'Replace high-intensity lights with warmer LEDs',
                'Establish lighting curfews for non-essential lighting'
            ]
        },
        "Chittagong": {
            intensity: 75,
            population: 28000000,
            suggestions: [
                'Reduce coastal area lighting to protect marine wildlife',
                'Implement zoning regulations for commercial lighting',
                'Use low-glare fixtures in port areas',
                'Conduct light pollution awareness campaigns'
            ]
        },
        "Rajshahi": {
            intensity: 45,
            population: 18500000,
            suggestions: [
                'Implement smart lighting systems in urban centers',
                'Promote energy-efficient lighting options',
                'Reduce light spillage from agricultural facilities',
                'Establish dark-sky zones for astronomy activities'
            ]
        },
        "Khulna": {
            intensity: 55,
            population: 15600000,
            suggestions: [
                'Reduce lighting in wetland adjacent areas',
                'Install timers for commercial lighting',
                'Use wildlife-friendly lighting near the Sundarbans',
                'Implement light pollution monitoring systems'
            ]
        },
        "Sylhet": {
            intensity: 35,
            population: 9900000,
            suggestions: [
                'Minimize lighting in tea garden areas',
                'Implement eco-tourism lighting guidelines',
                'Reduce street light intensity after midnight',
                'Promote natural darkness in rural areas'
            ]
        },
        "Rangpur": {
            intensity: 40,
            population: 15800000,
            suggestions: [
                'Implement agricultural light management practices',
                'Focus on energy-efficient rural lighting solutions',
                'Establish dark-sky preserves in less populated areas',
                'Reduce light spillage from industrial zones'
            ]
        },
        "Barisal": {
            intensity: 42,
            population: 8300000,
            suggestions: [
                'Implement coastal lighting management plans',
                'Reduce light reflection from water bodies',
                'Use amber LED lighting in sensitive areas',
                'Establish riverbank lighting guidelines'
            ]
        },
        "Mymensingh": {
            intensity: 50,
            population: 11400000,
            suggestions: [
                'Focus on responsible university campus lighting',
                'Implement agricultural zone lighting restrictions',
                'Promote residential motion-sensor lighting',
                'Establish public building lighting standards'
            ]
        }
    },
    2021: {
        "Dhaka": {
            intensity: 92,
            population: 36500000,
            suggestions: [
                'Mandate full cutoff fixtures for all new construction',
                'Implement smart city lighting controls in urban areas',
                'Develop a light pollution reduction masterplan',
                'Phase out high-intensity white LEDs in residential zones'
            ]
        },
        "Chittagong": {
            intensity: 78,
            population: 28500000,
            suggestions: [
                'Create dark sky corridors for migratory birds',
                'Upgrade port area lighting with minimal-spillage fixtures',
                'Implement coastal lighting time restrictions',
                'Launch neighborhood light pollution audits'
            ]
        },
        "Rajshahi": {
            intensity: 48,
            population: 19000000,
            suggestions: [
                'Establish light-pollution-free agricultural zones',
                'Promote shielded lighting for commercial buildings',
                'Implement timed dimming systems for public areas',
                'Develop education programs on light pollution impacts'
            ]
        },
        "Khulna": {
            intensity: 58,
            population: 16000000,
            suggestions: [
                'Develop coastal lighting regulations',
                'Implement smart street lighting with adaptive controls',
                'Create protected dark zones around the Sundarbans',
                'Launch community-based light reduction initiatives'
            ]
        },
        "Sylhet": {
            intensity: 38,
            population: 10100000,
            suggestions: [
                'Establish dark-sky tourism initiatives',
                'Implement outdoor lighting ordinances',
                'Promote business participation in light reduction',
                'Create educational observatories in low-light areas'
            ]
        },
        "Rangpur": {
            intensity: 43,
            population: 16200000,
            suggestions: [
                'Develop rural light management strategies',
                'Create lighting standards for agricultural facilities',
                'Implement community-based light reduction programs',
                'Promote energy-efficient residential lighting'
            ]
        },
        "Barisal": {
            intensity: 45,
            population: 8500000,
            suggestions: [
                'Create waterfront lighting guidelines',
                'Implement timed dimming for decorative lighting',
                'Develop light pollution monitoring systems',
                'Promote shielded dock and boat lighting'
            ]
        },
        "Mymensingh": {
            intensity: 53,
            population: 11700000,
            suggestions: [
                'Develop university-led light pollution research',
                'Implement smart street lighting in urban areas',
                'Create light pollution awareness programs',
                'Establish dark-sky friendly business certification'
            ]
        }
    },
    2022: {
        "Dhaka": {
            intensity: 95,
            population: 37000000,
            suggestions: [
                'Integrate IoT systems for adaptive public lighting',
                'Establish light-free zones in urban parks',
                'Implement building lighting automation requirements',
                'Launch comprehensive light pollution monitoring network'
            ]
        },
        "Chittagong": {
            intensity: 82,
            population: 29000000,
            suggestions: [
                'Implement maritime lighting regulations for ports',
                'Develop comprehensive urban lighting masterplan',
                'Create light-sensitive zones near ecological areas',
                'Mandate energy-efficient lighting for all businesses'
            ]
        },
        "Rajshahi": {
            intensity: 52,
            population: 19500000,
            suggestions: [
                'Create agricultural dark sky reserves',
                'Implement district-wide light curfews',
                'Develop light pollution research partnerships',
                'Promote eco-friendly smart lighting systems'
            ]
        },
        "Khulna": {
            intensity: 62,
            population: 16500000,
            suggestions: [
                'Establish comprehensive coastal lighting regulations',
                'Implement wildlife-sensitive lighting near reserves',
                'Create light pollution monitoring system',
                'Develop adaptive public lighting infrastructure'
            ]
        },
        "Sylhet": {
            intensity: 42,
            population: 10300000,
            suggestions: [
                'Expand dark sky tourism initiatives',
                'Implement region-wide lighting standards',
                'Create tea garden lighting management plans',
                'Develop astronomical observation areas'
            ]
        },
        "Rangpur": {
            intensity: 47,
            population: 16600000,
            suggestions: [
                'Establish agricultural lighting best practices',
                'Implement regional light pollution monitoring',
                'Create dark sky community designations',
                'Develop public awareness campaigns'
            ]
        },
        "Barisal": {
            intensity: 49,
            population: 8800000,
            suggestions: [
                'Develop comprehensive waterway lighting plans',
                'Implement coastal habitat protection lighting',
                'Create community light management initiatives',
                'Establish regional lighting ordinances'
            ]
        },
        "Mymensingh": {
            intensity: 57,
            population: 12000000,
            suggestions: [
                'Establish university-community partnerships',
                'Implement smart lighting demonstration projects',
                'Create regional lighting standards',
                'Develop educational programs on light pollution'
            ]
        }
    },
    2023: {
        "Dhaka": {
            intensity: 97,
            population: 37500000,
            suggestions: [
                'Deploy AI-driven adaptive lighting networks citywide',
                'Establish comprehensive light pollution taxes',
                'Create mandatory dark-hour periods for all non-essential lighting',
                'Launch satellite-based light pollution tracking'
            ]
        },
        "Chittagong": {
            intensity: 85,
            population: 29500000,
            suggestions: [
                'Implement marine-protected lighting zones along entire coastline',
                'Establish port lighting regulations with automatic dimming',
                'Deploy smart-grid connected lighting management',
                'Require light impact assessments for all new developments'
            ]
        },
        "Rajshahi": {
            intensity: 55,
            population: 20000000,
            suggestions: [
                'Create agricultural dark sky preserves with tourism potential',
                'Implement university-led light pollution research initiatives',
                'Convert all municipal lighting to smart-adaptive systems',
                'Launch regional dark sky certification program'
            ]
        },
        "Khulna": {
            intensity: 65,
            population: 17000000,
            suggestions: [
                'Implement comprehensive Sundarbans-protection lighting zones',
                'Deploy IoT-based lighting management systems',
                'Establish light pollution reduction targets',
                'Create coastal ecosystem lighting management plan'
            ]
        },
        "Sylhet": {
            intensity: 45,
            population: 10500000,
            suggestions: [
                'Establish international dark sky reserve designation',
                'Deploy smart-grid connected adaptive lighting',
                'Implement lighting impact fees for new developments',
                'Create cross-border light pollution management initiative'
            ]
        },
        "Rangpur": {
            intensity: 50,
            population: 17000000,
            suggestions: [
                'Implement comprehensive agricultural lighting management',
                'Establish regional dark sky network',
                'Deploy energy-neutral smart lighting systems',
                'Create rural lighting best practices certification'
            ]
        },
        "Barisal": {
            intensity: 52,
            population: 9000000,
            suggestions: [
                'Implement comprehensive delta ecosystem lighting plan',
                'Deploy adaptive riverfront lighting systems',
                'Establish blue-light reduction zones near waterways',
                'Create regional light pollution monitoring network'
            ]
        },
        "Mymensingh": {
            intensity: 60,
            population: 12300000,
            suggestions: [
                'Establish regional light pollution research center',
                'Deploy comprehensive municipal smart lighting network',
                'Implement university campus dark sky zone',
                'Create public-private partnerships for lighting reduction'
            ]
        }
    }
};

const mockData: LightPollutionData = {
    region: 'Dhaka',
    coordinates: {lat: 23.8103, lng: 90.4125},
    pollutionLevel: 'severe' as PollutionLevel,
    value: 97,
    suggestions: bangladeshData[2023]["Dhaka"].suggestions,
    trends: [90, 92, 95, 97]
};

export default function Home() {
    const [year, setYear] = useState<number>(2023);
    const [selectedData, setSelectedData] = useState<LightPollutionData>(mockData);
    const [isPanelOpen, setIsPanelOpen] = useState({left: true, right: true});

    const handleYearChange = (newYear: number) => {
        setYear(newYear);

        const regionName = selectedData.region.split(',')[0].trim();

        if (bangladeshData[newYear] && bangladeshData[newYear][regionName]) {
            const regionData = bangladeshData[newYear][regionName];

            let pollutionLevel: PollutionLevel = 'moderate';
            if (regionData.intensity > 80) pollutionLevel = 'severe';
            else if (regionData.intensity > 60) pollutionLevel = 'heavy';
            else if (regionData.intensity > 40) pollutionLevel = 'moderate';
            else if (regionData.intensity > 20) pollutionLevel = 'mild';
            else pollutionLevel = 'none';

            const trends = Object.keys(bangladeshData)
                .map(Number)
                .sort()
                .map(y => bangladeshData[y][regionName]?.intensity || 0);

            setSelectedData({
                ...selectedData,
                value: regionData.intensity,
                pollutionLevel: pollutionLevel,
                suggestions: regionData.suggestions,
                trends: trends
            });
        }
    };

    const handleMapClick = (lat: number, lng: number) => {
        let clickedRegion = 'Dhaka'; // Default

        if (lat > 23.5 && lat < 24.5 && lng > 89.8 && lng < 91.0) clickedRegion = 'Dhaka';
        else if (lat > 21.8 && lat < 24.0 && lng > 91.0 && lng < 92.6) clickedRegion = 'Chittagong';
        else if (lat > 24.0 && lat < 25.8 && lng > 88.0 && lng < 89.8) clickedRegion = 'Rajshahi';
        else if (lat > 21.5 && lat < 23.4 && lng > 88.8 && lng < 90.2) clickedRegion = 'Khulna';
        else if (lat > 24.0 && lat < 25.2 && lng > 90.8 && lng < 92.6) clickedRegion = 'Sylhet';
        else if (lat > 25.2 && lat < 26.6 && lng > 88.0 && lng < 90.5) clickedRegion = 'Rangpur';
        else if (lat > 21.5 && lat < 23.4 && lng > 89.8 && lng < 91.0) clickedRegion = 'Barisal';
        else if (lat > 24.2 && lat < 25.2 && lng > 89.8 && lng < 90.8) clickedRegion = 'Mymensingh';

        const regionData = bangladeshData[year][clickedRegion];

        let pollutionLevel: PollutionLevel = 'moderate';
        if (regionData.intensity > 80) pollutionLevel = 'severe';
        else if (regionData.intensity > 60) pollutionLevel = 'heavy';
        else if (regionData.intensity > 40) pollutionLevel = 'moderate';
        else if (regionData.intensity > 20) pollutionLevel = 'mild';
        else pollutionLevel = 'none';

        const trends = Object.keys(bangladeshData)
            .map(Number)
            .sort()
            .map(y => bangladeshData[y][clickedRegion]?.intensity || 0);

        setSelectedData({
            region: clickedRegion,
            coordinates: {lat, lng},
            pollutionLevel: pollutionLevel,
            value: regionData.intensity,
            suggestions: regionData.suggestions,
            trends: trends
        });
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900">
            <Navigation/>

            <div className="flex flex-1 overflow-hidden">
                {isPanelOpen.left && (
                    <LeftPanel
                        year={year}
                        onYearChange={handleYearChange}
                        isOpen={isPanelOpen.left}
                        onToggle={() => setIsPanelOpen(prev => ({...prev, left: !prev.left}))}
                    />
                )}

                <div className="flex-1 relative">
                    <DynamicMap
                        year={year}
                        onMapClick={handleMapClick}
                        pollutionData={selectedData}
                        regionData={bangladeshData[year]}
                    />
                </div>

                {isPanelOpen.right && (
                    <RightPanel
                        data={selectedData}
                        isOpen={isPanelOpen.right}
                        onToggle={() => setIsPanelOpen(prev => ({...prev, right: !prev.right}))}
                    />
                )}
            </div>
        </div>
    );
}