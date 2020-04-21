var http = require('http');
//const router = require('express-promise-router')();
const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider("http://10.1.1.136:22000")
);
const account = web3.eth.getAccounts(console.log);

//abi情報
var abi = [{"constant":false,"inputs":[{"name":"acc_from","type":"string"},{"name":"acc_to","type":"string"},{"name":"amount","type":"int256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"acc_id","type":"string"}],"name":"query","outputs":[{"name":"amount","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"acc_id","type":"string"},{"name":"amount","type":"int256"}],"name":"open","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

//コントラクトのアドレス
var address = "0xe48bd443a50e46efefef75d4b897bdab4b1bc57f";

// インスタンス化
var instance = new web3.eth.Contract(abi,address);

const express = require('express');
const app = express();
//const app = Router();
app.get('/', (req, res) => {
    (async () => {  
        result = await transferCall("100","200",100);
        console.log("result .....");
        console.log(result);
        res.send("request accepted result = " + result.transactionHash);
    })().catch(onError);
    
});

web3.eth.personal.unlockAccount("0x7912A81B424F56C5d76BE10E05167C4d3adCDa1C", "password", 0).then(console.log('Account unlocked!'));
app.listen(3000, () => console.log('Listening on port 3000'));

function onError(err){
    console.log(err);
}

async function openCall(acount,amount){
    console.log("await open");
    recept = await open(acount,amount);
    console.log("await open passed");
    console.log("Recept .....");
    //console.log(recept);
    return Promise.resolve(recept);
}
async function queryCall(acount){
    console.log("await query");
    recept = await query(account);
    console.log("await passed");
    //console.log(recept);
    return Promise.resolve(recept);
}

async function transferCall(account1,account2,amount){
    console.log("await query");
    recept = await transfer(account1,account2,amount);
    console.log("await passed");
    //console.log(recept);
    return Promise.resolve(recept);
}

async function open(acount,amount){
     let start = Date.now();
     result = await instance.methods.open(acount,amount).send({from: '0x7912A81B424F56C5d76BE10E05167C4d3adCDa1C'});
     let end = Date.now();
     console.log(end-start + "ms(Open)");
     return Promise.resolve(result);
}

async function query(account){
    result = await instance.methods.query("123").call({from: '0x7912A81B424F56C5d76BE10E05167C4d3adCDa1C'});
    return Promise.resolve(result);
}

async function transfer(account1,account2,amount){
    result = await instance.methods.transfer(account1,account2,amount).call({from: '0x7912A81B424F56C5d76BE10E05167C4d3adCDa1C'});
    return Promise.resolve(result);
}