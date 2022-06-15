import React, {Component, Fragment} from "react"

export default class NuevoProyecto extends Component{
    constructor(props){
        super(props)

        this.state = {
            nombre: "",
            fechaInicio: "",
            descripcion: ""
        }
    }

    handleChangeState = (e)=>{
        const {name, value} = e.target

        this.setState({
            ...this.state,
            [name]: value
        })
    }

    setProyecto = (e)=>{
        e.preventDefault();
        const {idDepartamento} = this.props;
        if (idDepartamento === ""){
            alert("Selecciona el Departamento");
            return;
        }
        
        const url = `http://localhost:9000/proyecto/insertar/${idDepartamento}`;
        const {nombre, fechaInicio, descripcion} = this.state;
        
        if (nombre === "" || fechaInicio === "" || descripcion === ""){
            alert("No deje campos vacios");
            return;
        }

        const formData = new FormData();
        formData.append("proyecto", JSON.stringify(this.state));

        fetch(url, {method: "post", body: formData})
        .then(response => response.json())
        .then(response => {
            const {mensaje} = response

            if (mensaje === "Ok"){
                this.props.getProyecto(idDepartamento);
            }
        })

        this.formReset();
    }

    formReset = ()=>{
        this.setState({
            nombre: "",
            fechaInicio: "",
            descripcion: ""
        })
    }

    render(){
        const {nombre, fechaInicio, descripcion} = this.state

        return (
            <div className="card">
                <div className="card-body">
                    <form onSubmit={this.setProyecto}>
                        <div className="form-group">
                            <label className="form-label">Nombre del Proyecto</label>
                            <input type="text" name="nombre" className="form-control" onChange={this.handleChangeState} value={nombre}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Fecha de Inicio</label>
                            <input type="date" name="fechaInicio" className="form-control" onChange={this.handleChangeState} value={fechaInicio}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Descripcion</label>
                            <textarea className="form-control" name="descripcion" rows="3" onChange={this.handleChangeState} value={descripcion}></textarea>
                        </div>

                        <div className="form-group mt-3">
                            <input type="submit" value="Guardar" className="btn btn-outline-success m-0 w-100"></input>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}