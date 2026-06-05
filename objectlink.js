//objectlink
//core
const ROOT=0,MIND=1,ID=0,V=1,L=2
const OL=[[ROOT,"/",[ROOT,MIND]],[MIND,"#Mind",[ROOT]]]
const mind={
  oid:ROOT,
  pid:ROOT,
  ol:OL,
  oli:{},
  go:(id)=>mind.ol[id],
  gl:(id)=>go(id)[L],
  gid:(v)=>(mind.oli[btoa(v)]||[])[ID],
  co:(v,cid=ROOT)=>{
    const id=mind.ol.length
    const o=[id,v,[]]
    mind.ol.push(o)
    mind.oli[btoa(v)]=o
    cl(id,cid)
    return id
  },
  cl:(oid1,oid2)=>{
    if (!il(oid1,oid2)){
      gl(oid1).push(oid2)
      gl(oid2).push(oid1)
      gl(oid1).sort(compareNumeric)
      gl(oid2).sort(compareNumeric)
      if (oid1===MIND&&!ic(oid2)) eo(oid2)
      if (oid2===MIND&&!ic(oid1)) eo(oid1)
      //er(oid1,oid2)
      return true
    } else return false
  },
  gv:(id)=>go(id)[V],
  ic:(id)=>gl(id)[0]===0,
  il:(oid1,oid2)=>includes(gl(oid1),oid2),
  dl:(oid1,oid2)=>{
    const l1=gl(oid1)
    const ind1=binSearch(l1,oid2)
    if (ind1===0||ind1) l1.splice(ind1,1)
    const l2=gl(oid2)
    const ind2=binSearch(l2,oid1)
    if (ind2===0||ind2) l2.splice(ind2,1)
  },
  ga:(oids)=>oids
    .map(e => gl(e))
    .reduce((a,b) => intersec(a,b)),
  coli:()=>mind.ol.forEach(o=>mind.oli[btoa(o[V])]=o),
  eo:(oid)=>eval(gv(oid)),
}
//mind
mind.cm=(v)=>co(v,MIND)
mind.im=(oid)=>oid>0&&il(oid,MIND)
mind.em=(oid)=>mind.im(oid)&&eo(oid)
mind.ems=()=>{
  const mids=gl(MIND)
  mids&&mids
    .filter(it=>!ic(it))
    .forEach(it=>eo(it))
}
mind.cmfs=()=>Object
    .entries(mind)
    .filter(it=>typeof it[1]==="function")
    .forEach(it=>mind.cm("mind."+it[0]+"="+it[1]))

//core utils
//const ol=mind.ol
//const oli=mind.oli
const go=mind.go
const gl=mind.gl
const co=mind.co
const il=mind.il
const cl=mind.cl
const gid=mind.gid

const gv=mind.gv
const ic=mind.ic
const dl=mind.dl
const ga=mind.ga
const coli=mind.coli
const eo=mind.eo

