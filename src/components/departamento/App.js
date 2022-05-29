import { Component, Fragment } from "react"
import FormDepartamento from "./FormDepartamento"
import Organigrama from "../Org/Organigrama";

export default class Departamento extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cargar: false,
            datos: [],
            mensaje: "Sin datos para mostrar"
        }
    }

    getDepartamento = () => {
        this.setState({
            cargar: false,
            mensaje: "Cargando Datos. Espere..."
        })
        
        const url = "http://localhost:9000/api/departamento/listar"

        fetch(url)
            .then(response => response.json())
            .then(response => {
                const { mensaje, datos } = response

                if (mensaje === "Ok" && datos.length > 0) {
                    this.setState({
                        datos: datos,
                        cargar: true,
                    })
                }else{
                    this.setState({
                        mensaje: "Sin datos para Mostrar"
                    })
                }
            })
            .catch((error)=>{
                this.setState({
                    mensaje: "Ocurrio un error al obtener los datos"
                })
            })
    }

    componentDidMount() {
        this.getDepartamento()
    }

    render() {
        const { cargar, datos, mensaje } = this.state;

        return (
            <Fragment>
                <div className="row">
                    <div className="col-3">
                        <FormDepartamento datos={datos} getDepartamento={this.getDepartamento}/>
                    </div>

                    <div className="col-9">
                        <Organigrama cargar={cargar} datos={datos} mensaje={mensaje} handleInformacion={null} />
                    </div>
                </div>
            </Fragment>
        );
    }
}