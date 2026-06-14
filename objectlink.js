//objectlink
//core
const ROOT=0,MIND=1,ID=0,V=1,L=2
const OL=[[ROOT,"/",[ROOT,MIND]],[MIND,"#Mind",[ROOT]]]
const mind={
  oid:ROOT,
  pid:ROOT,
  ol:OL,
  oli:{},
  iem:true
}
mind.go=(id)=>mind.ol[id],
mind.gl=(id)=>mind.go(id)[L],
mind.gid=(v)=>(mind.oli[v]||[])[ID],
mind.co=(v,cid=ROOT)=>{
  var id=mind.gid(v)
  if (id>=0) return id
  id=mind.ol.length
  const o=[id,v,[]]
  mind.ol.push(o)
  mind.oli[v]=o
  mind.cl(id,cid)
  return id
}
mind.cl=(oid1,oid2)=>{
  if (!mind.il(oid1,oid2)){
    mind.gl(oid1).push(oid2)
    mind.gl(oid2).push(oid1)
    mind.gl(oid1).sort(compareNumeric)
    mind.gl(oid2).sort(compareNumeric)
    if (oid1===MIND&&!mind.ic(oid2)) mind.em(oid2)
    if (oid2===MIND&&!mind.ic(oid1)) mind.em(oid1)
    mind.er(oid1,oid2)
    return true
  } else return false
}
mind.gv=(id)=>mind.go(id)[V]
mind.ic=(id)=>mind.gl(id)[0]===0
mind.il=(oid1,oid2)=>includes(mind.gl(oid1),oid2)
mind.dl=(oid1,oid2)=>{
  const l1=mind.gl(oid1)
  const ind1=binSearch(l1,oid2)
  if (ind1===0||ind1) l1.splice(ind1,1)
  const l2=mind.gl(oid2)
  const ind2=binSearch(l2,oid1)
  if (ind2===0||ind2) l2.splice(ind2,1)
}
mind.ga=(oids)=>oids
  .map(e => mind.gl(e))
  .reduce((a,b) => intersec(a,b))
mind.coli=()=>mind.ol.forEach(o=>mind.oli[o[V]]=o)
mind.eo=(oid)=>eval(mind.gv(oid))

//mind
mind.cm=(v)=>mind.co(v,MIND)
mind.im=(oid)=>oid>0&&!mind.ic(oid)&&mind.il(oid,MIND)
mind.em=(oid)=>mind.im(oid)
  &&(mind.iem||confirm(mind.gv(oid)))
  &&mind.eo(oid)
  &&mind.aem(true)
mind.aem=(bool)=>{
  mind.iem=bool
  return true
}
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

//rule
const RULE="#Rule"
const RULE_WATCH="#RuleWatch"
const RULE_LINK="#RuleLink"
mind.grw=(oid1,oid2)=>{
  const rw=mind.gid(RULE_WATCH)
  if (!rw) return
  const w1=mind.ga([oid1,rw])[0]
  const w2=mind.ga([oid2,rw])[0]
  return !!w1&&!!w2 && w1
}
mind.er=(oid1,oid2)=>{
  const rwid=mind.il(oid1,oid2)
     && mind.grw(oid1,oid2)
  const r=mind.gid(RULE)
  const rid=rwid && mind.ga([rwid,r])[1]
  const rl=mind.gid(RULE_LINK)
  const rlid=rid && mind.ga([rid,rl])[1]
  const lids=rlid && mind.gl(rlid)
  const llids=!!lids && lids
    .filter(id=>!mind.il(id,r))
  if (!!llids && llids.length===2) {
    mind.cl(llids[0],llids[1])
    return true
  }
}
