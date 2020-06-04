/* globals gauge*/
"use strict";
const fetch = require('node-fetch');
const assert = require("assert");

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
