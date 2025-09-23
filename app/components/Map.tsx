'use client';

import {useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMapEvents, GeoJSON} from 'react-leaflet';
import L from 'leaflet';
import {LightPollutionData} from '../types';
import {FeatureCollection, Feature, Geometry} from 'geojson';
import {PathOptions} from 'leaflet';

interface BangladeshFeature extends Feature {
    properties: {
        name: string;
        [key: string]: string | number | boolean | null;
    };
}

interface BangladeshGeoJSON extends FeatureCollection {
    features: BangladeshFeature[];
}

interface RegionData {
    intensity: number;
    population: number;
    suggestions: string[];
}

delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
    year: number;
    onMapClick: (lat: number, lng: number) => void;
    pollutionData: LightPollutionData;
    regionData: Record<string, RegionData>;
}

function MapEvents({onMapClick}: { onMapClick: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

const Map = ({year, onMapClick, pollutionData, regionData}: MapProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const bangladeshRegionsData = regionData || {};

    // Choropleths
    const bangladeshGeoJSON: BangladeshGeoJSON = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {"name": "Dhaka"},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [89.8, 23.4], [90.8, 23.4], [91.0, 24.2], [90.5, 24.5], [89.8, 24.2], [89.8, 23.4]
                    ]]
                }
            },
            {
                "type": "Feature",
                "properties": {"name": "Chittagong"},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [91.0, 21.8], [92.6, 21.8], [92.6, 24.0], [91.0, 24.2], [91.0, 21.8]
                    ]]
                }
            },
            {
                "type": "Feature",
                "properties": {"name": "Rajshahi"},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [88.0, 24.0], [89.8, 24.0], [89.8, 25.8], [88.0, 25.8], [88.0, 24.0]
                    ]]
                }
            },
            {
                "type": "Feature",
                "properties": {"name": "Khulna"},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [88.8, 21.5], [90.2, 21.5], [90.2, 23.4], [88.8, 23.4], [88.8, 21.5]
                    ]]
                }
            },
            {
                "type": "Feature",
                "properties": {"name": "Sylhet"},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [90.8, 24.2], [92.6, 24.0], [92.6, 25.2], [90.5, 25.2], [90.5, 24.5], [90.8, 24.2]
                    ]]
                }
            },
            {
                "type": "Feature",
                "properties": {"name": "Rangpur"},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [88.0, 25.2], [90.5, 25.2], [90.5, 26.6], [88.0, 26.6], [88.0, 25.2]
                    ]]
                }
            },
            {
                "type": "Feature",
                "properties": {"name": "Barisal"},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [89.8, 21.5], [91.0, 21.8], [91.0, 23.4], [89.8, 23.4], [89.8, 21.5]
                    ]]
                }
            },
            {
                "type": "Feature",
                "properties": {"name": "Mymensingh"},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [89.8, 24.2], [90.8, 24.2], [90.5, 25.2], [89.8, 25.8], [89.8, 24.2]
                    ]]
                }
            }
        ]
    };

    const getColor = (intensity: number) => {
        return intensity > 80 ? '#800026' :
            intensity > 70 ? '#BD0026' :
                intensity > 60 ? '#E31A1C' :
                    intensity > 50 ? '#FC4E2A' :
                        intensity > 40 ? '#FD8D3C' :
                            intensity > 30 ? '#FEB24C' :
                                intensity > 20 ? '#FED976' :
                                    '#FFEDA0';
    };

    const styleFunction = (feature?: Feature<Geometry, Record<string, unknown>>): PathOptions => {
        if (!feature) {
            return {
                fillColor: '#FFEDA0',
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }

        const banglaFeature = feature as BangladeshFeature;
        const regionName = banglaFeature.properties?.name || '';
        const regionData = bangladeshRegionsData[regionName];
        const intensity = regionData ? regionData.intensity : 0;

        return {
            fillColor: getColor(intensity),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    };

    const highlightFeature = (e: L.LeafletMouseEvent) => {
        const layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.9
        });

        layer.bringToFront();
    };

    const resetHighlight = (e: L.LeafletMouseEvent) => {
        const layer = e.target;
        const feature = layer.feature;

        layer.setStyle(styleFunction(feature as BangladeshFeature));
    };

    const onEachFeature = (feature: BangladeshFeature, layer: L.Layer) => {
        const regionName = feature.properties.name;
        const regionData = bangladeshRegionsData[regionName];

        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: (e: L.LeafletMouseEvent) => {
                const latlng = e.latlng;
                onMapClick(latlng.lat, latlng.lng);
            }
        });

        if (regionData) {
            layer.bindPopup(`
                    <div>
                      <h3><strong>${regionName} Division</strong></h3>
                      <p><strong>Light Pollution Level:</strong> ${regionData.intensity}/100</p>
                      <p><strong>Status:</strong> ${
                regionData.intensity > 80 ? 'Severe' :
                    regionData.intensity > 60 ? 'High' :
                        regionData.intensity > 40 ? 'Moderate' :
                            regionData.intensity > 20 ? 'Mild' : 'Minimal'
            }</p>
                      <p><strong>Population:</strong> ${(regionData.population / 1000000).toFixed(1)}M</p>
                      <p><strong>Year:</strong> ${year}</p>
                    </div>
                  `);
        }
    };

    if (!mounted) {
        return <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <span className="text-white">Loading choropleth map...</span>
        </div>;
    }

    return (
        <MapContainer
            center={[23.8103, 90.4125]}
            zoom={8}
            className="w-full h-full"
            zoomControl={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapEvents onMapClick={onMapClick}/>

            <GeoJSON
                key={`bangladesh-regions-${year}`}
                data={bangladeshGeoJSON}
                style={styleFunction as L.StyleFunction<Feature<Geometry, Record<string, unknown>>>}
                onEachFeature={onEachFeature}
            />

            <Marker position={[pollutionData.coordinates.lat, pollutionData.coordinates.lng]}>
                <Popup>
                    <div>
                        <h3><strong>{pollutionData.region}</strong></h3>
                        <p><strong>Light Pollution:</strong> {pollutionData.value}/100</p>
                        <p><strong>Status:</strong> {pollutionData.pollutionLevel}</p>
                    </div>
                </Popup>
            </Marker>

            <div className="absolute top-4 left-4 z-[1000] bg-black bg-opacity-85 text-white p-3 rounded-lg">
                <div className="text-sm mb-2">
                    <strong>Year: {year}</strong> | Click on map to select a location
                </div>

                <div className="text-xs">
                    Light Pollution Intensity Legend:
                    <div className="grid grid-cols-4 gap-1 mt-1">
                        <div className="flex items-center"><span className="w-3 h-3 bg-[#800026] mr-1"></span>Severe
                        </div>
                        <div className="flex items-center"><span className="w-3 h-3 bg-[#BD0026] mr-1"></span>Very High
                        </div>
                        <div className="flex items-center"><span className="w-3 h-3 bg-[#E31A1C] mr-1"></span>High</div>
                        <div className="flex items-center"><span className="w-3 h-3 bg-[#FC4E2A] mr-1"></span>Moderate-High
                        </div>
                        <div className="flex items-center"><span className="w-3 h-3 bg-[#FD8D3C] mr-1"></span>Moderate
                        </div>
                        <div className="flex items-center"><span className="w-3 h-3 bg-[#FEB24C] mr-1"></span>Low-Moderate
                        </div>
                        <div className="flex items-center"><span className="w-3 h-3 bg-[#FED976] mr-1"></span>Low</div>
                        <div className="flex items-center"><span className="w-3 h-3 bg-[#FFEDA0] mr-1"></span>Minimal
                        </div>
                    </div>
                </div>
            </div>
        </MapContainer>
    );
};

export default Map;