import { Link } from "react-router-dom";


export default function Navbar(props) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="home">Noxe</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="movies">Movies</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="people">People</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="tv">Tv</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="contacts">Contacts</Link>
                            </li>
                         
                        </ul>
                      
                        <ul className="navbar-nav mb-2 ms-auto mb-lg-0">
                            <li className="nav-item d-flex align-items-center order-last order-lg-first">
                                <i className="fab fa-facebook mx-2"></i>
                                <i className="fab fa-twitter mx-2"></i>
                                <i className="fab fa-instagram mx-2"></i>

                            </li>
                           {props.Data?<> <li className="nav-item order-first order-lg-last">
                                <span onClick={props.logout} className="nav-link pointer" aria-current="page">Logout</span>
                            </li></>:<> <li className="nav-item order-first order-lg-last">
                                <Link className="nav-link" aria-current="page" to="register">Register</Link>
                            </li>
                            <li className="nav-item order-first order-lg-last">
                                <Link className="nav-link" aria-current="page" to="login">Login</Link>
                            </li></>}
                        
                           
                         
                         
                        </ul>
                      
                    </div>
                </div>
            </nav>
        </div>
    )
}