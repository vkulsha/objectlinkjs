//user-pswd-session
const USER="#User"
const PSWD="#Password"
const SESSION="#Session"
mind.gs=(u,p)=>{
  const uid=mind.gid(u)
  const pid=uid
    && mind.il(uid,mind.gid(USER))
    && mind.gid(p)
  const sid=pid
    && mind.il(pid,mind.gid(PSWD))
    && mind.il(uid,pid)
    && mind.co(crypto.randomUUID(),mind.gid(SESSION))
  return sid 
    && mind.cl(sid,uid) 
    && mind.cl(sid,pid) 
    && sid
}

mind.login=()=>{
  const u=mind.co(USER)
  const p=mind.co(PSWD)
  const s=mind.co(SESSION)
  mind.cl(u,p)
  mind.cl(s,u)
  mind.cl(s,p)
  const defu="root"
  const defp="password"
  const ru=mind.co(defu, u)
  const rp=mind.co(defp, p)
  mind.cl(ru,rp)
  const uv=prompt("enter login:", defu)
  const pv=prompt("enter password:", defp)
  if (mind.gs(uv,pv)) mind.initInterface()
}

//mind functions
mind.log=(v)=>{
  v=typeof v==="string" ? v : JSON.stringify(v)
  console.log(v)
  window.alert(v)
}

mind.get=(eid)=>document.getElementById(eid)
mind.set=(n="div")=>document.createElement(n)

mind.getset=(eid,func)=>{
  const obj=mind.get(eid)
  return !obj ? func(eid=eid) : obj
}

mind.div=(eid)=>{
  return mind.getset(eid, (eid)=>{
    const div=mind.set("div");
    div.id=eid;
    div.style.width="100%";
    document.body.appendChild(div);
    return div;
  })
}

mind.ctrl=()=>{
  const div=mind.div("ctrl")
  div.style.position="fixed"
  div.style.zIndex=Number.MAX_SAFE_INTEGER
  div.style.backgroundColor="#ffffff"
  div.style.top="0"
  div.style.height="35"
  return div
}

mind.data=()=>{
  const div=mind.div("data")
  div.style.top="35px"
  div.style.position="relative"
  return div
}

mind.focus=()=>{
  return mind.getset("focus",(eid)=>{
    const b=mind.crb([mind.oid,mind.pid],eid);
    b.onclick=()=>{
      window.alert(mind.gv(mind.oid))
    }
    mind.ctrl().appendChild(b);
    return b
  })
}

mind.clk=(e)=>{
  const data=mind.data();
  data.innerHTML="";
  const oid=e.target.oid;
  mind.oid=oid;
  mind.gl(oid)
    .slice()
    .sort((a,b)=>mind.ic(a)&&mind.ic(b)?0:(mind.ic(a)?-1:compareNumeric(a,b)))
    .forEach(id=>data.appendChild(mind.but(id)));
  mind.focus().innerHTML=[mind.oid,mind.pid]
  mind.aem(false)
  mind.em(oid)
}

mind.crb=(v,id)=>{
  const b=mind.get(id)
    || mind.set("button");
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
  const v=mind.gv(oid);
  const isc=mind.ic(oid);
  const b=mind.crb(v,"b"+oid);
  b.ic=isc;
  b.style.width="100%";
  b.style.fontWeight=isc?"bold":"normal";
  b.oid=oid;
  b.onclick=mind.clk;
  return b;
}

mind.add=()=>{
  return mind.getset("add",(eid)=>{
    const b=mind.crb("new",eid);
    b.onclick=()=>{
      const oid=mind.oid
      if (!mind.ic(oid)){
        mind.lnk().click();
        return;
      };
      const p=mind.go(oid);
      const isr=oid===ROOT;
      const cnt=mind.gl(oid).length;
      const defVal=isr
        ? "Class"+cnt
        : mind.gv(oid).toLowerCase()+"_"+cnt;
      var v=prompt("add object (e.g. "+defVal+"):");
      v=!v&&v!=null&&defVal||v;
      const obj=mind.gid(v);
      if (!!v&&!!obj) {
        mind.pid=obj;
        mind.lnk().click();
        return;
      };
      if (!v) return;
      mind.aem(false)
      const id=mind.co(v,oid);
      mind.data().appendChild(mind.but(id));
    };
    mind.ctrl().appendChild(b);
  })
};

mind.lnk=()=>{
  return mind.getset("lnk",(eid)=>{
    const b=mind.crb("link",eid);
    b.onclick=()=>{
      const oid=mind.oid;
      const pid=mind.pid;
      if (pid && pid != oid) {
        const isl=mind.il(oid,pid);
        !isl &&
        confirm("add link between:\n"+mind.gv(oid)+"\n\nand:\n"+mind.gv(pid)
        ) && mind.aem(false) && mind.cl(oid,pid)
        ||
        isl &&
        confirm("delete link between:\n"+mind.gv(oid)+"\n\nand:\n"+mind.gv(pid)) &&
        mind.dl(oid,pid);
        mind.pid=ROOT;
        mind.but(mind.oid).click();
      } else {
        mind.pid=oid;
        window.alert("Selected object "+oid+": "+mind.gv(oid)+"\nSelect another and click link")
      };
    };
    mind.ctrl().appendChild(b);
    return b
  })
};

mind.edit=()=>{
  return mind.getset("edit",(eid)=>{
    const b=mind.crb("edit",eid);
    b.onclick=()=>{
     const obj=mind.go(mind.oid);
     const v=prompt("edit",obj[V]);
     if (!v) return;
     obj[V]=v;
    };
    mind.ctrl().appendChild(b);
  })
};

mind.exp=()=>{
  return mind.getset("exp",(eid)=>{
    const b=mind.crb("save",eid);
    b.onclick=()=>{
      confirm("save?")&&
      localStorage.setItem("ol", JSON.stringify(mind.ol))
      const a = mind.set("a")
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
    mind.ctrl().appendChild(b);
  })
};

mind.imp=()=>{
  return mind.getset("imp",(eid)=>{
    const b=mind.crb("load",eid);
    b.onclick=()=>{
      const div=mind.set("input");
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
    mind.ctrl().appendChild(b);
  })
};

mind.ev=()=>{
  return mind.getset("eval",(eid)=>{
  const b=mind.crb("eval",eid);
    b.onclick=()=>{
      mind.log(eval(prompt("eval")));
    };
    mind.ctrl().appendChild(b);
  })
};

mind.initRoot=()=>{
  const id=mind.oid||ROOT;
  const broot=mind.but(id);
  mind.data().appendChild(broot);
  broot.click();
};

mind.initInterface=()=>{
  mind.ctrl();
  mind.data();
  mind.add();
  mind.lnk();
  mind.edit();
  mind.exp();
  mind.imp();
  mind.ev();
  mind.focus();
  mind.initRoot();
};

//init
mind.loadLocalStorageDB=()=>{
  const db=localStorage.getItem("ol")
  mind.ol=db&&JSON.parse(db)||mind.ol
  mind.coli()
  mind.ems()
}

mind.initNewDB=()=>{
  const rid=mind.co(RULE)
  mind.cl(mind.co(RULE_WATCH),rid)
  mind.cl(mind.co(RULE_LINK),rid)
  mind.cmfs()
  mind.cm("mind.login()")
  //mind.cm("mind.initInterface()")
};

mind.init=()=>{
  mind.loadLocalStorageDB()
  mind.ol.length===OL.length && mind.initNewDB()
}

addEventListener('load',(e)=>mind.init())
