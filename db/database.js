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
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true,
        native: true
    }
});

export default connection;