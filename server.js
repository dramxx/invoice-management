const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth/auth');
const companyRoute = require('./routes/company');
const customerRoute = require('./routes/customer');

/**
 * Launch server
 */
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`SERVER RUNNING AT ${PORT}`));

/**
 * Connect to the database
 */
mongoose.connect(
    process.env.DB_CONNECT,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log(`CONNECTED TO DATABASE`),
);

/**
 * Middleware
 *
 * disabling cors
 * using Json output
 */
app.use(express.json(), cors());

/**
 * Routes
 *
 * authentication ( login, register )
 * companies ( create company, list all companies )
 * customers ( create user, list all users )
 */
app.use('/api/users', authRoute);
app.use('/api/companies', companyRoute);
app.use('/api/customers', customerRoute);
