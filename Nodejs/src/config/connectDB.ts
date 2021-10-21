import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USERNAME || '',
  process.env.DB_PASSWORD || '',
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  },
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectDB;
