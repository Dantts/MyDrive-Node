const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');

const bd = require('./models');
const {checkFilesAccess} = require('./middlewares/FilesAccessMiddleware');

const app = express();

const authController = require('./controllers/authController');
const usersController = require('./controllers/usersController');
const filesController = require('./controllers/filesController');
const foldersController = require('./controllers/foldersController');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(helmet());
app.use("/files", checkFilesAccess, express.static(path.resolve(__dirname, "..", "temp", "uploads")));

app.use('/api/auth', authController);
app.use('/api/users', usersController);
app.use('/api/files', filesController);
app.use('/api/folders', foldersController);

bd.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Listenning on port 3001');
    })
})