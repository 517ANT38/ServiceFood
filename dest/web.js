"use strict";
let getData = function getData(url) {
    return fetch(url, { method: "GET", })
        .then(x => x.text())
        .then(x => x == "" ? {} : JSON.parse(x));
};
function write(prom, wr, elem) {
    wr.write(prom, elem);
}
function sendData(a, url) {
    return fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'text/plain'
        },
        body: JSON.stringify(a)
    });
}
function getBase64(file) {
    let p = new Promise(function (resolve, reject) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => { var _a, _b; return resolve((_b = (_a = reader.result) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ""); };
        reader.onerror = (error) => reject(error);
    });
    return p;
}
function deleteDish(id, url, elem) {
    let a = fetch(url + "/" + id, { "method": "DELETE" });
    a.catch(x => alert("У нас неполадки"));
    elem.remove();
}
function sendDataPut(a, url) {
    return fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'text/plain'
        },
        body: JSON.stringify(a)
    });
}
// 'Access-Control-Allow-Orgin':'*',
// 'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS, HEAD',
// 'Access-Control-Allow-Credentials':'true',
// 'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept, Authorization'
