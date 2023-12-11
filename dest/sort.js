"use strict";
const selector = (elem, x) => elem
    .querySelector(`.desc>.bord>span[name='${x}']`);
function startSort(secSortSet, whatSec) {
    let paramSort = preSort(secSortSet);
    sort(whatSec, paramSort);
}
function preSort(secSortSet) {
    var _a, _b;
    let elems = secSortSet.querySelectorAll("div");
    let paramSort = [];
    for (let item of elems) {
        let vsort = (_a = document.querySelector("input:checked")) === null || _a === void 0 ? void 0 : _a.name;
        let tsort = (_b = document.querySelector("input[type='radio']:checked")) === null || _b === void 0 ? void 0 : _b.value;
        if (vsort && tsort)
            paramSort.push([vsort, tsort]);
    }
    return paramSort;
}
function sort(whatSec, paramSort) {
    let elems = [...whatSec.querySelectorAll(".dish")];
    let o = paramSort[0];
    elems = elems.sort((a, b) => compare(a, b, o));
    for (let i = 1; i < paramSort.length; i++) {
        o = paramSort[i];
        elems = elems.sort((a, b) => compare(a, b, o));
    }
    removeChild(whatSec);
    elems.forEach(x => whatSec.appendChild(x));
}
const compare = (a, b, o) => {
    let p1 = selector(a, o === null || o === void 0 ? void 0 : o[0]);
    let p2 = selector(b, o === null || o === void 0 ? void 0 : o[0]);
    let type = p1 === null || p1 === void 0 ? void 0 : p1.getAttribute("type");
    if (type) {
        if (type == "number") {
            console.log(o[1]);
            p1 = Number(p1 === null || p1 === void 0 ? void 0 : p1.innerHTML);
            p2 = Number(p2 === null || p2 === void 0 ? void 0 : p2.innerHTML);
            return (o === null || o === void 0 ? void 0 : o[1]) == "asc" ? p2 - p1 : p1 - p2;
        }
    }
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
    [p1, p2] = (o === null || o === void 0 ? void 0 : o[1]) == "asc" ? [p1, p2] : [p2, p1];
    let s = (p1 === null || p1 === void 0 ? void 0 : p1.innerHTML) ? p1.innerHTML : "";
    let s1 = (p2 === null || p2 === void 0 ? void 0 : p2.innerHTML) ? p2.innerHTML : "";
    return collator.compare(s, s1);
};
function resetInput(secSortSet) {
    let arr = secSortSet.querySelectorAll("input");
    arr.forEach(elem => elem.checked = false);
    arr.forEach(elem => elem.value = "");
}
