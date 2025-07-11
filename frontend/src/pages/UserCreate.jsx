import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserCreate = () =>{
    const HOST = 'http://127.0.0.1:3000/api';
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    function handlerChange( event ) {
        const clave = event.target.name;
        const value = event.target.value;
        setMsg('');
        setUser( {...user, [clave]: value} )
    }

    async function postUser(event) {
        event.preventDefault();

        if( user.name.trim() == ''){
            setMsg('Completar el nombre de usuario');
            return;
        }

        if( user.name.trim().length < 3){
            setMsg('El nombre de ser mayor o igual a 3 caracteres');
            return;
        }

        if( user.email.trim() == ''){
            setMsg('Completar el email');
            return;
        }

        if( user.password.trim() == ''){
            setMsg('Completar la contraseña del usuario');
            return;
        }

        if( user.password.trim().length < 3){
            setMsg('La contaseña de ser mayor o igual a 3 caracter');
            return;
        }
        try {
            const response = await fetch(`${HOST}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();

            if( response.ok && data.msg == 'Usuario creado'){
                setMsg("Usuario creado correctamente");
                setTimeout(() => navigate("/users"), 1000);
            } else {
                setMsg( data.msg);
            }
        } catch (error) {
            setMsg('Tenemos un error al Registrar el usuario');
        }
    }

    return (
        <>
            {msg && <div className="alert alert-danger">{msg}</div>}
            <div className="card bg-dark text-white border">
                <h1 className="card-header border-bottom bg-black">Crear Usario</h1>
                <div className="card-body">
                    <form onSubmit={postUser}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input 
                                className="form-control bg-dark text-white"
                                type="text" 
                                name="name"
                                value={user.name}
                                onChange={handlerChange} 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input 
                                className="form-control bg-dark text-white"
                                type="email" 
                                name="email"
                                value={user.email}
                                onChange={handlerChange} 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input 
                                className="form-control bg-dark text-white"
                                type="password" 
                                name="password"
                                value={user.password}
                                onChange={handlerChange} 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Crear Usuario</button>
                    </form>
                </div>
            </div>
        </>
    )

}

export default UserCreate