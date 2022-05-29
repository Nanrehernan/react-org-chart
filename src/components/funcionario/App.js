import React, {Component, Fragment} from "react"
import FormFuncionario from "./FormFuncionario"
import TablaFuncionario from "./TablaFuncionario"

export default class App extends Component{
    constructor(props){
        super(props)

        this.state ={
            datos: []
        }
    }
    getFuncionario = ()=>{
        const url = "http://localhost:9000/api/funcionario/listar"

        const xhttp = new XMLHttpRequest();
        xhttp.onload = ()=>{
            const {datos} = JSON.parse(xhttp.response);
            
            this.setState({
                datos: datos
            });
        };
        xhttp.open("get", url, true);
        xhttp.send();
    }

    componentDidMount(){
        this.getFuncionario();
    }

    render(){
        const {datos} = this.state;

        return (
            <Fragment>
                <div className="row">
                    <div className="col-3">
                        <FormFuncionario getFuncionario={this.getFuncionario}/>
                    </div>
                    <div className="col-9">
                        <h4>Lista de Funcionarios</h4>
                        <TablaFuncionario datos={datos}/>
                    </div>
                </div>
            </Fragment>
        )
    }
}