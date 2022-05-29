import React, { Component } from "react"

export default class FormFuncionario extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: "",
            nombre: "",
            departamento: "",
            cargo: "",
            fechaInicio: ""
        }
    }
    handleChangeState = (e) => {
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        });
    }

    setFuncionario = (e)=>{
        e.preventDefault();

        const url = "http://localhost:9000/api/funcionario/insertar";

        const formData = new FormData();
        formData.append("funcionario", JSON.stringify(this.state));

        const xhttp = new XMLHttpRequest();
        xhttp.onload = ()=>{
            //this.props.getFuncionario();
        };
        xhttp.open("post", url, true);
        xhttp.send(formData);
        e.target.reset();
    }

    render() {
        const { nombre, departamento, cargo, fechaInicio } = this.state

        return (
            <div className="card" style={{ position: "sticky", top: "45px" }}>
                <div className="card-head">
                    <h4 className="text-center">Registro de Funcionarios</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={this.setFuncionario}>
                        <div className="form-group">
                            <label className="form-label">Nombre y Apellido</label>
                            <input type="text" name="nombre" className="form-control" onChange={this.handleChangeState} value={nombre} />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Departamento</label>
                            <input type="text" name="departamento" className="form-control" onChange={this.handleChangeState} value={departamento} />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Profesion</label>
                            <input type="text" name="cargo" className="form-control" onChange={this.handleChangeState} value={cargo} />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Fecha de Inicio</label>
                            <input type="date" name="fechaInicio" className="form-control" onChange={this.handleChangeState} value={fechaInicio} />
                        </div>

                        <div className="form-group mt-4">
                            <input type="submit" value="Guardar" className="btn btn-outline-success m-0 w-100"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}