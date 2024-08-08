- mysql 也是分为 后台守护进程和客户端两方面 cli-client gui-client
- docker run --name hello-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -v D:/Docker/mysql:/var/lib/mysql -d mysql:5.7

- connection 连接 database schema
- database 或 schema 下有 表 table 视图 view 存储过程 stored producer 函数 function

- primary key auto increment 的约束
- mysql 数据类型 INT 存储整数 VARCHAR(100) 存储变长字符串 可指定长度。 CHAR 定长字符串 不够的自动在末尾填充空格 DOUBLE 存储浮点数 DATE 存储日志 2023-05-27
