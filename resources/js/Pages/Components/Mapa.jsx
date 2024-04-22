import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

function Mapa({ onMapClick }) {
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} className="w-3/4 h-3/4">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <Marker position={[51.505, -0.09]} icon={new Icon({
                iconUrl: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Green_icon.svg",
                iconSize : [28,28]
            })}></Marker>
            <Marker position={[51.0, -0.09]} icon={new Icon({
                iconUrl: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Green_icon.svg",
                iconSize : [28,28]
            })}></Marker>

            <LocationMarker onMapClick={onMapClick} />
        </MapContainer>
    );
}

export default Mapa;
