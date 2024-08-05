- Console File Http Stream 内置的 transport
- DailyRotateFile 就是按照日期滚动存储日志文件的 Transport

- 日志级别
  - error:0
  - warn:1
  - info:2
  - http:3
  - verbose:4
  - debug:5
  - silly:6

* winston 支持 tranport配置 可以把日志传输到 console file 通过 http 发送到 别的服务，写入 mongodb数据库等
