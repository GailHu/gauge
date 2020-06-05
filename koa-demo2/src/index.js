import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import fs from 'fs';
import util from 'util';
import {exec} from 'child_process';

const app = new Koa();
const router = new Router();
const errMessage = "请求参数错误，未能执行测试命令!";

// post method ;  parse json;  cmd;
router.get('/',function(ctx,next){
	ctx.response.type = 'html';
	ctx.response.body = fs.createReadStream('src/index.html');
});
router.get('/getJquery',function(ctx,next){
	ctx.response.type = 'js';
	ctx.response.body = fs.createReadStream('src/jquery.min.js');
});
const execute = util.promisify(exec)
router.post('/exectest',async (ctx,next)=>{
	const {cmd} = ctx.request.body;
	const {stdout, stderr} = await execute(cmd)
	stderr && ctx.status = 500
	ctx.body = {stdout, stderr}
    });

app.use(bodyParser());
app.use(router.routes(),router.allowedMethods());

app.listen(3001, () => {
  console.log('http://127.0.0.1:3001');
});
