import { Component, Fragment } from "react";

export default class Formulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            funcionario: {
                id: 0,
                nombre: "",
                departamento: "",
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
            },
        });
    }

    handleClickInsert = () => {
        if (this.state.funcionario.id === 0) {
            this.setFuncionario();
        } else {
            this.updateFuncionario();
        }
    }

    setFuncionario = () => {
        let formData = new FormData();
        formData.append("funcionario", JSON.stringify(this.state.funcionario));

        const xhttp = new XMLHttpRequest();
        xhttp.onload = () => {
            const datos = JSON.parse(xhttp.response);
            this.setState({
                datos: datos
            });
        }
        xhttp.open("post", "http://localhost:9000/funcionario/insertar", true);
        xhttp.send(formData);
    }

    updateFuncionario = () => {

    }

    getFuncionario = () => {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = () => {
            const datos = JSON.parse(xhttp.response);
            this.setState({
                datos: datos
            });
        }
        xhttp.open("get", "http://localhost:9000/funcionario", true);
        xhttp.send();
    }

    componentDidMount() {
        this.getFuncionario();
    }

    render() {
        return (
            <Fragment>
                <h3 className="text-center text-primary">Seccion de Funcionarios</h3>
                <div className="row">
                    <div className="col-3">
                        <div className="card" style={{ position: "sticky", top: "45px" }}>
                            <div className="card-head">
                                <h4 className="text-center">Registro de Funcionarios</h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label className="form-label">Nombre y Apellido</label>
                                        <input type="text" name="nombre" className="form-control" onChange={this.handleChangeState} value={this.state.funcionario.nombre} />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Departamento</label>
                                        <input type="text" name="departamento" className="form-control" onChange={this.handleChangeState} value={this.state.funcionario.departamento} />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Profesion</label>
                                        <input type="text" name="cargo" className="form-control" onChange={this.handleChangeState} value={this.state.funcionario.cargo} />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Fecha de Inicio</label>
                                        <input type="date" name="fechaInicio" className="form-control" onChange={this.handleChangeState} value={this.state.funcionario.fechaInicio} />
                                    </div>

                                    <div className="mt-2">
                                        <input type="button" value="Guardar" className="btn btn-success w-100" onClick={this.handleClickInsert} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <h4 className="text-center">Lista de Funcionarios</h4>
                        <table className="table table-bordered text-center">
                            <thead style={{ position: "sticky", top: "41px" }}>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre y Apellido</th>
                                    <th>Departamento</th>
                                    <th>Cargo</th>
                                    <th>Fecho de Inicio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.datos.map(f => {
                                        return (
                                            <tr key={f.id}>
                                                <td>{f.id}</td>
                                                <td>{f.nombre}</td>
                                                <td>{f.departamento}</td>
                                                <td>{f.cargo}</td>
                                                <td style={{ width: 100 }}>{f.fechaInicio}</td>
                                                <td style={{ width: 100 }}>
                                                    <button className="btn btn-outline-warning">Update</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Fragment>
        );
    }
}