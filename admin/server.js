const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();
const compression = require('compression')
const routes = require('./routes');
const handler = routes.getRequestHandler(app);
app.prepare()
    .then(() => {
        const server = express();
        server.use(compression());
        server.use(handler);
        server.use(function (req, res, next) {
            if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
                const secureUrl = "https://" + req.headers['host'] + req.url;
                res.writeHead(301, { "Location": secureUrl });
                res.end();
            }
            next();
        });
        server.get('*', (req, res) => {
            return handle(req, res)
        })
        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`Listening on port ${port}...`);
        });
    }).catch(err => {
        console.error(err.stack)
        process.exit(1)
    })