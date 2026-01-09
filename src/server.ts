import app from "./app";
import AppDataSource from "./config/datasource";

const PORT_DEFAULT = 3000;

app.listen(PORT_DEFAULT,'0.0.0.0', async () => { 
    console.log(`El servidor se esta ejecutando en el puerto ${PORT_DEFAULT}`);
    await AppDataSource.initialize();
    console.log('Se ha conectado a la base de datos');
} );
