"use strict";
// interface IFullName {
//   firstName: string
//   lastName: string
//   //可选属性
//   age?: number
// }
function Ajax(config) {
    var xhr = new XMLHttpRequest();
    xhr.open(config.method, config.url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('success');
            console.log(xhr.responseText);
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(config.data);
}
//此处可封装data
Ajax({
    method: 'get',
    url: "https://api.github.com/search/users?q=ok",
});
