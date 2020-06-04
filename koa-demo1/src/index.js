const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

app.use(router.routes(),router.allowedMethods());

//定义路由
router.get('/getJson', function (ctx, next) {
	returnJson(ctx);
});

//返回json
let returnJson =((ctx)=>{
	ctx.body = '{"name":"admin","pwd":"admin"}';  
});

app.listen(3000, () => {
  console.log('http://127.0.0.1:3000');
});