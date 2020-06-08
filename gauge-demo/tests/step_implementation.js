/* globals gauge*/
"use strict";
const fetch = require('node-fetch');
const assert = require("assert");

// 判断用户密码是否为admin
step("Open Url <url>", async url => {
	const response = await fetch(url)
	const {pwd} = await response.json()
	assert.equal(pwd,'admin',"用户密码不正确");
});

// 判断用户账户是否与预期的一致
step("Accert URL <url> Name <name>",async (url,name)=>{
	const response = await fetch(url)
	const result = await response.json()
	assert.equal(result.name,name,"用户名不正确");
})

/*
step("Open Url <url>", async (url) => {
	await fetch(url)
    .then(res => res.json())
    .then(json => {
		console.log(json);
		assert.equal(json.pwd,'admin',"用户密码不正确");
	});
});

step("Accert URL <url> Name <name>",async(url,name)=>{
	await fetch(url)
    .then(res => res.json())
    .then(json =>{
		console.log(json);
		assert.equal(json.name,name,"用户名不正确");
	});
});
*/