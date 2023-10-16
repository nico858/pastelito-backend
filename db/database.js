import { Sequelize  } from 'sequelize';

import { config } from '.././src/config/config.js';

// const connection = new Sequelize(
//     config.dbName,
//     config.dbUser,
//     config.dbPassword,
//     {
//         host: config.dbHost,
//         dialect: 'postgres',
//         logging: false,
//         ssl: true,
//         native: true,
//     }
// );

const connection = new Sequelize(config.dbLink, {
    // linking to the dockerized database container, which is named 'db'
    // not tested yet
    host: 'db',
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true,
        native: true
    }
});

export default connection;