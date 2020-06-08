import Koa from 'koa';
import Router from '@koa/router';

const app = new Koa();
const router = new Router();

app.use(router.routes(),router.allowedMethods());
//返回json
let returnJson =((ctx)=>{
	ctx.body = '{"name":"admin","pwd":"admin"}';  
});
//定义路由
router.get('/getJson',returnJson);

app.listen(3000, () => {
  console.log('http://127.0.0.1:3000');
});