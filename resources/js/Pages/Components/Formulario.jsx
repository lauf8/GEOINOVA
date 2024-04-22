import React, { useState } from 'react';

function Formulario({ onSubmit }) {
    const [formData, setFormData] = useState({
        nome: '',
        endereco: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
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
    );
}

export default Formulario;
