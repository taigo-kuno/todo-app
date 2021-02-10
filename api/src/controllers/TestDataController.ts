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
const result = connection().then(connection => {
  //console.log(connection);//connection check
  // 取得
  const result = connection.query('SELECT * FROM test');
  
  // 追加
  //const result = connection.query("INSERT INTO test VALUES(11,'test11', 'apiコンテナから追加')");

  //削除
  //const result = connection.query("delete from test where id = 11 ;");
  connection.end();
  
  return result;
}).then(function(rows) {
  console.log("エラーが起きませんでした。")
  
//  console.log(rows);
  return rows[0];
}).catch(function(e) {
  console.log("エラーがおきました");
  console.log(e);
  return e
});



console.log(result);



@JsonController('/api/v1/test')
export class TestDataController {
  @Get('/')
  getAll() {
　
    return  
    
  }

//   @Get('/:id')
//   getOne(@Param('id') id: number) {
//     return testDatas[id]
//   }

//   @Post('/')
//   post(@Body() testData: TestData) {
//     testDatas.push(testData)
//     return 'ok'
//   }

//   @Put('/:id')
//   put(@Param('id') id: number, @Body() testData: TestData) {
//     testDatas[id] = testData
//     return 'ok'
//   }

//   @Delete('/:id')
//   remove(@Param('id') id: number) {
//     testDatas.splice(id, 1)
//     return 'ok'
//   }
}

//参考
//https://qiita.com/ucan-lab/items/36f67633bc6e8b4229dc