const Koa = require('koa');
const Router = require('koa-router');
const parser = require('koa-parser');
const fs = require('fs');
var exec = require('child_process').exec;

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

router.post('/exectest',function(ctx,next){
	var jsonObj = getJsonBody(ctx);
	if(jsonObj=='null'){
		ctx.body=errMessage;
		return;
	}
	//console.log(jsonObj.name+"---"+jsonObj.cmd);
	if(jsonObj.name==='execu'){
		ctx.body = execute(jsonObj.cmd);
	}else{
		ctx.body = errMessage;
	}
});

app.use(parser());
app.use(router.routes(),router.allowedMethods());

let getJsonBody =((ctx)=>{
	if (ctx.request.body !== undefined) {
		return ctx.request.body;
	}
	return "null";  
});

function execute(cmd){
	var result = {};
	exec(cmd,function(err,stdout,stderr){
		if(err){
			console.log('err');
			result.code=500;
			result.data="操作失败！请重试";
		}else{
			console.log('stdout ',stdout);//标准输出
			result.code=200;
			result.data="操作成功！";
		}
	});
	return result;
}

app.listen(3001, () => {
  console.log('http://127.0.0.1:3001');
});