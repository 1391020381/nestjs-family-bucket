1. url param url中的参数，Nest中使用@Param 来获取
2. query url中 ?后的字符串 Nest中使用 @Query 来获取
3. form urlencoded 类似 query 字符串 只不过放在 body中。Nest中使用 @Body来获取, axios中需要指定 content-type 为 application/x-www-form-urlencoded 并且对数据用 qs或者query-string库做 url encode。
4. json json格式的数据 Nest中 @Body 来获取, axios中不需要单独指定 content-type axios内部处理。
5. form data 通过 ----- 作为 boundary 分隔的数据。主要用于传输文件，Nest 中要使用 FilesInterceptor 来处理其中的 binary 字段，用 @UseInterceptors 来启用，其余字段用 @Body 来取。axios 中需要指定 content type 为 multipart/form-data，并且用 FormData 对象来封装传输的内容。
