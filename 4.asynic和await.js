/**
 * Created by Administrator on 2018/10/17.
 */
const fs =require('fs');
const path = require('path');


function fn(url){
    return new Promise((res, rej) => {
        fs.readFile(path.join(__dirname,url), 'utf-8', (err, result) => {
            if (err) return rej(err);
            res(result);
        })
    })
}

async function set() {
    console.log('同步');
    const result1 = await fn('./data1.json').catch(err => err.message)
    console.log(result1);
    const result2 = await fn('./data2.json')
    console.log(result2);

}

console.log(1);
set()
console.log(2);
