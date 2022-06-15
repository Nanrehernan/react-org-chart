import React, { Component, Fragment } from "react";
import NuevoProyecto from "./NuevoProyecto";

export default class Informacion extends Component {
    constructor(props) {
        super(props)

        this.state = {
            funcionario: [],
            proyecto: []
        }
    }

    resetState = ()=>{
        this.setState({
            funcionario: [],
            proyecto: []
        })
    }

    getFuncionario = (idDepartamento) => {
        const url = `http://localhost:9000/funcionario/listar/${idDepartamento}`

        fetch(url)
            .then(response => response.json())
            .then(response => {
                const { mensaje, datos } = response

                if (mensaje === "Ok") {
                    this.setState({
                        ...this.state,
                        funcionario: datos
                    })
                }
            })
    }

    getProyecto = (idDepartamento) => {
        const url = `http://localhost:9000/proyecto/listar/${idDepartamento}`

        fetch(url)
            .then(response => response.json())
            .then(response => {
                const { mensaje, datos } = response

                if (mensaje === "Ok") {
                    this.setState({
                        ...this.state,
                        proyecto: datos
                    })
                }
            })
    }

    componentDidUpdate(props, state) {
        if (props !== this.props) {
            const { id } = this.props.informacion

            if (!(id === "")) {
                this.getFuncionario(id);
                this.getProyecto(id);
            }
        }
    }

    render() {
        const { id, name } = this.props.informacion
        const { funcionario, proyecto } = this.state

        return (
            <Fragment>
                <div className="card mt-2">
                    <h4 className="text-center mt-3">{name}</h4>

                    <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingOne">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    Funcionarios <span className="text-primary" style={{marginLeft: "10px"}}>({funcionario.length})</span>
                                </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    <ul>
                                        {
                                            funcionario.map(f => {
                                                return (
                                                    <li key={f.id}>{f.nombre} {" "}({f.cargo})</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                    Proyectos <span className="text-primary" style={{marginLeft: "10px"}}>({proyecto.length})</span>
                                </button>
                            </h2>
                            <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    {
                                        proyecto.map(p => {
                                            let fecha = new Date(p.fechaInicio);
                                            const day = fecha.toLocaleString("es", {day: "numeric"})
                                            const month = fecha.toLocaleString("es", {month: "short"})
                                            const year = fecha.toLocaleString("es", {year: "numeric"})
                                            const weekday = fecha.toLocaleString("es", {weekday: "short"})
                                            //let fechaActual = new Date();

                                            //fecha = fechaActual - fecha;
                                            //fecha =  Math.floor(fecha / (1000 * 60 * 60 * 24))
                                            
                                            return (
                                                <div className="card mb-3" key={p.id}>
                                                    <div className="card-body">
                                                        <p><span style={{textDecoration: "underline"}}>Proyecto:</span> <span className="text-uppercase" style={{fontWeight: "bold"}}>{p.nombre}</span></p>
                                                        <p><span style={{textDecoration: "underline"}}>Fecha Inicio:</span> {weekday + "," + day + "," + month + "," + year}</p>
                                                        <p><span style={{textDecoration: "underline"}}>Descripcion:</span> {p.descripcion}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingThree">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                    Nuevo Proyecto
                                </button>
                            </h2>
                            <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    <NuevoProyecto idDepartamento={id} getProyecto={this.getProyecto}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}