const app = require("./src/app");

const server = app.listen(3055, ()=>{
    console.log(`Welcome ${PORT}`)
})

process.on('SIGINT', () => {
    server.close(()=>console.log(`exit`))
    app.notify
})