const app = require("./src/app");

// chay server 
const PORT = ||3055

const server = app.listen(PORT, ()=> {
    console.log(`WSB eCommerce start with${PORT}`);
    
})

process.on('SIGINT',()=> {
    server.close(() => console.log("Exit Server Express"))
})

