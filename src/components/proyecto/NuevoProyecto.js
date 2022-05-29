import React, {Component, Fragment} from "react"

export default class NuevoProyecto extends Component{
    render(){
        return (
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label className="form-label">Nombre del Proyecto</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label>Departamento</label>
                            <select className="form-select">
                                <option value="1">CEO</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Fecha de Inicio</label>
                            <input type="date" className="form-control"></input>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}