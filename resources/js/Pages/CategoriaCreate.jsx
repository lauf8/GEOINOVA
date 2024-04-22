import { useForm } from '@inertiajs/react';
import axios from 'axios';

export default function CategoryForm() {
    const { data, setData, post } = useForm({
        nome: '',
        url_icon: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const validateUrl = (url) => {
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(url);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateUrl(data.url_icon)) {
            console.error('A URL do ícone não é válida.');
            return;
        }

        post('/categoria', {
            data,
            onSuccess: () => {
                console.log('Categoria criada com sucesso!');
                setData({ nome: '', url_icon: '' });
            },
            onError: (errors) => {
                console.error('Erro ao criar categoria:', errors);
            },
        });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="nome" className="block mb-2">Nome da Categoria:</label>
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
                    <label htmlFor="url_icon" className="block mb-2">URL do Ícone:</label>
                    <input
                        type="text"
                        id="url_icon"
                        name="url_icon"
                        value={data.url_icon}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Adicionar Categoria</button>
            </form>
        </div>
    );
}
