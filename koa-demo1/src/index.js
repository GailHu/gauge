import Koa from 'koa';
import Router from '@koa/router';

const app = new Koa();
const router = new Router();

app.use(router.routes(),router.allowedMethods());
//定义路由
//router.get('/getJson', function (ctx, next) {
//	ctx.body = '{"name":"admin","pwd":"admin"}';  
//});
//返回json
let returnJson =((ctx)=>{
	ctx.body = '{"name":"admin","pwd":"admin"}';  
});
router.get('/getJson',returnJson);
app.listen(3000, () => {
  console.log('http://127.0.0.1:3000');
});