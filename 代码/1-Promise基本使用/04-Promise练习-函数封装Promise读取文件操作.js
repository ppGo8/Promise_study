/**
 * 封装一个函数 mineReadFile 读取文件内内容
 * @param{string} path 文件路径
 * @return promise对象
 */
function mineReadFile(path) {
  return new Promise((resolve, reject) => {
    require('fs').readFile(path, (err, data) => {
      if(err) reject(err);
      resolve(data);
    })
  })
}
mineReadFile('./resource/content.txt')
.then((value)=>{
  console.info(value.toString())
},(err)=>{
  console.info(err)
})