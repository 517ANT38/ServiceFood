const valid:IForCheck={
    prop: [
        {nameProp:"name",err:"Некоректный формат названия блюда",func:(a)=>/^[А-ЯЁа-яё]+/.test(a),required: true},
        {nameProp:"price",err:"Некоректный формат значения стоимости",func:(a)=>/^[0-9][0-9,\.]+$/.test(a),required:true},
        {nameProp:"calorific",err:"Некоректный формат значения каллорий",func:(a)=>/^[0-9][0-9,\.]*$/.test(a),required:true},
        {nameProp:"weight",err:"Некоректный формат значения веса",func:(a)=>/^[0-9][0-9,\.]*$/.test(a),required:true},
        {nameProp:"catering",err:"Некоректный формат названия общепита",func:(a)=>/^[А-ЯЁа-яё]+/.test(a),required:true},
        {nameProp:"description",err:"Некоректный формат названия описания",required:false},
        {nameProp:"category",err:"Некоректный формат названия категории",func:(a)=>/^[А-ЯЁа-яё]+/.test(a),required:true},
        {nameProp:"img",required:false}
    ]
} 
function switch_section():void{
    const left:HTMLElement|null=document.getElementById("left");
    const rigth:HTMLElement|null=document.getElementById("rigth");
    const arrElemSection:NodeListOf<HTMLElement>=document.querySelectorAll(".sec");
    console.log(arrElemSection.length)
    let i:number=1;
    arrElemSection[i].style.display="flex";
    left?.addEventListener("click",()=>{
        if(!arrElemSection[i])return;
        arrElemSection[i].style.display="none";
        i=(i<=0)?arrElemSection.length-1:i-1;               
        arrElemSection[i].style.display="flex"
    });
    rigth?.addEventListener("click",()=>{
        if(!arrElemSection[i])return;
        arrElemSection[i].style.display="none";
        i=(i>=arrElemSection.length-1)?0:i+1;           
        arrElemSection[i].style.display="flex";
        
    })
}

async function generateNewDish(elem:HTMLFormElement):Promise<INewDish>{
    
    let res:INewDish={
        
        name: "",
        img:null ,
        price: 0,
        description:"",
        category: "",
        calorific: 0,
        weight: 0,
        catering: "",
        
    }
    for(let item of elem.elements)
    {
        let x:HTMLInputElement=<HTMLInputElement>item;
        await selectValueName(x,res);
        
    }
    return res;
}
async function selectValueName(x:HTMLInputElement,res:INewDish){
    switch (x.name) {
        case "name":
            res.name=x.value;
            break;
        case "price":
            res.price=Number(x.value);
            break;
        case "calorific":
            res.calorific=Number(x.value);
            break;
        case "weight":
            res.weight=Number(x.value);
            break;
        case "description":
            res.description=x.value;
            break;    
        case "category":
            res.category=x.value;
            break;
        case "catering":
            res.catering=x.value;
            break;
        default:{
            let p=x.files?.item(0);
            if(p!=null)     
                res.img=await getBase64(p);
            break;
        }
    }
}
function validate(elem:HTMLFormElement,valid:IForCheck):[string,string][]{
    let arr:[string,string][]=[];
    
    for(let item of elem.elements)
    {
        let x:HTMLInputElement=<HTMLInputElement>item;
        let vp=valid.prop.findIndex((y)=>y.nameProp==x.name);
        let p=valid.prop[vp];
        
        if(x.value.length>0){
            
            if(p?.func){
                
                if(!p?.func(x.value)){                    
                    let s:string|undefined=p?.err;
                    console.log(p?.func(x.value));                   
                    arr.push([x.name,s??""])
                }
            }
        }
        else if(x.value.length==0){
            if(p?.required)
                arr.push([x.name,"Поле не заполнено"]);
        }
    }
    return arr;
}
function clickLabel(elem:HTMLElement){
    let arr=elem.querySelectorAll("div");    
    arr.forEach(e=>{
        let labels=e.querySelectorAll("label");
        labels.forEach(x=>x.addEventListener("click",()=>{
            
            (<HTMLInputElement>x.nextElementSibling).checked=true;
            
        }))
    })
}

function main(...args:string[]):void{
    
    let section=document.getElementById("dishes");
    switch_section();
    getDataRefreshInPage(section!).catch(x=>alert("У нас неполадки.Просим прощения"));
    let but:HTMLElement|null=document.getElementById("butDish");
    let form:HTMLFormElement|null=<HTMLFormElement>document.getElementById("formDish");
    let butSort=document.getElementById("sort");
    let sortAndFilt=document.getElementById("sortAndFilt");
    let filterBut=document.getElementById("butValid");
    let butValidReset=document.getElementById("butValidReset");
    let butSortReset=document.getElementById("butSortReset");
    let setting=<HTMLElement>document.querySelector(".setti");
    let filterDiv=<HTMLElement>document.querySelector("#filterDIv");
    let offFilter=<HTMLElement>document.querySelector("#offFilter");
    clickLabel(setting);
    butValidReset?.addEventListener("click",()=>{
        resetInput(filterDiv!);
    })
    butSortReset?.addEventListener("click",()=>{
        resetInput(setting!);
    });
    butSort?.addEventListener("click",()=>{
        startSort(setting!,section!);
    })
    filterBut?.addEventListener("click",()=>{
        filter(filterDiv!,section!);
    });
    offFilter.addEventListener("click",()=>{
        offFilterFun(section!);
    })
    btn_process_form(form,but,valid,section!);
}
function delElem(...elems:Element[]):void{  
    elems.forEach(elele=>elele.remove());
    
}
function writeDishesInSection(o:IDish[],elem:HTMLElement|null):void{
    
    for (let index = 0; index < o.length ;index++) {
        elem!.insertAdjacentElement("beforeend",createElemDish(o[index]))
    }
    
}
function head(o:IDish):HTMLElement{
    let divImg=document.createElement("div");
    divImg.classList.add("img-box");
    let img=document.createElement("img");
    img.classList.add("imgD");
    img.src=o.img??"../image/defaultDish.png";
    divImg.insertAdjacentElement("beforeend",img);
    return divImg;
}
function descContent(o:IDish):HTMLElement{
    let rootDesc=document.createElement("div");
    rootDesc.classList.add("desc");
    let divId=document.createElement("div");
    divId.classList.add("bord");    
    divId.insertAdjacentHTML("beforeend",`<span metka name='id' type='string'>${o.id}</span>`);
    divId.style.display="none";
    
    rootDesc.insertAdjacentElement("beforeend",divId);
    let item:keyof typeof o
    for(item in o){
        if(item !="img"&& item!="id"){
            let div=document.createElement("div");
            div.classList.add("bord");
            div.insertAdjacentHTML("beforeend",`<span>${mapProp(item)}</span>`);
            div.insertAdjacentHTML("beforeend",`<span metka name='${item}' type='${typeof(o[item])}'>${o[item]}</span>`);
            let s:string=mapMeasure(item,o.category);            
            if(s!=="")
                div.insertAdjacentHTML("beforeend",`<span>${s}</span>`);
            rootDesc.insertAdjacentElement("beforeend",div);    
        }
    }
    return rootDesc;
}
function createBut(o:IDish):HTMLElement{
    let but=document.createElement("button");
    but.setAttribute("type","button");    
    but.textContent="Удалить";
    but.style.marginLeft="10px";
    but.style.marginTop="3px";
    but.style.width="100px";
    return but;
}
function createElemDish(o:IDish):HTMLElement{
    let root=document.createElement("div");
    root.classList.add("dish");        
    root.insertAdjacentElement("beforeend",head(o));    
    root.insertAdjacentElement("beforeend",descContent(o));
    let but=createBut(o);
    but.onclick=()=>deleteDish(o.id,"http://localhost:8080/api/dishes",root);
    root.insertAdjacentElement("beforeend",but);
    root.insertAdjacentElement("beforeend",butUpdate(o.id,root)); 
    return root;
}
function butUpdate(id:string,root:HTMLElement):HTMLElement{
    let but=document.createElement("button");
    but.setAttribute("type","button");
    but.setAttribute("metkaBut","");
    but.onclick=()=>butDoubleUpdate(id,root);
    but.textContent="Обновить";
    but.style.marginLeft="10px";
    but.style.marginTop="3px";
    but.style.width="100px";
    return but;
}
function butDoubleUpdate(id:string,root:HTMLElement){
    let elems=<HTMLElement[]>[...root.querySelectorAll("div>span[metka]")];
    elems.forEach(el=>{
        if(el.getAttribute("name")=="id")return;
        el.style.display='none';
        let input=document.createElement("input");
        input.setAttribute("type","text"); 
        input.setAttribute("metkaInput","");
        input.setAttribute("typeValueMy",el.getAttribute("type")!);       
        input.setAttribute("name",el.getAttribute("name")!)
        input.value=el.textContent!;
        el.insertAdjacentElement("afterend",input);
    });
    (<HTMLElement>root.querySelector("button[metkaBut]")).style.display="none";
    root.insertAdjacentElement("beforeend",update(id,root));
    root.insertAdjacentElement("beforeend",otm(root));
}
function update(id:string,root:HTMLElement){
    let but=document.createElement("button");
    but.setAttribute("type","button");    
    but.onclick=()=>{
        let a=parseDataUpdate(root);
        sendDataPut(a!,"http://localhost:8080/api/dishes/"+id).catch(x=>alert("у нас неполадки"));
        previosAct(root,true);
    }
    but.textContent="Сохранить";
    but.setAttribute("dd","") 
    but.style.marginLeft="10px";
    but.style.marginTop="3px";
    but.style.width="100px";
    return but;
}
function otm(root:HTMLElement){
    let but=document.createElement("button");
    but.setAttribute("type","button"); 
    but.setAttribute("dd","")   
    but.onclick=()=>previosAct(root);    
    but.textContent="Отмена";
    but.style.marginLeft="10px";
    but.style.marginTop="3px";
    but.style.width="100px";
    return but;
}
function previosAct(root:HTMLElement, fl:boolean=false){
    let elems=<HTMLInputElement[]>[...root.querySelectorAll("div>input[metkaInput]")];
    let dds=[...root.querySelectorAll("button[dd]")];
    (<HTMLElement>root.querySelector("button[metkaBut]")).style.display="";
    dds.forEach(x=>x.remove());
    elems.forEach(el=>{
        let a=<HTMLElement>el.previousSibling;
        if(a.getAttribute("name")!="id")
            a.style.display=""
        a.innerHTML=(fl)?el.value:a.innerHTML;
        el.remove();
    });
}
function parseDataUpdate(root:HTMLElement):UpdateDish|void{
    let arr=<HTMLInputElement[]>[...root.querySelectorAll("div>input[metkaInput]")];
    let fl=true;
    let res:UpdateDish={
        name: "",
        price: 0,
        description:"",
        catering: "",
        calorific: 0,
        weight: 0,
        category: ""
    }
    arr.forEach(x=>{
        let s=x.getAttribute("name")!;
        let p=valid.prop.find((n)=>s==n.nameProp);
        if(p?.func&&!p?.func(x.value!)){
            alert(p.err);
            fl=false;
        }
        switch (x.name) {
            case "name":
                res.name=x.value;
                break;
            case "price":
                res.price=Number(x.value);
                break;
            case "calorific":
                res.calorific=Number(x.value);
                break;
            case "weight":
                res.weight=Number(x.value);
                break;
            case "description":
                res.description=x.value;
                break;    
            case "category":
                res.category=x.value;
                break;
            case "catering":
                res.catering=x.value;
                break;
        }
    });
    if(!fl)return;
    return res;
}
interface UpdateDish{
    name:string,
    description?:string,
    price:number,
    catering:string ,    
    calorific:number,
    weight:number, 
    category:string,
}

function mapProp(prop:string):string{
    let propAnglMapRuss:Map<string,string>=new Map([
        ["name","Название"],
        ["description","Описание"],
        ["price","Стоимость"],
        ["calorific","Каллорийность"],
        ["category","Категория"],
        ["weight","Вес"],
        ["catering","Общепит"]
    ]);
    let res=propAnglMapRuss.get(prop);
    return (res)?res:"";
}
function mapMeasureCateg(category:string):string{
    if(category=="напитки")return "мл";
    return "г";
}
function mapMeasure(prop:string,category:string|undefined):string{
    if(prop=="weight"&&category){
        return mapMeasureCateg(category);
    }
    if(prop=="calorific")
        return "ккал";
    else if(prop=="price")return "&#8381;";
    return "";    

}
function btn_process_form(form:HTMLFormElement|null,but:HTMLElement|null,valid:IForCheck,section:HTMLElement):void{
    let dish:INewDish;
    but?.addEventListener("click",async ()=>{        
        let arrValid:[string,string][]=[];
        let myForEach=[].forEach.bind(form);    
        if(form!=null){
            let arrValid:[string,string][]=validate(form!,valid);
            myForEach((elem:HTMLElement)=>elem.style.backgroundColor="")
            delElem(...document.querySelectorAll(".valid"));            
            if(arrValid.length==0){               
                dish=await generateNewDish(form);
                try{                    
                    let res= await sendData(dish,"http://localhost:8080/api/dishes/add");                    
                    let data=await getData<IDish>("http://localhost:8080/api/dishes/all");
                    section.innerHTML="";
                    write(data,{write:writeDishesInSection},section);
                    form.reset();                 
                    
                }catch{alert("У нас проблемы!")}                
                return;
            }
            myForEach((elem:HTMLFormElement)=>{                
                for(let e of arrValid){
                    if(elem.name==e[0]){
                        elem.style.backgroundColor="rgb(230, 142, 142)";                             
                        elem.insertAdjacentElement("afterend",createValidElem(e[1]));
                    }
                }
            });
            
        }
    });
}
function createValidElem(e:string):Element{
    let el=document.createElement("span");
    el.classList.add("valid");
    el.style.color="red";
    el.style.marginLeft="10px"
    el.textContent=e;
    return el;
}
interface SetParamsCheck{
    nameProp:string,
    err?:string,
    func?:(a:string)=>boolean
    required:boolean
}
function removeChild(section:HTMLElement){
    for(let i of section.children){
        i.remove();
    }
}

interface IForCheck{
    prop:SetParamsCheck[];
} 
interface IDish extends INewDish{
    id:string,
      
} 

interface INewDish{    
    name:string,
    img:string|null,
    description?:string,
    price:number,
    catering:string ,
    
    calorific:number,
    weight:number, 
    category:string,
     
} 
async function getDataRefreshInPage(section:HTMLElement){
    
    let data=await getData<IDish>("http://localhost:8080/api/dishes/all");
    if(data.length!=0){
        removeChild(section);
        write(data,{write:writeDishesInSection},section);
    
    }
    
    
}

main()
