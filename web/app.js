const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const porta = 5000;


// Chamada de rotas --------------------
const userRota = require("./src/routers/user");




// Configurações -----------------------
app.use(express.json());
app.use(express.urlencoded({extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());



// Criação de Rotas --------------------
app.use("/user", userRota);






// Iniciar servidor --------------------
app.listen(porta, () => {
    console.log(`http://localhost:${porta}/`)
})

