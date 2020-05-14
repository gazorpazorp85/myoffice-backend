const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const authRoutes = require('./api/auth/auth.routes');
const connectSockets = require('./api/socket/socket.routes');
const boardRoutes = require('./api/board/board.routes');
const userRoutes = require('./api/user/user.routes');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'iaghbvj48789rjnckv',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

app.use('/api/auth', authRoutes);
app.use('/api/board', boardRoutes);
app.use('/api/user', userRoutes);
app.get('/*', function(req,res) {
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
});
connectSockets(io);

const logger = require('./services/logger.service');
const port = process.env.PORT || 3030;
http.listen(port, ()=> {
    logger.info('Server is running on port: ' + port)
});