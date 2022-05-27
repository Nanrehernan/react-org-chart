import { Component, Fragment } from "react";

export default class Departamento extends Component{
    constructor(props){
        super(props);

        this.state = {
            departamento: "",
            datos: []
        }
    }

    componentDidMount(){
        this.getDepartamento();
    }

    getDepartamento = ()=>{
        const xhttp = new XMLHttpRequest();
        xhttp.onload = () => {
            const {mensaje, datos} = JSON.parse(xhttp.response);

            if (mensaje === "Ok"){
                this.setState({
                    datos: datos
                })
            }
        }
        xhttp.open("get", "http://localhost:9000/departamento/", true);
        xhttp.send();
    }

    setDepartamento = (e) =>{
        e.preventDefault();
        const {departamento} = this.state;

        if (departamento === ""){
            return alert("Departamento no pude ser vacio")
        }

        let formData = new FormData();
        formData.append("departamento", departamento);

        const xhttp = new XMLHttpRequest();
        xhttp.onload = () => {
            const {mensaje} = JSON.parse(xhttp.response);

            if (mensaje === "Insertado"){
                this.setState({
                    departamento: ""
                });

                this.getDepartamento();
            }
        }
        xhttp.open("post", "http://localhost:9000/departamento/insertar", true);
        xhttp.send(formData);
    }

    handleOnChange = (e) =>{
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    }

    render(){
        return (
            <Fragment>
                <div className="row">
                    <div className="col-3">
                        <div className="card mt-2">
                            <div className="card-head">
                                <h3 className="text-center text-primary">Registro de Departamento</h3>
                            </div>

                            <div className="card-body">
                                <form onSubmit={this.setDepartamento}>
                                    <div className="form-group">
                                        <label className="form-label">Departamento</label>
                                        <input type="text" name="departamento" autoComplete="off" className="form-control" value={this.state.departamento} onChange={this.handleOnChange}/>
                                    </div>

                                    <div className="mt-2">
                                        <input type="submit" className="btn btn-outline-success w-100" value="Guardar"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-9">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Departamento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.datos.map(d => {
                                        return (
                                            <tr key={d.id}>
                                                <td>{d.id}</td>
                                                <td>{d.descripcion}</td>
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