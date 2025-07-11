import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext";

const UserLogin = () =>{
    const HOST = 'http://127.0.0.1:3000/api';
    const [ user, setUser] = useState({email: '', password: ''});
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    function handlerChange( event ) {
        const clave = event.target.name;
        const value = event.target.value;
        setUser( {...user, [clave]: value} )
    }

    async function postUser(event) {
        event.preventDefault();
        try {
            const options = {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(user)
            }

            const response = await fetch(`${HOST}/users/login`, options);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                alert(errorData.msg || 'Credenciales incorrectas');
                return;
            }
            const data = await response.json();
            console.log( data);
            //navigate('/users')

            if (data.token) {
                login(data.user || user, data.token);
                navigate('/')
            }

        } catch (error) {
            alert('Tenemos un error al loguear el usuario');
        }
    }

    return (
        <>
            <div className="card bg-dark text-white border mb-3">
                <h1 className="card-header border-bottom bg-black">Login</h1>
                <div className="card-body">
                    <form onSubmit={postUser}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Email</label>
                            <input
                                className="form-control bg-dark text-white border"
                                name="email"
                                type="email"
                                value={user.email}
                                onChange={ handlerChange } 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">password</label>
                            <input 
                                className="form-control bg-dark text-white border"
                                name="password"
                                value={user.password}
                                onChange={ handlerChange }
                                type="password" 
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserLogin