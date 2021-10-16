Sequelize with Typescript
---


`npm init -y`

Tạo ra file package.json

Sau đó tới cài các dependency:

`npm i typescript @types/node ts-node ts-node-dev -D`

`npm i express dotenv`

`npm i --save-dev @types/express`

`npm install typescript -D`

`npm i sequelize-cli -D`

Muốn cài sequelize cho db nào thì lên trang doc lấy, ở đây là mysql

`npm i sequelize mysql2`

OK Bắt đầu thôi

`tsc --init` tạo ra file có tên là `tsconfig.json` file này có tác dụng cấu hình typescript

...Tạo env...

Sau khi tạo env rồi thì tới công đoạn init sequelize bằng câu lệnh

`npx sequelize-cli init` sau khi chạy câu lệnh này xong thì nó sẽ tự tạo cho mình các folder như : migration, config,
model

tiếp tới nên sửa file config.json -> config.js cũng nhằm mục đích test cho chuẩn nữa

thêm `module.exports = ` vào đầu file config

khi này ta có thể thay đổi các trường của nó bằng file env và cũng có thể console.log() ra cho dễ kiểm tra

```javascript
    require('dotenv').config();
module.exports = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB_NAME,
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
```

sau đó mở file index.js trong models ra thay đổi dòng thứ 21 thành file đuôi .ts để nó hiểu được sau khi chạy câu lệnh
tạo bảng nó sẽ tạo file đuôi là ts thay vì js như mọi khi

OK sau đó thay đổi thành ES6 và js -> ts (xem trong bât kì file models)

cài thêm uuid để hỗ trợ cho trường id

`npm install uuid` và `npm install -D types/uuid`


---


Câu lệnh tạo bảng:

`npx sequelize-cli model:generate --name User --attributes name:string`

Trong đó: 
    `User` là tên Model,
    `name:string` là tên của các trường và kiểu dữ liệu của entity đó
    