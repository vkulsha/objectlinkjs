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

//init new db mind functions
mind.logstr=(v)=>
  mind.get("result").innerHTML=v

mind.logres=(v)=>typeof v==="string" ?
  mind.logstr(v) :
  mind.logstr(JSON.stringify(v))

mind.get=(v)=>document.getElementById(v)

mind.ctrl=()=>{
  const div=document.createElement("div");
  div.id="ctrl";
  div.style.width="100%";
  document.body.appendChild(div);
}

mind.data=()=>{
  const div=document.createElement("div"); 
  div.id="data";
  div.style.width="100%";
  document.body.appendChild(div);
}

mind.result=()=>{
  const div=document.createElement("div");
  div.id="result";
  div.style.width="100%";
  div.style.marginTop="10px";
  document.body.appendChild(div);
}

mind.clk=(e)=>{
  const data=document.getElementById("data");
  data.innerHTML="";
  const oid=e.target.oid;
  mind.oid=oid;
  gl(oid).forEach(id=>data.appendChild(mind.but(id)));
  mind.get("focus").innerHTML=[mind.oid,mind.pid]
  mind.logres("")
  mind.em(oid)
}

mind.crb=(v,id)=>{
  const b=document.getElementById(id)
    || document.createElement("button");
  b.innerHTML=v;
  b.id=id;
  b.style.fontSize="14px";
  b.style.borderRadius="10px"
  b.style.backgroundColor="#00ccff"
  b.style.borderWidth="0px"
  b.style.margin="5px 5px 1px 5px"
  b.style.padding="5px 5px 5px 5px"
  return b;
}

mind.but=(oid)=>{
  const v=gv(oid);
  const isc=ic(oid);
  const b=mind.crb(v,"b"+oid);
  b.ic=isc;
  b.style.width="100%";
  b.style.fontWeight=isc?"bold":"normal";
  b.oid=oid;
  b.onclick=mind.clk;
  return b;
}

mind.focus=()=>{
  const b=mind.crb([mind.oid,mind.pid],"focus");
  b.onclick=()=>{
    window.alert(gv(mind.oid))
  }
  mind.get("ctrl").appendChild(b);
}

mind.add=()=>{
  const b=mind.crb("new","add");
  b.onclick=()=>{
    const oid=mind.oid
    if (!ic(oid)){
      mind.get("lnk").click();
      return;
    };
    const p=go(oid);
    const isr=oid===ROOT;
    const cnt=gl(oid).length;
    const defVal=isr
      ? "Class"+cnt
      : gv(oid).toLowerCase()+"_"+cnt;
    var v=prompt("add object (e.g. "+defVal+"):");
    v=!v&&v!=null&&defVal||v;
    const obj=gid(v);
    if (!!v&&!!obj) {
      mind.pid=obj;
      mind.get("lnk").click();
      return;
    };
    if (!v) return;
    const id=co(v,oid);
    mind.get("data").appendChild(mind.but(id));
  };
  mind.get("ctrl").appendChild(b);
};

mind.lnk=()=>{
  const b=mind.crb("link","lnk");
  b.onclick=()=>{
    const oid=mind.oid;
    const pid=mind.pid;
    if (pid && pid != oid) {
      const isl=il(oid,pid);
      !isl &&
      confirm("add link between "+gv(oid)+" & "+gv(pid)
      ) && cl(oid,pid)
      ||
      isl &&
      confirm("delete link between "+gv(oid)+" & "+gv(pid)) &&
      dl(oid,pid);
      mind.pid=ROOT;
      mind.but(mind.oid).click();
    } else {
      mind.pid=oid;
      mind.logres("Selected object "+oid+": "+gv(oid)+"<br>Select another and click link")
    };
  };
  mind.get("ctrl").appendChild(b);
};

mind.edit=()=>{
  const b=mind.crb("edit","edit");
  b.onclick=()=>{
   const obj=go(mind.oid);
   const v=prompt("edit",obj[V]);
   if (!v) return;
   obj[V]=v;
  };
  mind.get("ctrl").appendChild(b);
};

mind.exp=()=>{
  const b=mind.crb("save","exp");
  b.onclick=()=>{
    confirm("save?")&&
    localStorage.setItem("ol", JSON.stringify(mind.ol))
    const a = document.createElement("a")
    const url = URL.createObjectURL(new Blob([JSON.stringify(mind.ol)], {
      type: "application/json"
    }))
    a.href=url
    const now=new Date()
    a.download="objectlink_"+now.toLocaleDateString()+".json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  };
  mind.get("ctrl").appendChild(b);
};

mind.imp=()=>{
  const b=mind.crb("load","imp");
  b.onclick=()=>{
    const div=document.createElement("input");
    div.type="file"
    div.id="import"
    div.accept=".json"
    div.hidden=true
    div.onchange=()=>{
      var fileread = new FileReader()
      fileread.onload=(e)=>{
        mind.ol = JSON.parse(e.target.result)
        mind.initRoot();
      }
      fileread.readAsText(div.files[0])
    }
    document.body.appendChild(div)
    div.click()
    document.body.removeChild(div)
  };
  mind.get("ctrl").appendChild(b);
};

mind.ev=()=>{
  const b=mind.crb("eval","eval");
  b.onclick=()=>{
    mind.logres(eval(prompt("eval")));
  };
  mind.get("ctrl").appendChild(b);
};

mind.initRoot=()=>{
  const id=mind.oid||ROOT;
  const broot=mind.but(id);
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
  mind.focus();
  mind.initRoot();
};

