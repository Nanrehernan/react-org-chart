const express = require("express");
const mysql = require("mysql");
const myconnection = require("express-myconnection");
const cors = require("cors");
const fileupload = require("express-fileupload");
const dboptions = require("./dboptions");
const path = require("path");

const app = express();
app.set("port", process.env.PORT || 9000);

app.use(express.json());
app.use(fileupload());
app.use(cors({ origin: "*" }));
app.use(myconnection(mysql, dboptions, "single"));
app.use(express.static(path.join(__dirname, "build")))

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "build", "index.html"))
});

// Departamento
app.get("/departamento/listar", (req, res)=>{
    let respuesta = {
        mensaje: "",
        datos: []
    }

    req.getConnection((error, conexion)=>{
        if (error){
            respuesta.mensaje = error.mensaje
            return res.json(respuesta)
        }

        const query = "select id, descripcion as name, id_parent as idParent from departamento"
        conexion.query(query, (error, row)=>{
            if (error){
                respuesta.mensaje = error.mensaje
                return res.json(respuesta)
            }

            respuesta = {
                mensaje: "Ok",
                datos: row
            }

            res.json(respuesta);
        })
    })
})

app.post("/departamento/insertar", (req, res)=>{
    const {departamento, idParent} = JSON.parse(req.body.departamento)

    let respuesta = {
        mensaje: ""
    }

    req.getConnection((error, conexion)=>{
        if (error){
            respuesta.mensaje = error.mensaje
            return res.json(respuesta)
        }

        const query = "insert into departamento(descripcion, id_parent) values(?, ?)"
        conexion.query(query, [departamento, idParent], (error, row)=>{
            if (error){
                respuesta.mensaje = error.mensaje
                return res.json(respuesta)
            }

            respuesta = {
                mensaje: "Ok"
            }

            res.json(respuesta)
        })
    })
})

// Funcionario
app.get("/funcionario/listar", (req, res)=>{
    let respuesta = {
        mensaje: "",
        datos:[]
    }
    
    req.getConnection((error, conexion)=>{
        if (error){
            respuesta.mensaje = error.mensaje
            return res.json(respuesta)
        }

        const query = "select f.id as id, f.nombre as nombre, d.descripcion as departamento, f.cargo as cargo, f.fechaInicio as fechaInicio from funcionario as f join departamento as d on f.idDepartamento=d.id"
        conexion.query(query, (error, row)=>{
            if (error){
                respuesta.mensaje = error.mensaje
                return res.json(respuesta)
            }

            respuesta = {
                mensaje: "Ok",
                datos: row
            }

            res.json(respuesta);
        })
    });
})

app.get("/funcionario/listar/:id", (req, res)=>{
    const {id} = req.params
    let respuesta = {
        mensaje: "",
        datos:[]
    }
    
    req.getConnection((error, conexion)=>{
        if (error){
            respuesta.mensaje = error.mensaje
            return res.json(respuesta)
        }

        const query = "select f.id as id, f.nombre as nombre, d.descripcion as departamento, f.cargo as cargo, f.fechaInicio as fechaInicio from funcionario as f join departamento as d on f.idDepartamento=d.id where d.id=?"
        conexion.query(query, [id], (error, row)=>{
            if (error){
                respuesta.mensaje = error.mensaje
                return res.json(respuesta)
            }

            respuesta = {
                mensaje: "Ok",
                datos: row
            }

            res.json(respuesta);
        })
    });
})

app.post("/funcionario/insertar", (req, res)=>{
    const {nombre, cargo, fechaInicio, departamento} = JSON.parse(req.body.funcionario);

    let respuesta = {
        mensaje: ""
    }

    req.getConnection((error, conexion)=>{
        if (error){
            respuesta.mensaje = error.mensaje
            return res.json(respuesta)
        }

        const query = "insert into funcionario(nombre, cargo, fechaInicio, idDepartamento)values(?, ?, ?, ?)";
        conexion.query(query, [nombre, cargo, fechaInicio, departamento], (error, row)=>{
            if (error){
                respuesta.mensaje = error.mensaje
                return res.json(respuesta)
            }

            respuesta = {
                mensaje: "Ok"
            }

            res.json(respuesta)
        })
    })
})

// Proyecto
app.get("/proyecto/listar/:id", (req, res)=>{
    const {id} = req.params;

    let respuesta = {
        mensaje: "",
        datos: []
    }

    req.getConnection((error, conexion)=>{
        if (error){
            respuesta.mensaje = error.mensaje;
            return res.json(respuesta)
        }

        const query = "select p.id as id, p.nombre as nombre, p.descripcion as descripcion, p.fechaInicio as fechaInicio from proyecto as p join departamento as d on p.id_departamento=d.id";
        conexion.query(query, (error, row)=>{
            if (error){
                respuesta.mensaje = error.mensaje;
                return res.json(respuesta)
            }

            respuesta = {
                mensaje: "Ok",
                datos: row
            }

            res.json(respuesta);
        })
    })
})

app.post("/proyecto/insertar/:id", (req, res)=>{
    const {id} = req.params;
    const {nombre, descripcion, fechaInicio} = JSON.parse(req.body.proyecto);

    let respuesta = {
        mensaje: ""
    }

    req.getConnection((error, conexion)=>{
        if (error){
            respuesta = {
                mensaje: error.mensaje
            }

            return res.json(respuesta);
        }

        const query = "insert into proyecto(nombre, descripcion, fechaInicio, id_departamento)values(?, ?, ?, ?)";
        conexion.query(query, [nombre, descripcion, fechaInicio, id], (error, row)=>{
            if (error){
                respuesta = {
                    mensaje: error.mensaje
                }
    
                return res.json(respuesta)
            }

            respuesta = {
                mensaje: "Ok"
            }

            res.json(respuesta);
        })
    })
})

app.listen(app.get("port"), ()=>{
    console.log(`App Running in port ${app.get("port")}`);
});