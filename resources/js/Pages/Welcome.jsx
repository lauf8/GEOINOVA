import { Link, Head, useForm } from "@inertiajs/react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useEffect, useState } from "react";
import Modal from "./Modal";



function LocationMarker({ onMapClick }) {
    const map = useMap();

    map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        onMapClick(lat, lng);
    });
}



export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
    categorias,
    pontos
}) {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = (lat, lng) => {
        setData({ ...data, lat, lng })
        

        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const { data, setData, post,  } = useForm({
        nome: "",
        endereco: "",
        categoria_id: "",
        lat: 0,
        lng: 0
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = (event) => {
        console.log(data);
    
        event.preventDefault();
        

        post("/ponto", {
            data,
            onSuccess: () => {
                console.log("Categoria criada com sucesso!");
                setData({ nome: "", endereco: "", categoria: "" });
            },
            onError: (errors) => {
                console.error("Erro ao criar categoria:", errors);
            },
        });
    };
 

    return (
        <div className="flex justify-center items-center h-screen">
            <Head title="Maps" />
            <MapContainer
                center={[-14.502778, -42.221944]}
                zoom={13}
                
                scrollWheelZoom={true}
                className="w-3/4 h-3/4"
                style={{ zIndex: 1 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {pontos.map((ponto) => (
                                    <Marker
                                    key={ponto.id}
                                    position={[ponto.lat, ponto.lng]}
                                    icon={
                                        new Icon({
                                            iconUrl:
                                                ponto.categoria.url_icon,
                                            iconSize: [28, 28],
                                        })
                                    }
                                    
                                >

                                    <Popup>{ponto.nome},{ponto.endereco} </Popup>
                                </Marker>
                                
                                
                                ))};
                
                
                <LocationMarker
                    onMapClick={handleOpenModal} 
                />
                
            </MapContainer>
            <div class="legenda">
                {categorias.map((categoria) => (
                    <div key={categoria.id}>
                        <img src={categoria.url_icon} alt="" />
                        <p>{categoria.nome}</p>
                    </div>
                ))}
</div>
              

            <Modal

                show={modalOpen}
                onClose={handleCloseModal}
                maxWidth="md"
                style={{ zIndex: 999 }}
            >
                <div className="p-4">
                    <h2>Adicionar Ponto de Interesse</h2>
                    <form onSubmit={handleSubmit} className="w-full max-w-md">
                        <div className="mb-4">
                            <label htmlFor="nome" className="block mb-2">
                                Nome:
                            </label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={data.nome}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="endereco" className="block mb-2">
                                Endereço:
                            </label>
                            <input
                                type="text"
                                id="endereco"
                                name="endereco"
                                value={data.endereco}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="categoria" className="block mb-2">
                                Categoria:
                            </label>
                            <select
                                id="categoria_id"
                                name="categoria_id"
                                value={data.categoria_id}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                required
                            >
                                <option value="">
                                    Selecione uma categoria
                                </option>
                                {categorias.map((categoria) => (
                                    <option
                                        key={categoria.id}
                                        value={categoria.id}
                                    >
                                        {categoria.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Adicionar Categoria
                        </button>
                    </form>
                </div> 
            </Modal>
        </div>
    );
}
