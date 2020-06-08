import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import fs from 'fs';
import util from 'util';
import {exec} from 'child_process';

/*
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-parser');
const fs = require('fs');
var exec = require('child_process').exec;
*/

const app = new Koa();
const router = new Router();
app.use(bodyParser());
app.use(router.routes(),router.allowedMethods());

// const errMessage = "请求参数错误，未能执行测试命令!";
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

const execute = util.promisify(exec)
router.post('/exectest',async (ctx,next)=>{
	const {cmd} = ctx.request.body;
	const {stdout, stderr} = await execute(cmd)
	console.log("------------stdout["+stdout+"]-----stderr["+stderr+"]---");
	//下面这两行加上会报错，正常执行后stdout和stderr都是空
	//stderr && ctx.status = 500
	//ctx.body = {stdout, stderr}
});

/*
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
*/
app.listen(3001, () => {
  console.log('http://127.0.0.1:3001');
});