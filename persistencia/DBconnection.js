import sqlite3Options from '../configs/Sqlite3Options.js';
import mySqlOptions from '../configs/mySqlOptions.js';
import Sql from './Sql.js';
import Memoria from './Memoria.js';
import MongoDb from './MongoDB.js';
import Firebase from './firebase.js';
import config from '../configs/mongoDBoptions.js';

const sqlite = new Sql(sqlite3Options);
const mysql = new Sql(mySqlOptions);
const memoria = new Memoria();
const mongoLocal = new MongoDb(config.localUrl, config.options);
const mongoAtlas = new MongoDb(config.atlasUrl, config.options);
const firebase = new Firebase();

export const db = firebase;