const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: false,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  
  });

const NodeFactory = sequelize.define('node', {
    title: {
      type: Sequelize.STRING,
      notNull: true,
      isAlphanumeric: true
    },
    id: {
      type: Sequelize.UUID,
      notNull: true,
      primaryKey: true
    },
    childrenCount:{
        type: Sequelize.INTEGER,
        isInt: true,
        notNull: true
    },
    rangeHigh:{
        type: Sequelize.INTEGER,
        notNull: true,
        isInt: true
    },
    rangeLow:{
        type: Sequelize.INTEGER,
        notNull: true,
        isInt: true
    },
    children:{
        type: Sequelize.JSON,
        allowNull: false
    }
  });
  
//   Uncomment the below to create your table and inject a sample row
//   NodeFactory.sync({force: false}).then(() => {
//     // Table created
//     return NodeFactory.create({
//         "title": "Example Node",
//         "id": "5c056641-5903-4e0c-b98f-7938aaa0f5f6",
//         "childrenCount": 5,
//         "rangeHigh": 4534,
//         "rangeLow": 23,
//         "children":[34, 343, 1232, 454]
//     });
//   });

module.exports = NodeFactory;