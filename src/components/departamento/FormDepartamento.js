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
        const url = "http://localhost:9000/departamento/insertar"
        const {datos} = this.props;
        const {idParent} = this.state;

        if (datos.length > 0 && idParent === "Principal"){
            alert("El Nodo Principal ya fue definido");
            return;
        }else if(datos.length === 0 && idParent === "Principal"){
            this.setState({
                ...this.state,
                idParent: 1
            })
        }

        const departamento = this.state;

        let formData = new FormData()
        formData.append("departamento", JSON.stringify(departamento))

        fetch(url, {method: "post", body: formData})
        .then(response => response.json())
        .then(response =>{
            const {mensaje, datos} = response

            if (mensaje === "Ok"){
                this.props.getDepartamento();
                this.formReset();
            }
        })

        
    }

    formReset = ()=>{
        this.setState({
            departamento: "",
            idParent: "Principal"
        })
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
                    <form onSubmit={this.setDepartamento}>
                        <div className="form-group">
                            <label className="form-label">Departamento</label>
                            <input type="text" name="departamento" autoComplete="off" className="form-control" onChange={this.handleChangeDepartamento} value={departamento}/>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Supervisado por</label>
                            <select className="form-select" name="idParent" value={idParent} onChange={this.handleChangeDepartamento}>
                                <option value="Principal">Nodo Principal</option>
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