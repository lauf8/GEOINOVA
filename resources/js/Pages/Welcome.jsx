import { Link, Head } from '@inertiajs/react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useState } from 'react';

function LocationMarker() {
    const [position, setPosition] = useState(null);
  
    const map = useMap();
  
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    });
}

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Maps" />

            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
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

                <LocationMarker />
            </MapContainer>
          
        </>
    );
}
