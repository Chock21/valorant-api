import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const UsersABM = () => {
    const HOST = 'http://127.0.0.1:3000/api';
    const [users, setUsers] = useState([]);
    const { token } = useContext(AuthContext);
    const [msg, setMsg] = useState('');
    const [user, setUser] = useState({ name: '', email: '', password: '', });
    const [editUserData, setEditUser] = useState({ _id: '', name: '', email: '', password: '' });

    const navigate = useNavigate();

    async function getUsers() {
        try {
            const response = await fetch(`${HOST}/users`);
            const data = await response.json()
            console.log(data);
            setUsers(data);
        } catch (error) {
            console.error(error)
            alert('Tenemos un error en el Servidor');
        }

    }

    function handlerChangeEdit( event ) {
        const clave = event.target.name;
        const value = event.target.value;
        setMsg('');
        setEditUser( {...editUserData, [clave]: value} )
    }

    

    async function  editUser(e) {
        e.preventDefault();
        if( editUserData.name.trim() == ''){
            setMsg('Completar el nombre de usuario');
            return;
        }

        if( editUserData.name.trim().length < 3){
            setMsg('El nombre de ser mayor o igual a tres caracter');
            return;
        }

        if( editUserData.email.trim() == ''){
            setMsg('Completar el email');
            return;
        }

        if( editUserData.password.trim() && editUserData.password.trim().length < 3){
            setMsg('La contaseña de ser mayor o igual a tres caracter');
            return;
        }

        setMsg('');
        
        try {
            const response = await fetch(`${HOST}/users/${editUserData._id}`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(editUserData)
            });
            const data = await response.json();
            setMsg(data.msg);
            getUsers();
            document.querySelector(`#editUserModal-${editUserData._id} .btn-close`).click();
        } catch (error) {
            setMsg('Error al editar el usuario');
        }
    }

    async function deleteUser(id) {
        if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;
        try {
            const response = await fetch(`${HOST}/users/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            });
            const data = await response.json();
            setMsg(data.msg);
            getUsers();
        } catch (error) {
            setMsg('Error al eliminar el usuario');
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            {msg && (
            <div className="alert alert-danger" role="alert">
                {msg}
            </div>
            )}
            <h1 className="mb-4">ABM de Usuarios</h1>
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Email</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => (
                            <tr key={user._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link to={`/users/${user._id}`} className="btn btn-primary">Ver</Link>
                                    <button
                                        className="btn btn-warning ms-2"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#editUserModal-${user._id}`}
                                        onClick={() => setEditUser({ _id: user._id, name: user.name, email: user.email, password: '' })}
                                    >
                                        Editar
                                    </button>
                                    <div
                                        className="modal fade"
                                        id={`editUserModal-${user._id}`}
                                        tabIndex="-1"
                                        aria-labelledby={`editUserModalLabel-${user._id}`}
                                        aria-hidden="true"
                                    >
                                        <div className="modal-dialog">
                                            <div className="modal-content bg-dark text-white">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id={`editUserModalLabel-${user._id}`}>Editar Usuario</h5>
                                                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <form onSubmit={editUser}>
                                                    <div className="modal-body">
                                                        <div className="mb-3">
                                                            <label className="form-label">Nombre</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="name"
                                                                value={editUserData.name}
                                                                onChange={handlerChangeEdit}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label">Email</label>
                                                            <input
                                                                className="form-control"
                                                                type="email"
                                                                name="email"
                                                                value={editUserData.email}
                                                                onChange={handlerChangeEdit}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label">Contraseña (dejar en blanco para no cambiar)</label>
                                                            <input
                                                                className="form-control"
                                                                type="password"
                                                                name="password"
                                                                value={editUserData.password}
                                                                onChange={handlerChangeEdit}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                                        <button type="submit" className="btn btn-success">Guardar Cambios</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-danger ms-2" onClick={() => deleteUser(user._id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </>
    )

}

export default UsersABM