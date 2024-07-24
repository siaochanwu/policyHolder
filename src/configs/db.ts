import 'dotenv/config';
import { Sequelize } from 'sequelize-typescript';
import {Policyholder} from '../models/policyholderModel';


const {DB_NAME, DB_USER, DB_PASSWORD, TEST_DB_NAME, TEST_DB_USER, TEST_DB_PASSWORD} = process.env;
console.log('TEST_DB_NAME', TEST_DB_NAME);

const isTestEnv = process.env.NODE_ENV === 'test';

const sequelize = new Sequelize({
    database: isTestEnv ? TEST_DB_NAME : DB_NAME,
    dialect: 'mysql',
    username: isTestEnv ? TEST_DB_USER : DB_USER,
    password: isTestEnv ? TEST_DB_PASSWORD : DB_PASSWORD,
    host: '127.0.0.1',
    port: isTestEnv ? 3307 : 3307,
    models: [Policyholder],
});


export default sequelize;