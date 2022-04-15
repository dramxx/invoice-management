const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.get('/api', (req, res) => {
  res.json({message: 'hello from server'});
});

app.listen(PORT, () => console.log(`SERVER RUNNING AT ${PORT}`));
