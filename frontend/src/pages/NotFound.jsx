import { Link, useNavigate } from "react-router-dom"

function  NotFound() {

    const navigate = useNavigate();
    let numero = 2;
    
    function irInicio(){
        navigate('/');
    }

    return (
        <>  
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '80vh' }}>
                <div className="">
                    <h1>404 | NotFound </h1>
                    <Link to="/">Regresar al home</Link>
                </div>
            </div>
        </>
    )
}

export default NotFound