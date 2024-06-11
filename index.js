const net = require('node:net');

async function findPort (desiredPort) {
    const server = net.createServer();

    function listen (port) {
        return new Promise((resolve, reject) => {
            server.listen(port, () => {
                const port = server.address();
                resolve(port);
            });
            server.on('error', reject);
        })
     }

     try {
        const port = await listen(desiredPort)
        server.close();
        return port;
     } catch (error) {
        if(error.code === 'EADDRINUSE'){
            server.close()
            return await findPort();
        } else throw error
     }
} 

module.exports = { findPort }
