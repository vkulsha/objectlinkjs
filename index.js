//objectlink core
const OL=[[0,"/",[0]]]
const ID=0,V=1,L=2
var   ol=OL
const oli={}
const go=(id)=>ol[id]
const gv=(id)=>(go(id)||[])[V]
const gl=(id)=>(go(id)||[])[L]
const gid=(v)=>(oli[md5(v)]||[])[ID]
const ic=(id)=>includes(gl(0),id)
const il=(oid1,oid2)=>
  includes(gl(oid1),oid2)
const cl=(oid1,oid2)=>{
  if (!il(oid1,oid2)){
    gl(oid1).push(oid2)
    gl(oid2).push(oid1)
    gl(oid1).sort(compareNumeric)
    gl(oid2).sort(compareNumeric)
    er(oid1,oid2)//todo move to but.link?
    return true
  } else return false
}
const dl=(oid1,oid2)=>{
  if (il(oid1,oid2)){
    go(oid1)[L]=gl(oid1)
      .filter(e=>e!=oid2)
    go(oid2)[L]=gl(oid2)
      .filter(e=>e!=oid1)
  }
}
const co=(v,cid=0)=>{
  const id=ol.length
  ol.push([id, v, []])
  cl(id,cid)
  return id
}
const ga=(oids)=>oids
    .map(e => gl(e))
    .reduce((a,b) => intersec(a,b))

//mind
const MIND="#Mind"
const em=()=>{
  const mid=gid(MIND)
  const mids=mid&&gl(mid)
  mids
    .filter(it=>!ic(it))
    .forEach(it=>{
       log(gv(it))
       eval(gv(it))
    })
}
const cm=(v)=>{
  const mid=gid(MIND)
  mid&&co(v,mid)
}
//rule
const RULE="#Rule"
const RULE_WATCH="#RuleWatch"
const RULE_LINK="#RuleLink"
const grw=(oid1,oid2)=>{
  const rw=gid(RULE_WATCH)
  const w1=ga([oid1,rw])[0]
  const w2=ga([oid2,rw])[0]
  return !!w1&&!!w2 && w1
}
const er=(oid1,oid2)=>{
  const rwid=il(oid1,oid2)
     && grw(oid1,oid2)
  const r=gid(RULE)
  const rid=rwid && ga([rwid,r])[0]
  const rl=gid(RULE_LINK)
  const rlid=rid && ga([rid,rl])[0]
  const lids=rlid && gl(rlid)
  const llids=!!lids && lids
    .filter(id=>!ic(id)&&!il(id,r))
  if (!!llids && llids.length===2) {
    cl(llids[0],llids[1])
    return true
  }
}

//user-pswd-session
const USER="#User"
const PSWD="#Password"
const SESSION="#Session"
const gs=(u,p)=>{
  const uid=gid(u)
  const pid=uid
    && il(uid,gid(USER))
    && gid(p)
  const sid=pid
    && il(pid,gid(PSWD))
    && il(uid,pid)
    && co(crypto.randomUUID(),gid(SESSION))
  return sid && cl(sid,uid) && sid
}


//front core
const log=console.log
const mind={oid:0,pid:0}
const mapfo=(ref,callback)=>{
  Object
    .entries(ref)
    .filter(it=>typeof it[1]==="function")
    .forEach(it=>callback(it[0],it[1]))
  
}
const cmf=(n,f)=>cm("mind."+n+"="+f)
const cmfs=()=>mapfo(mind,cmf)

//init new db mind functions
mind.logstr=(v)=>
  mind.get("result").innerHTML=v;

mind.logres=(v)=>typeof v==="string" ?
  mind.logstr(v) :
  mind.logstr(JSON.stringify(v));

mind.get=(v)=>document.getElementById(v);

mind.ctrl=()=>{
  const div=document.createElement("div");  
  div.id="ctrl";
  div.style.width="100%";
  document.body.appendChild(div);
};

mind.data=()=>{
  const div=document.createElement("div");  
  div.id="data";
  div.style.width="100%";
  document.body.appendChild(div);
};

mind.result=()=>{
  const div=document.createElement("div");  
  div.id="result";
  div.style.width="100%";
  div.style.marginTop="10px";
  document.body.appendChild(div);
};

mind.crb=(v,id)=>{
  const b=mind.get(id)
    || document.createElement("button");
  b.innerHTML=v;
  b.id=id;
  return b;
};

mind.clk=(e)=>{
  const data=mind.get("data");
  data.innerHTML="";
  const oid=e.target.oid;
  mind.oid=oid;
  gl(oid).forEach(id=>{
    const obj=go(id);
    data.appendChild(mind.but(obj));
  });
  mind.logres([mind.oid,mind.pid]);
};

mind.but=(obj)=>{
  const oid=obj[ID];
  const v=obj[V];
  const isc=ic(oid);
  const b=mind.crb(v,"b"+oid);
  b.style.width="100%";
  b.style.fontSize="16px";
  b.ic=isc;
  b.style.fontWeight=isc?"bold":"normal";
  b.oid=oid;
  b.onclick=mind.clk;
  return b;
};

mind.add=()=>{
  const b=mind.crb("+","add");
  b.style.backgroundColor="white";
  b.style.fontSize="16px";
  b.onclick=()=>{
    if (!ic(mind.oid)){
      mind.get("lnk").click();
      return;
    };
    const p=go(mind.oid);
    const pid=p[ID];
    const isr=pid===0;
    const cnt=isr?
      gl(0).length:
      gl(pid).length;
    const defVal=isr?
      "Group"+cnt:
      p[V].toLowerCase()+"_"+cnt;
    var v=prompt(
      "add object (e.g. "+
      defVal+"):");
    v=!v&&v!=null&&defVal||v;
    const obj=gid(v);
    if (!!v&&!!obj) {
      mind.pid=obj;
      mind.get("lnk").click();
      return;
    };
    if (!v) return;
    const id=co(
      v,
      pid);
    const o=go(id);
    oli[md5(v)]=o;//todo move to co()
    mind.get("data")
      .appendChild(mind.but(o));
  };
  mind.get("ctrl").appendChild(b);
};

mind.lnk=()=>{
  const b=mind.crb("<>","lnk");
  b.style.backgroundColor="white";
  b.style.fontSize="16px";
  b.onclick=()=>{
    const oid=mind.oid;
    const pid=mind.pid;
    if (pid && pid != oid) {
      const isl=il(oid,pid);
      !isl &&
      confirm("+link? "
        +gv(oid)
        +" & "
        +gv(pid)
      )&&cl(oid,pid)
      ||
      isl &&
      confirm("-link?"+oid+","+pid)&&
      dl(oid,pid);
      mind.pid=0;
      mind.but(go(mind.oid)).click();
    } else {
      mind.pid=oid;
    };
    mind.logres([mind.oid,mind.pid]);
  };
  mind.get("ctrl").appendChild(b);
};

mind.edit=()=>{
  const b=mind.crb("..","edit");
  b.style.backgroundColor="white";
  b.style.fontSize="16px";
  b.onclick=()=>{
   const obj=go(mind.oid);
   const v=prompt("edit",obj[V]);
   if (!v) return;
   obj[V]=v;
  };
  mind.get("ctrl").appendChild(b);
};

mind.exp=()=>{
  const b=mind.crb(">>","exp");
  b.style.backgroundColor="white";
  b.style.fontSize="16px";
  b.onclick=()=>{
   confirm("save?")&&
   localStorage.setItem(
     "ol",
     JSON.stringify(ol))
  };
  mind.get("ctrl").appendChild(b);
};

mind.imp=()=>{
  const b=mind.crb("<<","imp");
  b.style.backgroundColor="white";
  b.style.fontSize="16px";
  b.onclick=()=>{
    const inp=prompt("import?",
      JSON.stringify(OL));
    ol=inp&&JSON.parse(inp)||ol;
    mind.initRoot();
  };
  mind.get("ctrl").appendChild(b);
};

mind.ev=()=>{
  const b=mind.crb("ev","eval");
  b.style.backgroundColor="white";
  b.style.fontSize="16px";
  b.onclick=()=>{
    mind.logres(eval(prompt("eval")));
  };
  mind.get("ctrl").appendChild(b);
};

mind.initRoot=()=>{
  const id=mind.oid||0;
  const root=go(id)||go(0);
  const broot=mind.but(root);
  mind.get("data").appendChild(broot);
  broot.click();
};

mind.initInterface=()=>{
  mind.ctrl();
  mind.data();
  mind.result();
  mind.add();
  mind.lnk();
  mind.edit();
  mind.exp();
  mind.imp();
  mind.ev();
  mind.initRoot();
};

mind.initOli=()=>
  ol.forEach(o=>oli[md5(o[V])]=o);

const initNewDB=()=>{
  log("saved.size "+ol.length)
  co(MIND)
  co(RULE)
  co(RULE_WATCH)
  co(RULE_LINK)
  mind.initOli()
  cmfs();
  cm("mind.initInterface();")
  log("real.size "+ol.length)
};

const initLocalDB=()=>{
  const db=localStorage.getItem("ol")
  ol=db&&JSON.parse(db)||ol
  if (ol.length===1) initNewDB()
  mind.initOli()
}

const cls=()=>{
  const b=mind.crb("cls","cls")
  b.style.backgroundColor="white"
  b.style.fontSize="16px"
  b.onclick=()=>{
    ol=OL
    mind.get("exp").click()
    init()
  }
  mind.get("ctrl").appendChild(b)
}

const init=()=>{
  initLocalDB()
  em()
  //cls() //clear with default DB
}

addEventListener('load',function(e){
  init()
})


//utils
function intersec(
  arr1=[],
  arr2=[],
  issort=false)
{
  if (issort){
    arr1.sort(compareNumeric)
    arr2.sort(compareNumeric)
  }
  const m = arr1.length, 
        n = arr2.length, 
        res = [];
  let i = 0, j = 0;
  while ((i < m)&& (j < n)){
    if(arr1[i]===arr2[j]){
            res.push(arr1[i]);
            i++; j++;
    } else {
      arr1[i] < arr2[j]
      ? i++
      : j++;
    }
  }
  return res;
}
function search(
  arr=[],
  val,
  issort=false)
{
  if(issort) arr.sort(compareNumeric)
  let i = 0, j = arr.length;
  while (i < j) {
    let k = Math.floor((i+j)/2);
    if (val <= arr[k]) j = k;
    else i = k + 1;
  }
  return arr.length && arr[i]===val 
    ? i 
    : undefined;
}
function includes(
  arr=[],
  val,
  issort=false)
{
  return search(arr,val,issort)>=0
}
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}
function md5(d){return rstr2hex(binl2rstr(binl_md5(rstr2binl(d),8*d.length)))}function rstr2hex(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function rstr2binl(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function binl2rstr(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function binl_md5(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_
}
async function sha(input) {
  const textAsBuffer = 
    new TextEncoder().encode(input);
  const hashBuffer = await
    window.crypto.subtle.digest(
      "SHA-256",
      textAsBuffer);
  const hashArray = Array.from(
    new Uint8Array(hashBuffer));
  const hash = hashArray
    .map((item) => item
      .toString(16)
      .padStart(2,"0"))
    .join("");
  return hash;
}
