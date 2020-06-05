/* globals gauge*/
"use strict";
const fetch = require('node-fetch');
const assert = require("assert");

step("Open Url <url>", async url => {
	const response = await fetch(url)
	const {pwd} = await response.json()
	assert.equal(pwd,'admin',"用户密码不正确");
});

step("Accert URL <url> Name <name>",async (url,name)=>{
	const response = await fetch(url)
	const result = await response.json()
	assert.equal(result.name,name,"用户名不正确");
})
