function arrFilterElem(secFilterSet:HTMLElement):undefined|FieldAndChecker[]{
    let elemsLabel=secFilterSet.querySelectorAll("label");
    let success = true;
    let fieldAndCheckers:FieldAndChecker[]=[];
    elemsLabel.forEach(elemL=>{
        let s=elemL.getAttribute("for")??"";
        let elems=<HTMLInputElement[]>[...secFilterSet.querySelectorAll(`input[name=${s}]`)];
        
        
            if(elems[0]?.getAttribute("type")=="text"){
                if(elems[0].value.length>0){
                    if(!elems[0].value.match(/^[А-Яа-яЁё]*/)){                        
                        alert("Не правильный формат поля"+elemL.innerText);
                        success=false;
                        return;
                    }                    
                    fieldAndCheckers.push({name:s,predicate:(p)=>p==elems[0].value});
                }
            }
            else if(elems[0]?.getAttribute("type")=="number"){
                if(elems[1].value.length!=0
                    ||elems[0].value.length!=0){
                
                    let p1=Number(elems[0].value.length==0?"0":elems[0].value);
                    let p2=Number(elems[1].value.length==0?"0":elems[1].value);
                    if(Number(p2)<=Number(p1)){
                        alert(
                            elemL.textContent
                            +` не может ${elems[0].previousSibling?.textContent }` 
                            +"быть больше "+ 
                            elems[1].parentNode?.firstChild?.textContent
                            
                        );
                        success=false;
                        return;
                    }
                  
                    fieldAndCheckers.push({name:s,predicate:(p)=> p1<=Number(p)&&Number(p)<=p2})
                }
            }
           
        
    });
    if(fieldAndCheckers.length==0&&success){
        alert("Поля не заполнены");
        return ;
    }
    else if(!success){return;}
    return fieldAndCheckers;
}
function filter(secFilterSet:HTMLElement,whatSec:HTMLElement):void{
    let arr=arrFilterElem(secFilterSet);
    if(!arr)return;
    let elems=<HTMLElement[]>[...whatSec.querySelectorAll(".dish")];
    elems.forEach(elem=>{
        arr?.forEach(x=>{
            let el=selector(elem,x.name);
            if(!x.predicate(el?.innerHTML)){
                elem.style.display='none';
            }
            else elem.style.display=''
        })
    })
}
type FieldAndChecker={
    name:string,
    predicate:(p?:string)=>boolean;
}
function offFilterFun(elem:HTMLElement):void{
    let elems=<HTMLInputElement[]>[...elem.querySelectorAll(".dish")];
    elems.forEach(x=>x.style.display="flex");
}