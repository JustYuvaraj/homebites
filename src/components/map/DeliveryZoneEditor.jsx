import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Circle, Marker, useMapEvents, useMap, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function KitchenMarker({ position, setPosition, setMapCenter }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? (
    <Marker 
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const pos = marker.getLatLng();
          setPosition([pos.lat, pos.lng]);
        },
      }}
    />
  ) : null;
}

function MapController({ center }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, 14);
    }
  }, [center, map]);
  
  return null;
}

export default function DeliveryZoneEditor({ 
  initialPosition = null,
  initialRadius = 3,
  onZoneChange,
  height = '400px'
}) {
  const [position, setPosition] = useState(initialPosition);
  const [radius, setRadius] = useState(initialRadius);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Default to Chennai center
  const defaultCenter = [13.0827, 80.2707];
  
  useEffect(() => {
    if (position) {
      onZoneChange?.({
        latitude: position[0],
        longitude: position[1],
        deliveryRadiusKm: radius,
        // Create a simple square polygon around the center
        deliveryZone: generatePolygonFromRadius(position, radius)
      });
    }
  }, [position, radius, onZoneChange]);
  
  const generatePolygonFromRadius = (center, radiusKm) => {
    // Generate approximate polygon points around the center
    const points = [];
    const numPoints = 8;
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      // Approximate degrees for the radius (1 degree ≈ 111km at equator)
      const latOffset = (radiusKm / 111) * Math.cos(angle);
      const lngOffset = (radiusKm / (111 * Math.cos(center[0] * Math.PI / 180))) * Math.sin(angle);
      points.push([center[0] + latOffset, center[1] + lngOffset]);
    }
    
    return JSON.stringify(points);
  };
  
  const handleGetCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPos = [pos.coords.latitude, pos.coords.longitude];
          setPosition(newPos);
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoading(false);
          alert('Could not get your location. Please click on the map to select.');
        }
      );
    } else {
      setIsLoading(false);
      alert('Geolocation is not supported by your browser');
    }
  };
  
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const newPos = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        setPosition(newPos);
      } else {
        alert('Location not found. Try a different search.');
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Error searching for location');
    }
    setIsLoading(false);
  };
  
  return (
    <div className="w-full">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kitchen Location
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search your kitchen address..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <button
            type="button"
            onClick={handleSearch}
            disabled={isLoading}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleGetCurrentLocation}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            title="Use my current location"
          >
            📍
          </button>
        </div>
      </div>
      
      <div style={{ height }} className="rounded-lg overflow-hidden border border-gray-300 mb-4">
        <MapContainer
          center={position || defaultCenter}
          zoom={position ? 14 : 12}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <KitchenMarker position={position} setPosition={setPosition} />
          {position && (
            <Circle
              center={position}
              radius={radius * 1000} // Convert km to meters
              pathOptions={{
                color: '#f97316',
                fillColor: '#fed7aa',
                fillOpacity: 0.3,
                weight: 2
              }}
            />
          )}
          <MapController center={position} />
        </MapContainer>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Delivery Radius: <span className="text-orange-600 font-bold">{radius} km</span>
        </label>
        <input
          type="range"
          min="1"
          max="10"
          step="0.5"
          value={radius}
          onChange={(e) => setRadius(parseFloat(e.target.value))}
          className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1 km</span>
          <span>5 km</span>
          <span>10 km</span>
        </div>
      </div>
      
      {position && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">
            ✓ Kitchen location set at {position[0].toFixed(4)}, {position[1].toFixed(4)}
          </p>
          <p className="text-sm text-green-600 mt-1">
            You will deliver within {radius} km radius (shown in orange)
          </p>
        </div>
      )}
      
      <p className="mt-2 text-xs text-gray-500">
        Click on the map or drag the marker to set your kitchen location. Adjust the slider to set your delivery area.
      </p>
    </div>
  );
}
