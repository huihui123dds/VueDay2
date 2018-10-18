function fn() {
    return new Promise(function(resolve,reject) {
        console.log(999);
        resolve('成功')
        reject('失败')
    })
}
fn().then(data => {
    console.log(data)
})
//fn().catch(err => {
//    console.log(err)
//})