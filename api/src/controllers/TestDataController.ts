import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers'
import * as mysql from 'mysql2/promise'

// 型定義
type TestData = { id: number; name: string; desc: string}

//DB接続
async function connection() {
  const connection = await mysql.createConnection({
    host: 'db_container',
    user: 'root',
    password: 'root',
    database: 'test_db',
    multipleStatements: true
  });
  return connection;
}

//データ取得
// connection().then(async connection => {
//   //console.log(connection);//connection check
//   // queryを投げる
//   const result = await connection.query('SELECT * FROM test');

//   connection.end();
  
//   console.log('conection end');
//   console.log(result);
//   return result;
// }).catch(function(e) {
//   console.log("エラーが起きました:" + e.errno);
//   return e
// });

// const res = function(num1:number, num2:number){
//   return num1 + num2;
// }(1, 2)
// console.log(res)



@JsonController('/tests')
export class TestDataController {
  @Get('/')
  getAll() {
    return connection().then(async connection => {
      //console.log(connection);//connection check
      // queryを投げる
      const result = await connection.query('SELECT * FROM test;');
      
      connection.end();
      
      return result[0];
    }).catch(function(e) {
      console.log("エラーが起きました:" + e.errno);
      return e
    });
    
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return connection().then(async connection => {
      //console.log(connection);//connection check
      // queryを投げる
      const result = await connection.query(`SELECT * FROM test WHERE id = ${id};`);
      
      connection.end();
      
      return result[0];
    }).catch(function(e) {
      console.log("エラーが起きました:" + e.errno);
      return e
    });
  }

  @Post('/')
  post(@Body() testData: TestData) {
    const id = testData.id;
    const name = testData.name;
    const desc = testData.desc ? testData.desc : "";
    return connection().then(async connection => {
      //console.log(connection);//connection check
      // queryを投げる
      const result = await connection.query(`INSERT INTO test VALUES (${id}, '${name}', '${desc}');`);
      
      connection.end();
      
      return "user created";
    }).catch(function(e) {
      console.log("エラーが起きました:" + e.errno);
      return e
    });
    
  }

  @Put('/:id')
  put(@Param('id') id: number, @Body() testData: TestData) {
    const uid = id;
    const uname = testData.name;
    const udesc = testData.desc ? testData.desc : "";
    return connection().then(async connection => {
      //console.log(connection);//connection check
      // queryを投げる
      const result = await connection.query(`UPDATE test SET name='${uname}', description='${udesc}' WHERE id = ${uid};`);
      
      connection.end();
      
      return "user update";
    }).catch(function(e) {
      console.log("エラーが起きました:" + e.errno);
      return e
    });
    
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return  connection().then(async connection => {
      //console.log(connection);//connection check
      // queryを投げる
      const result = await connection.query(`DELETE FROM test WHERE id = ${id};`);
      
      connection.end();
      
      return "User deleted";
    }).catch(function(e) {
      console.log("エラーが起きました:" + e.errno);
      return e
    });
  }
}
//参考
//https://qiita.com/ucan-lab/items/36f67633bc6e8b4229dc