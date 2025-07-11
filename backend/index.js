import express from "express";
import chalk from "chalk";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

dotenv.config();
const dburi = process.env.MONGODB_URI;

const port = process.env.PORT;
const app = express();

import routerAPI from "./routes/index.js"
import User from "./models/UserModel.js";
import Agent from "./models/AgentModel.js";
import Rank from "./models/RankModel.js";

mongoose.connect(dburi);
const db = mongoose.connection;

db.on('error', (error) => { console.error( {error} ) } );
db.once('open', async () => { 
    console.log('Conexion con la Db Correcta')
    
    // Agregamos Agentes 
    const agentsToAdd = [
        { name: "Jett", image: "jett.webp", rol: "Duelista", descripcion: "Una duelista ágil de viento, capaz de desbordar con velocidad y letalidad." },
        { name: "Phoenix", image: "phoenix.webp", rol: "Duelista", descripcion: "Controla el fuego para atacar agresivamente y curarse a sí mismo." },
        { name: "Sage", image: "sage.webp", rol: "Centinela", descripcion: "Sanadora defensiva que puede revivir aliados y controlar áreas con muros." },
        { name: "Cypher", image: "cypher.webp", rol: "Centinela", descripcion: "Experto en vigilancia que atrapa y controla al enemigo con trampas y cámaras." },
        { name: "Sova", image: "sova.webp", rol: "Iniciador", descripcion: "Arquero rastreador que revela posiciones y elimina enemigos con precisión." },
        { name: "Killjoy", image: "killjoy.webp", rol: "Centinela", descripcion: "Ingeniera alemana que usa gadgets para controlar el mapa y detener avances." },
        { name: "Raze", image: "raze.webp", rol: "Duelista", descripcion: "Especialista en explosivos que causa daño masivo con sus habilidades." },
        { name: "Breach", image: "breach.webp", rol: "Iniciador", descripcion: "Agente que abre paso con explosiones sísmicas y aturdimientos." },
        { name: "Omen", image: "omen.webp", rol: "Controllador", descripcion: "Acechador sombrío que ciega enemigos y se teletransporta." },
        { name: "Viper", image: "viper.webp", rol: "Iniciador", descripcion: "Controla áreas con venenos tóxicos y pantallas químicas." },
        { name: "Brimstone", image: "brimstone.webp", rol: "Controllador", descripcion: "Líder táctico que despliega ataques orbitales y humos estratégicos." },
        { name: "Astra", image: "astra.webp", rol: "Controllador", descripcion: "Manipula el campo de batalla desde el plano astral con humos y pozos gravitacionales." },
        { name: "Yoru", image: "yoru.webp", rol: "Duelista", descripcion: "Infiltrador japonés que engaña y confunde con teletransportes y clones." },
        { name: "KAY/O", image: "kayo.webp", rol: "Iniciador", descripcion: "Robot diseñado para suprimir habilidades enemigas y facilitar el ataque." },
        { name: "Chamber", image: "chamber.webp", rol: "Centinela", descripcion: "Francotirador elegante que coloca trampas y elimina con precisión." },
        { name: "Neon", image: "neon.webp", rol: "Duelista", descripcion: "Sprinter eléctrica que cierra distancias con velocidad y descargas letales." },
        { name: "Skye", image: "skye.webp", rol: "Iniciador", descripcion: "Sanadora australiana que usa animales espirituales para explorar y cegar enemigos." },
        { name: "Harbor", image: "harbor.webp", rol: "Controllador", descripcion: "Usa agua para bloquear visión y empujar enemigos con paredes y cascadas." },
        { name: "Fade", image: "fade.webp", rol: "Iniciador", descripcion: "Cazadora turca que usa terrores y rastreadores para atrapar enemigos." },
        { name: "Gekko", image: "gekko.webp", rol: "Iniciador", descripcion: "Líder de criaturas que ayudan a capturar sitios y aturdir o desactivar." },
        { name: "Deadlock", image: "deadlock.webp", rol: "Centinela", descripcion: "Centinela noruega que controla el campo con barreras y trampas ultrasónicas." },
        { name: "Tejo", image: "tejo.webp", rol: "Iniciador", descripcion: "Agente experimental con habilidades para abrir sitio y revelar enemigos." },
        { name: "WayLay", image: "wayLay.webp", rol: "Duelista", descripcion: "Duelista agresivo con habilidades únicas para confundir y eliminar rivales." },
        { name: "Vyse", image: "vyse.webp", rol: "Centinela", descripcion: "Centinela táctico que protege zonas clave con dispositivos avanzados." },
        { name: "Clove", image: "clove.webp", rol: "Controllador", descripcion: "Controlador versátil capaz de alterar el terreno y dar ventaja al equipo." },
        { name: "Iso", image: "iso.webp", rol: "Duelista", descripcion: "Duelista implacable que crea duelos individuales con su habilidad definitiva." }    
    ];
    // Evitamos duplicados
    for (const agentData of agentsToAdd) {
        const exists = await Agent.findOne({ name: agentData.name });
        if (!exists) {
            await Agent.create(agentData);
            console.log(`Agente ${agentData.name} insertado!`);
        } else {
            console.log(`Agente ${agentData.name} ya existe, no se inserta.`);
        }
    }

    // Agregamos Rangos
    const ranksToAdd = [
        { name: "Bronce", image: "bronce.png" },
        { name: "Plata", image: "plata.png" },
        { name: "Oro", image: "oro.png" },
        { name: "Platino", image: "platino.png" },
        { name: "Diamante", image: "diamante.png" },
        { name: "Ascendente", image: "ascendente.png" },
        { name: "Inmortal", image: "inmortal.png" },
        { name: "Radiante", image: "radiante.png" },
    ];

    // Evitamos duplicados
    for (const rankData of ranksToAdd) {
        const exists = await Rank.findOne({ name: rankData.name });
        if (!exists) {
            await Rank.create(rankData);
            console.log(`Rango ${rankData.name} insertado!`);
        } else {
            console.log(`Rango ${rankData.name} ya existe, no se inserta.`);
        }
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(cors({origin: "http://localhost:5173"}));

routerAPI(app);


app.listen( port, () => {
    console.log(   chalk.green(`Servidor Web en el puerto ${port}`) );
});