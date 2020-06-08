import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import fs from 'fs';
import util from 'util';
import {exec} from 'child_process';

const app = new Koa();
const router = new Router();
app.use(bodyParser());
app.use(router.routes(),router.allowedMethods());

// 访问根目录，返回index.html
router.get('/',function(ctx,next){
	ctx.response.type = 'html';
	ctx.response.body = fs.createReadStream('src/index.html');
});

// 放开jquery的访问权限
router.get('/getJquery',function(ctx,next){
	ctx.response.type = 'js';
	ctx.response.body = fs.createReadStream('src/jquery.min.js');
});
// 执行命令
const execute = util.promisify(exec)
router.post('/exectest',async (ctx,next)=>{
	const {cmd} = ctx.request.body;
	const {stdout, stderr} = await execute(cmd)
});

app.listen(3001, () => {
  console.log('http://127.0.0.1:3001');
});