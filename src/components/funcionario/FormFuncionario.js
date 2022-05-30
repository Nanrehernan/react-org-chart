import React, { Component } from "react"

export default class FormFuncionario extends Component {
    constructor(props) {
        super(props)

        this.state = {
            funcionario: {
                id: "",
                nombre: "",
                departamento: "Principal",
                cargo: "",
                fechaInicio: ""
            },
            datos: []
        }
    }
    handleChangeState = (e) => {
        const { name, value } = e.target;

        this.setState({
            funcionario: {
                ...this.state.funcionario,
                [name]: value
            }
        });
    }

    setFuncionario = (e) => {
        e.preventDefault();

        const { departamento } = this.state.funcionario;

        const url = "http://localhost:9000/funcionario/insertar";

        if (departamento === "Principal") {
            alert("Seleccione un Departamento");
            return;
        }

        const formData = new FormData();
        formData.append("funcionario", JSON.stringify(this.state.funcionario));

        fetch(url, { method: "post", body: formData })
            .then(response => response.json())
            .then(response => {
                const { mensaje } = response;

                if (mensaje === "Ok"){
                    this.props.getFuncionario();
                }
            })

        this.resetForm();
    }

    resetForm = () => {
        this.setState({
            funcionario: {
                id: "",
                nombre: "",
                departamento: "Principal",
                cargo: "",
                fechaInicio: ""
            }
        });
    }

    getDepartamento = () => {
        const url = "http://localhost:9000/departamento/listar"

        fetch(url)
            .then(response => response.json())
            .then(response => {
                const { mensaje, datos } = response

                if (mensaje === "Ok" && datos.length > 0) {
                    this.setState({
                        datos: datos
                    })
                }
            })
    }

    componentDidMount() {
        this.getDepartamento();
    }

    render() {
        const { nombre, departamento, cargo, fechaInicio } = this.state.funcionario
        const { datos } = this.state;

        return (
            <div className="card" style={{ position: "sticky", top: "45px" }}>
                <div className="card-head">
                    <h4 className="text-center">Registro de Funcionarios</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={this.setFuncionario}>
                        <div className="form-group">
                            <label className="form-label">Nombre y Apellido</label>
                            <input type="text" name="nombre" className="form-control" onChange={this.handleChangeState} value={nombre} autoComplete="off"/>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Departamento</label>
                            <select className="form-select" name="departamento" value={departamento} onChange={this.handleChangeState}>
                                <option value="Principal">Seleccione un Departamento</option>
                                {
                                    datos.map(d => {
                                        return (
                                            <option key={d.id} value={d.id}>{d.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Cargo</label>
                            <input type="text" name="cargo" className="form-control" onChange={this.handleChangeState} value={cargo} autoComplete="off"/>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Fecha de Inicio</label>
                            <input type="date" name="fechaInicio" className="form-control" onChange={this.handleChangeState} value={fechaInicio} />
                        </div>

                        <div className="form-group mt-4">
                            <input type="submit" value="Guardar" className="btn btn-outline-success m-0 w-100" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}