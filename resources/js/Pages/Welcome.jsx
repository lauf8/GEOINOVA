import { Link, Head } from '@inertiajs/react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useState } from 'react';
import Modal from './Modal';

function LocationMarker({ onMapClick }) {
    const [position, setPosition] = useState(null);
  
    const map = useMap();
  
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      onMapClick(); 
    });
}

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
      nome: '',
      endereco: ''
    });

    const handleOpenModal = () => {
        setModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      // Aqui você pode adicionar a lógica para lidar com o envio dos dados do formulário
      console.log('Dados do formulário enviados:', formData);
      handleCloseModal(); // Feche o modal após o envio do formulário
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Head title="Maps" />
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} className="w-3/4 h-3/4" style={{ zIndex: 1 }}>
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

                {/* Passa a função para abrir o modal como prop para o componente LocationMarker */}
                <LocationMarker onMapClick={handleOpenModal} />
            </MapContainer>

            {/* Renderiza o modal */}
            <Modal show={modalOpen} onClose={handleCloseModal} maxWidth="md"  style={{ zIndex: 999 }}>
                <div className="p-4">
                    <h2>Adicionar Ponto de Interesse</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="nome" className="block mb-2">Nome do Ponto de Interesse:</label>
                        <input
                          type="text"
                          id="nome"
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          className="border border-gray-300 rounded-md px-3 py-2 w-full"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="endereco" className="block mb-2">Endereço:</label>
                        <input
                          type="text"
                          id="endereco"
                          name="endereco"
                          value={formData.endereco}
                          onChange={handleChange}
                          className="border border-gray-300 rounded-md px-3 py-2 w-full"
                          required
                        />
                      </div>
                      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Adicionar</button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
