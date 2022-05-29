import React, { Component } from "react"
import OrgChart from "../../lib/react/org-chart"

export default class Organigrama extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cargar: props.cargar,
            tree: this.getNodoPrincipal(),
            downloadingChart: false,
            config: {},
            highlightPostNumbers: [1]
        }
    }

    getNodoPrincipal = () => {
        const datos = this.props.datos;
        let persona = {};

        for (let p of datos) {
            if (p.id === p.idParent) {
                persona = p;
                break;
            }
        }

        let nodo = {
            id: persona.id,
            person: {
                avatar: null,
                departament: null,
                name: persona.name,
                title: null,
                totalReports: this.getTotalReport(persona.id),
            },
            hasChild: (this.getTotalReport(persona.id) > 0) ? true : false,
            hasParent: (persona.id === persona.idParent) ? false : true,
            children: [],
        };

        return nodo;
    }

    getChild = (id) => {
        const datos = this.props.datos;
        let hijos = [];

        for (let p of datos) {
            if (p.id !== p.idParent) {
                if (p.idParent === id) {
                    let nodo = {
                        id: p.id,
                        person: {
                            avatar: null,
                            departament: null,
                            name: p.name,
                            title: null,
                            totalReports: this.getTotalReport(p.id),
                        },
                        hasChild: (this.getTotalReport(p.id) > 0) ? true : false,
                        hasParent: (p.id === p.idParent) ? false : true,
                        children: [],
                    }

                    hijos.push(nodo);
                }
            }
        }

        return hijos;
    }

    getTotalReport = (id) => {
        const datos = this.props.datos;
        let totalReport = 0;
        for (let p of datos) {
            if (p.id !== p.idParent) {
                if (p.idParent === id) {
                    totalReport++;
                }
            }
        }

        return totalReport;
    }

    handleDownload = () => {
        this.setState({ downloadingChart: false })
    }

    handleOnChangeConfig = config => {
        this.setState({ config: config })
    }

    handleLoadConfig = () => {
        const { config } = this.state
        return config
    }

    componentDidUpdate(props, state) {
        if (this.props !== props) {
            this.setState({
                tree: this.getNodoPrincipal(),
                cargar: this.props.cargar
            });
        }
    }

    render() {
        const { mensaje } = this.props
        const { cargar, tree, downloadingChart } = this.state;
        //For downloading org chart as image or pdf based on id
        const downloadImageId = 'download-image';
        const downloadPdfId = 'download-pdf';

        if (cargar) {
            return (
                <OrgChart
                    handleInformacion={this.props.handleInformacion}
                    tree={tree}
                    downloadImageId={downloadImageId}
                    downloadPdfId={downloadPdfId}
                    onConfigChange={config => {
                        this.handleOnChangeConfig(config)
                    }}
                    loadConfig={d => {
                        let configuration = this.handleLoadConfig(d)
                        if (configuration) {
                            return configuration
                        }
                    }}
                    downlowdedOrgChart={d => {
                        this.handleDownload()
                    }}
                    loadImage={d => {
                        return Promise.resolve(avatarPersonnel)
                    }}
                    loadChildren={d => {
                        const childrenData = this.getChild(d.id)
                        return childrenData
                    }}
                />
            )
        } else {
            return <p>{mensaje}</p>
        }
    }
}