const server = require('./server');
require('dotenv').config();
require('./database');

async function main() {
    await server.listen(server.get('port'));
    console.log("Server running on port " + server.get('port'));
}

main();