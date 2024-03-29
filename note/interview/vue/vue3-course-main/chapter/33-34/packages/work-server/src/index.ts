/* eslint-disable no-console */
import path from 'node:path';
import Koa from 'koa';
import koaStatic from 'koa-static';
import koaMount from 'koa-mount';
import koaBodyParser from 'koa-bodyparser';
import routers from './router';
import { getServerDir } from './util/file';
import { syncFileFromCDN } from './middleware/sync-cdn';
import { record } from './middleware/record';

const app = new Koa();

app.use(record);

const publicDirPath = path.join(getServerDir(), 'public');
app.use(koaBodyParser());
app.use(koaMount('/public', koaStatic(publicDirPath)));
app.use(syncFileFromCDN);
app.use(routers);

const port = 8001;

app.listen(port, () => {
  console.log('服务启动: http://127.0.0.1:' + port);
});
