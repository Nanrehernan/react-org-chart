import React, { Component, Fragment } from "react";

export default class FormDepartamento extends Component {
    constructor(props) {
        super(props)

        this.state = {
            departamento: "",
            idParent: "Principal"
        }
    }

    handleChangeDepartamento = (e) => {
        const { name, value } = e.target

        this.setState({
            ...this.state,
            [name]: value
        })
    }

    setDepartamento = (e) => {
        e.preventDefault()
        const url = "http://localhost:9000/api/departamento/insertar"

        let { departamento, idParent } = this.state.departamento

        if (idParent === "Principal") {
            idParent = 1
        }

        let formData = new FormData()
        formData.append("departamento", departamento)

        const xhttp = new XMLHttpRequest()
        xhttp.onload = () => {
            this.props.getDepartamento();
        }
        xhttp.open("post", url, true)
        xhttp.send(formData)

        e.target.reset()
    }
    render() {
        const { datos } = this.props;
        const {departamento, idParent} = this.state;

        return (
            <div className="card mt-2">
                <div className="card-head">
                    <h3 className="text-center text-primary">Registro de Departamento</h3>
                </div>

                <div className="card-body">
                    <form onSubmit={this.props.setDepartamento}>
                        <div className="form-group">
                            <label className="form-label">Departamento</label>
                            <input type="text" name="departamento" autoComplete="off" className="form-control" onChange={this.handleChangeDepartamento} value={departamento}/>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Supervisado por</label>
                            <select className="form-select" name="idParent" defaultValue={idParent} onChange={this.handleChangeDepartamento}>
                                <option value="Principal">Principal</option>
                                {
                                    datos.map(d => {
                                        return (
                                            <option key={d.id} value={d.id}>{d.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className="mt-4">
                            <input type="submit" className="btn btn-outline-success m-0 w-100" value="Guardar" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}