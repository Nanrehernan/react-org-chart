import { Component } from "react";
import { Link } from "react-router-dom";

export default class Navegacion extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Organigrama S.A.</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/funcionarios">Funcionarios</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/departamento">Departamento</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/organigrama">Organigrama</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}