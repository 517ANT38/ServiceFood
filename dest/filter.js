"use strict";
function arrFilterElem(secFilterSet) {
    let elemsLabel = secFilterSet.querySelectorAll("label");
    let success = true;
    let fieldAndCheckers = [];
    elemsLabel.forEach(elemL => {
        var _a, _b, _c, _d, _e, _f;
        let s = (_a = elemL.getAttribute("for")) !== null && _a !== void 0 ? _a : "";
        let elems = [...secFilterSet.querySelectorAll(`input[name=${s}]`)];
        if (((_b = elems[0]) === null || _b === void 0 ? void 0 : _b.getAttribute("type")) == "text") {
            if (elems[0].value.length > 0) {
                if (!elems[0].value.match(/^[А-Яа-яЁё]*/)) {
                    alert("Не правильный формат поля" + elemL.innerText);
                    success = false;
                    return;
                }
                fieldAndCheckers.push({ name: s, predicate: (p) => p == elems[0].value });
            }
        }
        else if (((_c = elems[0]) === null || _c === void 0 ? void 0 : _c.getAttribute("type")) == "number") {
            if (elems[1].value.length != 0
                || elems[0].value.length != 0) {
                let p1 = Number(elems[0].value.length == 0 ? "0" : elems[0].value);
                let p2 = Number(elems[1].value.length == 0 ? "0" : elems[1].value);
                if (Number(p2) <= Number(p1)) {
                    alert(elemL.textContent
                        + ` не может ${(_d = elems[0].previousSibling) === null || _d === void 0 ? void 0 : _d.textContent}`
                        + "быть больше " +
                        ((_f = (_e = elems[1].parentNode) === null || _e === void 0 ? void 0 : _e.firstChild) === null || _f === void 0 ? void 0 : _f.textContent));
                    success = false;
                    return;
                }
                fieldAndCheckers.push({ name: s, predicate: (p) => p1 <= Number(p) && Number(p) <= p2 });
            }
        }
    });
    if (fieldAndCheckers.length == 0 && success) {
        alert("Поля не заполнены");
        return;
    }
    else if (!success) {
        return;
    }
    return fieldAndCheckers;
}
function filter(secFilterSet, whatSec) {
    let arr = arrFilterElem(secFilterSet);
    if (!arr)
        return;
    let elems = [...whatSec.querySelectorAll(".dish")];
    elems.forEach(elem => {
        arr === null || arr === void 0 ? void 0 : arr.forEach(x => {
            let el = selector(elem, x.name);
            if (!x.predicate(el === null || el === void 0 ? void 0 : el.innerHTML)) {
                elem.style.display = 'none';
            }
            else
                elem.style.display = '';
        });
    });
}
function offFilterFun(elem) {
    let elems = [...elem.querySelectorAll(".dish")];
    elems.forEach(x => x.style.display = "flex");
}
