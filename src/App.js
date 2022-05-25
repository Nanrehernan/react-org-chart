import { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navegacion from "./Navegacion";
import Inicio from "./Inicio";
import Organigrama from "./Organigrama";
import OrganigramaProyecto from "./OrganigramaProyecto";
import Funcionario from "./Funcionario";
import Departamento from "./Departamento";
import "./App.css";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cargar: true,
            datos: [
                { id: 1, name: "CEO", departament: "Organigrama", title: "Outline", idParent: 1 },
                { id: 2, name: "Datos", departament: "Inicio", title: "Outline", idParent: 1 }],
            name: "CEO"
        };
    }

    handleOnChange = (e) => {
        this.setState({
            file: e.target.files[0],
            inputFile: e.target
        });
    }

    handleOnClick = (e) => {
        this.setState({
            cargar: false
        });

        this.getDatos();
    }

    getDatos = () => {
        this.setState({
            cargar: true
        });

        /*const xhttp = new XMLHttpRequest();
        xhttp.onload = () => {
            const datos = JSON.parse(xhttp.response);
            this.setState({
                datos: datos,
                cargar: true
            })
        }
        xhttp.open("get", "http://localhost:9000/task", true);
        xhttp.send();*/
    }

    componentDidMount() {
        //this.getDatos();
    }

    setEscribir = (d) => {
        this.setState({
            name: d.person.name
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <Router>
                    <Navegacion />

                    <Routes>
                        <Route path="/react-org-chart" element={<Inicio />} />
                        <Route path="/" element={<Inicio />} />
                        <Route path="/documentacion" />
                        <Route path="/funcionarios" element={<Funcionario />} />
                        <Route path="/departamento" element={<Departamento />} />
                        <Route path="/organigrama" element={
                            <div className="row">
                                <div className="col-9">
                                    <Organigrama cargar={this.state.cargar} datos={this.state.datos} funcion={this.setEscribir} />
                                </div>
                                <div className="col-3">
                                    <OrganigramaProyecto name={this.state.name} />
                                </div>
                            </div>
                        } />
                    </Routes>
                </Router>
            </div>
        );
    }
}