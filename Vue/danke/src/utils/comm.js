// export const obj2url = function (obj = {}) {
function obj2url(obj = {}) {
  let res = Object.entries(obj).reduce((acc, cur) => {
    return acc.caoncat(cur)
  })
  console.log(res)
}
obj2url({a:9})
