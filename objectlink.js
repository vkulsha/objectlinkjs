//objectlink
//core
const ROOT=0,MIND=1,ID=0,V=1,L=2
const OL=[[ROOT,"/",[ROOT,MIND]],[MIND,"#Mind",[ROOT]]]
const mind={
  oid:ROOT,
  pid:ROOT,
  ol:OL,
  oli:{}
}
mind.go=(id)=>mind.ol[id],
mind.gl=(id)=>mind.go(id)[L],
mind.gid=(v)=>(mind.oli[btoa(v)]||[])[ID],
mind.co=(v,cid=ROOT)=>{
    const id=mind.ol.length
    const o=[id,v,[]]
    mind.ol.push(o)
    mind.oli[btoa(v)]=o
    mind.cl(id,cid)
    return id
  },
mind.cl=(oid1,oid2)=>{
    if (!mind.il(oid1,oid2)){
      mind.gl(oid1).push(oid2)
      mind.gl(oid2).push(oid1)
      mind.gl(oid1).sort(compareNumeric)
      mind.gl(oid2).sort(compareNumeric)
      if (oid1===MIND&&!mind.ic(oid2)) mind.eo(oid2)
      if (oid2===MIND&&!mind.ic(oid1)) mind.eo(oid1)
      //er(oid1,oid2)
      return true
    } else return false
  },
mind.gv=(id)=>mind.go(id)[V],
mind.ic=(id)=>mind.gl(id)[0]===0,
mind.il=(oid1,oid2)=>includes(mind.gl(oid1),oid2),
mind.dl=(oid1,oid2)=>{
    const l1=mind.gl(oid1)
    const ind1=binSearch(l1,oid2)
    if (ind1===0||ind1) l1.splice(ind1,1)
    const l2=mind.gl(oid2)
    const ind2=binSearch(l2,oid1)
    if (ind2===0||ind2) l2.splice(ind2,1)
  },
mind.ga=(oids)=>oids
    .map(e => mind.gl(e))
    .reduce((a,b) => intersec(a,b)),
mind.coli=()=>mind.ol.forEach(o=>mind.oli[btoa(o[V])]=o),
mind.eo=(oid)=>eval(mind.gv(oid)),

//mind
mind.cm=(v)=>mind.co(v,MIND)
mind.im=(oid)=>oid>0&&mind.il(oid,MIND)
mind.em=(oid)=>mind.im(oid)&&mind.eo(oid)
mind.ems=()=>{
  const mids=mind.gl(MIND)
  mids&&mids
    .filter(it=>!mind.ic(it))
    .forEach(it=>mind.eo(it))
}
mind.cmfs=()=>Object
    .entries(mind)
    .filter(it=>typeof it[1]==="function")
    .forEach(it=>mind.cm("mind."+it[0]+"="+it[1]))
