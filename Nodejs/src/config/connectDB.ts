import { Sequelize } from 'sequelize';

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('luudangpho', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectDB;
