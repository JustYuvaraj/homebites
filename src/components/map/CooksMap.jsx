import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icons
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const cookIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapController({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || 13);
    }
  }, [center, zoom, map]);
  
  return null;
}

export default function CooksMap({ 
  userLocation,
  cooks = [],
  selectedCook = null,
  onCookSelect,
  height = '400px',
  showDeliveryZones = true
}) {
  // Default to Chennai center
  const defaultCenter = [13.0827, 80.2707];
  const center = userLocation ? [userLocation.lat, userLocation.lng] : defaultCenter;
  
  return (
    <div style={{ height }} className="rounded-lg overflow-hidden border border-gray-300">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User location marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>
              <div className="text-center">
                <strong>📍 Your Location</strong>
              </div>
            </Popup>
          </Marker>
        )}
        
        {/* Cook markers with delivery zones */}
        {cooks.map((cook) => (
          cook.latitude && cook.longitude && (
            <div key={cook.id}>
              <Marker 
                position={[cook.latitude, cook.longitude]} 
                icon={cookIcon}
                eventHandlers={{
                  click: () => onCookSelect?.(cook)
                }}
              >
                <Popup>
                  <div className="min-w-[200px]">
                    <h3 className="font-bold text-lg">{cook.kitchenName || cook.name}</h3>
                    <p className="text-sm text-gray-600">{cook.speciality}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-500">★</span>
                      <span>{cook.rating?.toFixed(1) || 'New'}</span>
                      <span className="text-gray-400">•</span>
                      <span>{cook.totalOrders || 0} orders</span>
                    </div>
                    {cook.deliveryRadiusKm && (
                      <p className="text-xs text-gray-500 mt-1">
                        Delivers within {cook.deliveryRadiusKm} km
                      </p>
                    )}
                    <button
                      onClick={() => onCookSelect?.(cook)}
                      className="mt-2 w-full bg-orange-500 text-white text-sm py-1 px-3 rounded hover:bg-orange-600"
                    >
                      View Menu
                    </button>
                  </div>
                </Popup>
              </Marker>
              
              {/* Delivery zone circle */}
              {showDeliveryZones && cook.deliveryRadiusKm && (
                <Circle
                  center={[cook.latitude, cook.longitude]}
                  radius={cook.deliveryRadiusKm * 1000}
                  pathOptions={{
                    color: selectedCook?.id === cook.id ? '#22c55e' : '#f97316',
                    fillColor: selectedCook?.id === cook.id ? '#bbf7d0' : '#fed7aa',
                    fillOpacity: 0.2,
                    weight: selectedCook?.id === cook.id ? 3 : 1
                  }}
                />
              )}
            </div>
          )
        ))}
        
        <MapController center={center} zoom={userLocation ? 14 : 12} />
      </MapContainer>
    </div>
  );
}
