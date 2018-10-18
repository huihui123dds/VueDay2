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
fn('./data.json').then(function (data) {
    console.log(data);
    return fn('./data2.json')
}).then(function (data2) {
    console.log(data2);
    return fn('./data3.json')
}).then(function (data3) {
    console.log(data3);
});


