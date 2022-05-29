import React, { Component } from "react"

export default class TablaFuncionario extends Component {
    render() {
        const {datos} = this.props

        return (
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
                        datos.map(f => {
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
        )
    }
}