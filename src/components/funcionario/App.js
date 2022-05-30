import React, { Component, Fragment } from "react"
import FormFuncionario from "./FormFuncionario"
import TablaFuncionario from "./TablaFuncionario"

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            datos: []
        }
    }

    getFuncionario = () => {
        const url = "http://localhost:9000/funcionario/listar"

        fetch(url)
            .then(response => response.json())
            .then(response => {
                const { mensaje, datos } = response

                if (mensaje === "Ok") {
                    this.setState({
                        datos: datos
                    })
                } 
            })
    }

    componentDidMount() {
        this.getFuncionario();
    }

    render() {
        const { datos } = this.state;

        return (
            <Fragment>
                <div className="row">
                    <div className="col-3">
                        <FormFuncionario getFuncionario={this.getFuncionario} />
                    </div>
                    <div className="col-9">
                        <h4 className="text-center text-primary">Lista de Funcionarios</h4>
                        <TablaFuncionario datos={datos} />
                    </div>
                </div>
            </Fragment>
        )
    }
}