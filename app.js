const express = require('express');
const path = require('path');

const router = require('./routes');

const app = express();
const port = 4000;

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/public`));

router(app);

app.listen(port,  () => {
    console.log(`App listening on port ${port}`);
});
