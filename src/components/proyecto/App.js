import React, { Component } from "react"
import Organigrama from "../Org/Organigrama"
import Informacion from "./Informacion"

export default class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            org: {
                cargar: false,
                datos: [],
                mensaje: "Sin datos para cargar"
            },
            informacion:{
                id: "",
                name: "Departamento"
            }
        }
    }

    handleInformacion = (nodo)=>{
        const {name} = nodo.person
        const {id} = nodo

        this.setState({
            informacion:{
                id: id,
                name: name
            }
        })
    }

    render() {
        const {cargar, datos, mensaje} = this.state.org
        const informacion = this.state.informacion

        return (
            <div className="row">
                <div className="col-9">
                    <Organigrama cargar={cargar} datos={datos} mensaje={mensaje} handleInformacion={this.handleInformacion}/>
                </div>

                <div className="col-3">
                    <Informacion informacion={informacion} />
                </div>
            </div>
        )
    }
}