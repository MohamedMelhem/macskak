import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';

import { Jatek } from './jatek.js';
import { Macska } from './macska.js';

const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: process.env.MYSQL_DATABASE ?? 'macskak',
});

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }


  async getMacskak(): Promise<Macska[]> {
    const [results] = await mysqlConnection.execute(
      'SELECT id, suly, szem_szin, gazdi_id, jatek_id FROM macskak'
    );
    const rows = results as Macska[];
    return rows.map((macska) => ({ ...macska, suly: Number(macska.suly) }));
  }

  async getJatekok(): Promise<Jatek[]> {
    const [results] = await mysqlConnection.execute(
      'SELECT id, nev FROM jatekok'
    );
    return results as Jatek[];
  }

  
  }