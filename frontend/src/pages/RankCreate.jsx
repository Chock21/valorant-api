import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function RankCreate() {
    const HOST = 'http://127.0.0.1:3000/api';
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !image) {
            setMsg("Todos los campos son obligatorios");
            return;
        }
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);
        try {
            const response = await fetch(`${HOST}/ranks`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                setMsg("Rango creado correctamente");
                setTimeout(() => navigate("/ranks"), 1000);
            } else {
                setMsg(data.msg || "Error al crear el rango");
            }
        } catch (error) {
            setMsg("Error en el servidor");
        }
    }

    return (
        <>
            {msg && <div className="alert alert-danger">{msg}</div>}
            <h1 className="mb-4">Crear Nuevo Rango</h1>
            <form onSubmit={handleSubmit} className="bg-dark" encType="multipart/form-data">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label text-white">Nombre del Rango</label>
                     <input
                        type="text"
                        className="form-control bg-dark text-white border"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label text-white">Imagen del Rango</label>
                    <input
                        type="file"
                        className="form-control bg-dark text-white border"
                        id="image"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <button type="submit" className="btn btn-danger mt-2">Crear Rango</button>
                <Link to="/ranks" className="btn btn-secondary mt-2 ms-2">Cancelar</Link>
            </form>
        </>
    )
}

export default RankCreate;