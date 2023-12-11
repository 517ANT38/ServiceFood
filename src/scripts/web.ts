let getData=function getData<T>(url:string){
    return <Promise<T[]>>fetch(url,{method:"GET",})
        .then(x=>x.text())
        .then(x=>x==""?{}:JSON.parse(x))        
        
}
function write<T>(prom:T[],wr:Writeable<T>,elem:HTMLElement){
    wr.write(prom,elem);
}


function sendData(a:object,url:string){
    
    return fetch(url,{
        method:"POST",
        
        headers:{
            'Content-Type':'application/json;charset=utf-8',
            'Accept':'text/plain'
        },
        body:JSON.stringify(a)
    });
    
    
}

interface Writeable<T>{
    write(data:T[],elem?:HTMLElement|null):void;
}
function getBase64  (file:File){ 
    let p:Promise<string> =new Promise<string>(
    function (resolve, reject) {
        let reader = new FileReader();    
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString()??"")
        reader.onerror = (error) => reject(error);
    
    });
    return p;
}
interface ObjCollection<T>{
    Arr:T[]
}
function deleteDish(id:string,url:string,elem:HTMLElement){
    let a=fetch(url+"/"+id,{"method":"DELETE"});
    a.catch(x=>alert("У нас неполадки"))
    elem.remove();
}
function sendDataPut(a:object,url:string){
    
    return fetch(url,{
        method:"PUT",
        
        headers:{
            'Content-Type':'application/json;charset=utf-8',
            'Accept':'text/plain'
        },
        body:JSON.stringify(a)
    });
    
    
}



















            // 'Access-Control-Allow-Orgin':'*',
            // 'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS, HEAD',
            // 'Access-Control-Allow-Credentials':'true',
            // 'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept, Authorization'
