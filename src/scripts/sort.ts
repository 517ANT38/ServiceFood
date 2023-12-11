const selector=(elem:HTMLElement,x:string)=>elem
.querySelector(`.desc>.bord>span[name='${x}']`);
function startSort(secSortSet:HTMLElement,whatSec:HTMLElement):void{    
    let paramSort=preSort(secSortSet);    
    sort(whatSec,paramSort);
}
function preSort(secSortSet:HTMLElement):[string,string][]{
    let elems=secSortSet.querySelectorAll("div");
    let paramSort:[string,string][]=[]
    for(let item of elems){
        let vsort=(<HTMLInputElement>document.querySelector("input:checked"))?.name;
        
        let tsort=(<HTMLInputElement>document.querySelector("input[type='radio']:checked"))?.value;
        if(vsort&&tsort)
            paramSort.push([vsort,tsort]);
    }
    return paramSort;
}
function sort(whatSec:HTMLElement,paramSort:[string,string][]):void{
   
    
    let elems=[...whatSec.querySelectorAll(".dish")];
    
    let o=paramSort[0];
    elems=elems.sort((a,b)=>compare(a,b,o));
    for(let i=1;i<paramSort.length;i++)
    {
        o=paramSort[i];
        elems=elems.sort((a,b)=>compare(a,b,o));
    }
    removeChild(whatSec);
    elems.forEach(x=>whatSec.appendChild(x));
}
type Selector=(elem:HTMLElement,x:string)=>Element|null;
const compare=(a:Element,b:Element,o:[string,string])=>{
        
    let p1:Element|null|number=selector(<HTMLElement>a,o?.[0]);
    let p2:Element|null|number=selector(<HTMLElement>b,o?.[0]);
    
    let type=p1?.getAttribute("type");
    if(type){
        if(type=="number"){
            console.log(o[1]);
            p1=Number(p1?.innerHTML);
            p2=Number(p2?.innerHTML);
            return o?.[1]=="asc"?p2-p1:p1-p2;   
        }
    }
    const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: "base"});
    
    [p1, p2] =  o?.[1]=="asc"? [p1, p2] : [p2, p1]; 
    let s=p1?.innerHTML?p1.innerHTML:"";
    let s1=p2?.innerHTML?p2.innerHTML:"";
    return collator.compare(s,s1);
}
function resetInput(secSortSet:HTMLElement):void{
    let arr=secSortSet.querySelectorAll("input");
    arr.forEach(elem=>elem.checked=false);
    arr.forEach(elem=>elem.value="");
}
