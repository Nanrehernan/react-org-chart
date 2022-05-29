const express = require("express");
const mysql = require("mysql");
const myconnection = require("express-myconnection");
const cors = rquire("cors");
const Routes = require("./Routes");
const {dboptions} = require("./dboptions")

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(myconnection(mysql, dboptions, "single"));
app.use("/", Routes);

app.get("/", (req, res)=>{
    res.send("Hello");
});

app.listen(app.get("port"), ()=>{
    console.log(`App Running in port ${app.get("port")}`);
});