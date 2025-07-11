import usersRouter from "./usersRouter.js";
import agentsRouter from "./agentsRouter.js";
import ranksRouter from "./ranksRouter.js";

function routerAPI( app ){
    console.log('Rutas')
    // Definimos cada
    app.use('/api/users', usersRouter );
    app.use('/api/agents', agentsRouter );
    app.use('/api/ranks', ranksRouter );

}

export default routerAPI;