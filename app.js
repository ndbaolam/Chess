const express = require('express');
const { Chess } = require('chess.js');

const controller = require('./controllers/index.controller');

const app = express();
const port = 4000;

app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'pug');

app.locals.Chess = Chess;

app.get('/', (req, res) => {
    res.render(`${__dirname}/index.pug`, {Chess: Chess});
});

app.patch('/:from/:to/:piece', controller.index);

app.listen(port,  () => {
    console.log(`App listening on port ${port}`);
});
