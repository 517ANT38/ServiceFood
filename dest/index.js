"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const valid = {
    prop: [
        { nameProp: "name", err: "Некоректный формат названия блюда", func: (a) => /^[А-ЯЁа-яё]+/.test(a), required: true },
        { nameProp: "price", err: "Некоректный формат значения стоимости", func: (a) => /^[0-9][0-9,\.]+$/.test(a), required: true },
        { nameProp: "calorific", err: "Некоректный формат значения каллорий", func: (a) => /^[0-9][0-9,\.]*$/.test(a), required: true },
        { nameProp: "weight", err: "Некоректный формат значения веса", func: (a) => /^[0-9][0-9,\.]*$/.test(a), required: true },
        { nameProp: "catering", err: "Некоректный формат названия общепита", func: (a) => /^[А-ЯЁа-яё]+/.test(a), required: true },
        { nameProp: "description", err: "Некоректный формат названия описания", required: false },
        { nameProp: "category", err: "Некоректный формат названия категории", func: (a) => /^[А-ЯЁа-яё]+/.test(a), required: true },
        { nameProp: "img", required: false }
    ]
};
function switch_section() {
    const left = document.getElementById("left");
    const rigth = document.getElementById("rigth");
    const arrElemSection = document.querySelectorAll(".sec");
    console.log(arrElemSection.length);
    let i = 1;
    arrElemSection[i].style.display = "flex";
    left === null || left === void 0 ? void 0 : left.addEventListener("click", () => {
        if (!arrElemSection[i])
            return;
        arrElemSection[i].style.display = "none";
        i = (i <= 0) ? arrElemSection.length - 1 : i - 1;
        arrElemSection[i].style.display = "flex";
    });
    rigth === null || rigth === void 0 ? void 0 : rigth.addEventListener("click", () => {
        if (!arrElemSection[i])
            return;
        arrElemSection[i].style.display = "none";
        i = (i >= arrElemSection.length - 1) ? 0 : i + 1;
        arrElemSection[i].style.display = "flex";
    });
}
function generateNewDish(elem) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = {
            name: "",
            img: null,
            price: 0,
            description: "",
            category: "",
            calorific: 0,
            weight: 0,
            catering: "",
        };
        for (let item of elem.elements) {
            let x = item;
            yield selectValueName(x, res);
        }
        return res;
    });
}
function selectValueName(x, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        switch (x.name) {
            case "name":
                res.name = x.value;
                break;
            case "price":
                res.price = Number(x.value);
                break;
            case "calorific":
                res.calorific = Number(x.value);
                break;
            case "weight":
                res.weight = Number(x.value);
                break;
            case "description":
                res.description = x.value;
                break;
            case "category":
                res.category = x.value;
                break;
            case "catering":
                res.catering = x.value;
                break;
            default: {
                let p = (_a = x.files) === null || _a === void 0 ? void 0 : _a.item(0);
                if (p != null)
                    res.img = yield getBase64(p);
                break;
            }
        }
    });
}
function validate(elem, valid) {
    let arr = [];
    for (let item of elem.elements) {
        let x = item;
        let vp = valid.prop.findIndex((y) => y.nameProp == x.name);
        let p = valid.prop[vp];
        if (x.value.length > 0) {
            if (p === null || p === void 0 ? void 0 : p.func) {
                if (!(p === null || p === void 0 ? void 0 : p.func(x.value))) {
                    let s = p === null || p === void 0 ? void 0 : p.err;
                    console.log(p === null || p === void 0 ? void 0 : p.func(x.value));
                    arr.push([x.name, s !== null && s !== void 0 ? s : ""]);
                }
            }
        }
        else if (x.value.length == 0) {
            if (p === null || p === void 0 ? void 0 : p.required)
                arr.push([x.name, "Поле не заполнено"]);
        }
    }
    return arr;
}
function clickLabel(elem) {
    let arr = elem.querySelectorAll("div");
    arr.forEach(e => {
        let labels = e.querySelectorAll("label");
        labels.forEach(x => x.addEventListener("click", () => {
            x.nextElementSibling.checked = true;
        }));
    });
}
function main(...args) {
    let section = document.getElementById("dishes");
    switch_section();
    getDataRefreshInPage(section).catch(x => alert("У нас неполадки.Просим прощения"));
    let but = document.getElementById("butDish");
    let form = document.getElementById("formDish");
    let butSort = document.getElementById("sort");
    let sortAndFilt = document.getElementById("sortAndFilt");
    let filterBut = document.getElementById("butValid");
    let butValidReset = document.getElementById("butValidReset");
    let butSortReset = document.getElementById("butSortReset");
    let setting = document.querySelector(".setti");
    let filterDiv = document.querySelector("#filterDIv");
    let offFilter = document.querySelector("#offFilter");
    clickLabel(setting);
    butValidReset === null || butValidReset === void 0 ? void 0 : butValidReset.addEventListener("click", () => {
        resetInput(filterDiv);
    });
    butSortReset === null || butSortReset === void 0 ? void 0 : butSortReset.addEventListener("click", () => {
        resetInput(setting);
    });
    butSort === null || butSort === void 0 ? void 0 : butSort.addEventListener("click", () => {
        startSort(setting, section);
    });
    filterBut === null || filterBut === void 0 ? void 0 : filterBut.addEventListener("click", () => {
        filter(filterDiv, section);
    });
    offFilter.addEventListener("click", () => {
        offFilterFun(section);
    });
    btn_process_form(form, but, valid, section);
}
function delElem(...elems) {
    elems.forEach(elele => elele.remove());
}
function writeDishesInSection(o, elem) {
    for (let index = 0; index < o.length; index++) {
        elem.insertAdjacentElement("beforeend", createElemDish(o[index]));
    }
}
function head(o) {
    var _a;
    let divImg = document.createElement("div");
    divImg.classList.add("img-box");
    let img = document.createElement("img");
    img.classList.add("imgD");
    img.src = (_a = o.img) !== null && _a !== void 0 ? _a : "../image/defaultDish.png";
    divImg.insertAdjacentElement("beforeend", img);
    return divImg;
}
function descContent(o) {
    let rootDesc = document.createElement("div");
    rootDesc.classList.add("desc");
    let divId = document.createElement("div");
    divId.classList.add("bord");
    divId.insertAdjacentHTML("beforeend", `<span metka name='id' type='string'>${o.id}</span>`);
    divId.style.display = "none";
    rootDesc.insertAdjacentElement("beforeend", divId);
    let item;
    for (item in o) {
        if (item != "img" && item != "id") {
            let div = document.createElement("div");
            div.classList.add("bord");
            div.insertAdjacentHTML("beforeend", `<span>${mapProp(item)}</span>`);
            div.insertAdjacentHTML("beforeend", `<span metka name='${item}' type='${typeof (o[item])}'>${o[item]}</span>`);
            let s = mapMeasure(item, o.category);
            if (s !== "")
                div.insertAdjacentHTML("beforeend", `<span>${s}</span>`);
            rootDesc.insertAdjacentElement("beforeend", div);
        }
    }
    return rootDesc;
}
function createBut(o) {
    let but = document.createElement("button");
    but.setAttribute("type", "button");
    but.textContent = "Удалить";
    but.style.marginLeft = "10px";
    but.style.marginTop = "3px";
    but.style.width = "100px";
    return but;
}
function createElemDish(o) {
    let root = document.createElement("div");
    root.classList.add("dish");
    root.insertAdjacentElement("beforeend", head(o));
    root.insertAdjacentElement("beforeend", descContent(o));
    let but = createBut(o);
    but.onclick = () => deleteDish(o.id, "http://localhost:8080/api/dishes", root);
    root.insertAdjacentElement("beforeend", but);
    root.insertAdjacentElement("beforeend", butUpdate(o.id, root));
    return root;
}
function butUpdate(id, root) {
    let but = document.createElement("button");
    but.setAttribute("type", "button");
    but.setAttribute("metkaBut", "");
    but.onclick = () => butDoubleUpdate(id, root);
    but.textContent = "Обновить";
    but.style.marginLeft = "10px";
    but.style.marginTop = "3px";
    but.style.width = "100px";
    return but;
}
function butDoubleUpdate(id, root) {
    let elems = [...root.querySelectorAll("div>span[metka]")];
    elems.forEach(el => {
        if (el.getAttribute("name") == "id")
            return;
        el.style.display = 'none';
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("metkaInput", "");
        input.setAttribute("typeValueMy", el.getAttribute("type"));
        input.setAttribute("name", el.getAttribute("name"));
        input.value = el.textContent;
        el.insertAdjacentElement("afterend", input);
    });
    root.querySelector("button[metkaBut]").style.display = "none";
    root.insertAdjacentElement("beforeend", update(id, root));
    root.insertAdjacentElement("beforeend", otm(root));
}
function update(id, root) {
    let but = document.createElement("button");
    but.setAttribute("type", "button");
    but.onclick = () => {
        let a = parseDataUpdate(root);
        sendDataPut(a, "http://localhost:8080/api/dishes/" + id).catch(x => alert("у нас неполадки"));
        previosAct(root, true);
    };
    but.textContent = "Сохранить";
    but.setAttribute("dd", "");
    but.style.marginLeft = "10px";
    but.style.marginTop = "3px";
    but.style.width = "100px";
    return but;
}
function otm(root) {
    let but = document.createElement("button");
    but.setAttribute("type", "button");
    but.setAttribute("dd", "");
    but.onclick = () => previosAct(root);
    but.textContent = "Отмена";
    but.style.marginLeft = "10px";
    but.style.marginTop = "3px";
    but.style.width = "100px";
    return but;
}
function previosAct(root, fl = false) {
    let elems = [...root.querySelectorAll("div>input[metkaInput]")];
    let dds = [...root.querySelectorAll("button[dd]")];
    root.querySelector("button[metkaBut]").style.display = "";
    dds.forEach(x => x.remove());
    elems.forEach(el => {
        let a = el.previousSibling;
        if (a.getAttribute("name") != "id")
            a.style.display = "";
        a.innerHTML = (fl) ? el.value : a.innerHTML;
        el.remove();
    });
}
function parseDataUpdate(root) {
    let arr = [...root.querySelectorAll("div>input[metkaInput]")];
    let fl = true;
    let res = {
        name: "",
        price: 0,
        description: "",
        catering: "",
        calorific: 0,
        weight: 0,
        category: ""
    };
    arr.forEach(x => {
        let s = x.getAttribute("name");
        let p = valid.prop.find((n) => s == n.nameProp);
        if ((p === null || p === void 0 ? void 0 : p.func) && !(p === null || p === void 0 ? void 0 : p.func(x.value))) {
            alert(p.err);
            fl = false;
        }
        switch (x.name) {
            case "name":
                res.name = x.value;
                break;
            case "price":
                res.price = Number(x.value);
                break;
            case "calorific":
                res.calorific = Number(x.value);
                break;
            case "weight":
                res.weight = Number(x.value);
                break;
            case "description":
                res.description = x.value;
                break;
            case "category":
                res.category = x.value;
                break;
            case "catering":
                res.catering = x.value;
                break;
        }
    });
    if (!fl)
        return;
    return res;
}
function mapProp(prop) {
    let propAnglMapRuss = new Map([
        ["name", "Название"],
        ["description", "Описание"],
        ["price", "Стоимость"],
        ["calorific", "Каллорийность"],
        ["category", "Категория"],
        ["weight", "Вес"],
        ["catering", "Общепит"]
    ]);
    let res = propAnglMapRuss.get(prop);
    return (res) ? res : "";
}
function mapMeasureCateg(category) {
    if (category == "напитки")
        return "мл";
    return "г";
}
function mapMeasure(prop, category) {
    if (prop == "weight" && category) {
        return mapMeasureCateg(category);
    }
    if (prop == "calorific")
        return "ккал";
    else if (prop == "price")
        return "&#8381;";
    return "";
}
function btn_process_form(form, but, valid, section) {
    let dish;
    but === null || but === void 0 ? void 0 : but.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        let arrValid = [];
        let myForEach = [].forEach.bind(form);
        if (form != null) {
            let arrValid = validate(form, valid);
            myForEach((elem) => elem.style.backgroundColor = "");
            delElem(...document.querySelectorAll(".valid"));
            if (arrValid.length == 0) {
                dish = yield generateNewDish(form);
                try {
                    let res = yield sendData(dish, "http://localhost:8080/api/dishes/add");
                    let data = yield getData("http://localhost:8080/api/dishes/all");
                    section.innerHTML = "";
                    write(data, { write: writeDishesInSection }, section);
                    form.reset();
                }
                catch (_a) {
                    alert("У нас проблемы!");
                }
                return;
            }
            myForEach((elem) => {
                for (let e of arrValid) {
                    if (elem.name == e[0]) {
                        elem.style.backgroundColor = "rgb(230, 142, 142)";
                        elem.insertAdjacentElement("afterend", createValidElem(e[1]));
                    }
                }
            });
        }
    }));
}
function createValidElem(e) {
    let el = document.createElement("span");
    el.classList.add("valid");
    el.style.color = "red";
    el.style.marginLeft = "10px";
    el.textContent = e;
    return el;
}
function removeChild(section) {
    for (let i of section.children) {
        i.remove();
    }
}
function getDataRefreshInPage(section) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield getData("http://localhost:8080/api/dishes/all");
        if (data.length != 0) {
            removeChild(section);
            write(data, { write: writeDishesInSection }, section);
        }
    });
}
main();
