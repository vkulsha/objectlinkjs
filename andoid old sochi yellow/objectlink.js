const log = console.log;
const dt = Date.now;
const fs = {};//require('fs');
const root = 0;
const ROOT = '#root', RULE='#rule', USER='#user', PASS='#pass', GL='gL', CL='cL', ACCESS='#access', SESSION='#session';
const ol = [[ROOT,[[0,1,dt(),0]],[0]]];
const oi = {[ol[root][0]] : root};
const V=0, L=1, ID=0, W=1, T=2, U=3;
const cnt = () => ol.length;
const ccnt = (id) => id && gL(id).filter(o=>!isC(o[0])).length;
const filename = 'objectlink.json';
const gO = (id) => id && id.map && id.map(gO_()) || gO_()(id);
const gO_ = (obj=ol) => (id) => obj[id];
const gV = (id) => gV_(gO(id) || [null]);
const gV_ = (gO) => gO && gO.length && gO[V];
const gL = (id) => id && id.map && gO(id).map(gL_) || gL_(gO(id));
const gL_ = (gO) => gO && gO.length && gO[L];
const gA = (list) => gA_(list.map(e => gL(e)));
const gA_ = (gL) => gL.reduce((a,b) => intersec(a,b));
const gLO = (pid) => (id) => gLO_(gL(pid) || [])(id);
const gLO_ = (gL) => (id) => !!gOL_(gL)(id);
const gOI = (v) => gOI_()(v);
const gOI_ = (obj=oi) => (v) => obj[v];
const gOL = (pid, id) => gOL_(gL(pid))(id);
const gOL_ = (gL) => (id) => gL[search(gL || [], id)];
const gW = (pid, id) => gW_(gOL(pid, id));
const gW_ = (gOL) => gOL[W];
const gT = (pid, id) => gT_(gOL(pid, id));
const gT_ = (gOL) => gOL[T];
const gU = (pid, id) => gU_(gOL(pid, id));
const gU_ = (gOL) => gOL[U];
const isC = (id) => isC_(id);
const isC_ = (id) => gLO(root)(id);
const cOI = (id) => oi[gO(id)[V]] = id;
const uW = (pid, id, w) => [gOL(pid, id)].map(l=>l && (l[W] = w) && l)[0];
const uT = (pid, id, t) => [gOL(pid, id)].map(l=>l && (l[T] = t) && l)[0];
const uU = (pid, id, u) => [gOL(pid, id)].map(l=>l && (l[U] = u) && l)[0];
const cO = (v, pid=root) => cL( cOI(ol.push([v || 'object'+cnt(),[]]) - 1), pid );
const cL = (id, pid=root, w=1, t=0, uid=root) => {
    if (pid == undefined || !pid.length)
        pid=[pid];
    pid
    .map(id=>gL(id))
    .forEach(l=>l.push([id, w, t || dt()+l.length, uid]));
    return id;
};

const gOT = (list) => {
    const res = [ gL(list[0]).filter(o=>!isC(o[ID])).map(o=>o[ID]) ];
    list.forEach((cur,i) => {
        list.slice(0,i).forEach((pre,j)=>{
            gLO(pre)(cur) && res.push([cur].concat(
                res[j].filter(o=>!isC(o)).map(id=>{
                    let a=gA([cur,id])
                    return a && a.length && a[0][ID] || undefined
                })
            ))
        })
    });
    res[0] = [list[0]].concat(res[0]);
    return res
};
const gOT2 = (list) => {
    const res = [];
    list.map((cur, from) => [
        cur,
        list
        .slice(0, from)
        .map((pre, ind) =>
            gLO(pre)(cur) && ind
        )
        .filter(o => o !== false)[0] ])
        .map(l => l[1] === undefined
            ? res
              .push(
              	  gA([l[0]])
              	  .map(o => o[ID])
              	  .filter(o => !isC(o))
              	)
            : res
              .push(
              	  res[l[1]]
              	  .map(o =>
              	  	  gA([o, l[0]])
              	    .map(o => o[ID])
              	    .filter(o => !isC(o))[0]
              	  )
              	) 
        );
    return res.map((o,i)=>[list[i]].concat(o))
};

const cR=(list) => {
	   const r = cO('rule'+ccnt(gOI(RULE)), gOI(RULE))
    list.map(l=>cL(l,r))
    return r
};
const gR=(rid) => gL(rid).map(l=>l[ID]);
const eR = (gR=[]) =>
    gLO(gR[0])(gR[1])
    && !gLO(gR[3])(gR[2])
    && cL(gR[2], gR[3]) && true || false;
 
/*gO/gL = (..., uid) =>
    aSO(gSO(uid)) &&
    gAO(uid, [...]) &&
    gL(...)

cO/cL = (..., uid) =>
    aSO(gSO(uid)) &&
    gAO(uid, [...]) &&
    cL(...)*/

function intersec(arr1=[], arr2=[], ind=0) {
    arr1.sort((a,b)=>parseInt(a[ID])-parseInt(b[ID]));///
    arr2.sort((a,b)=>parseInt(a[ID])-parseInt(b[ID]));///
    const m = arr1.length, n = arr2.length, res = [];
    let i = 0, j = 0;
    while ((i < m) && (j < n)) {
        if (arr1[i][ind] === arr2[j][ind]) {
            res.push(arr1[i]);
            i++; j++;
        } else {
            arr1[i][ind] < arr2[j][ind] ? i++ : j++;
        }
    }
    return res;
}

function search(arr=[], val, ind=0) {
    arr.sort((a,b)=>parseInt(a[ID])-parseInt(b[ID]));///
    let i = 0, j = arr.length;
    while (i < j) {
        let k = Math.floor((i+j)/2);
        if (val <= arr[k][ind]) j = k;
        else i = k + 1;
    }
    return arr.length && arr[i] && arr[i].length &&
    arr[i][ind] === val ? i : undefined;
}
///////
const user = cO(USER);
const gl = cO(GL);
const cl = cO(CL);
const access = cO(ACCESS);
const session = cO(SESSION);
const rule=cO(RULE);
const pass = cO(PASS);
cO("o8") 
cO("o9") 
//const uid = cL(root,[gl,cl,pass,user]);

const o10 = cO('city');
const o11 = cO('street',[root,o10]);
const o12 = cO('city1',o10);
const o13 = cO('city2',o10);
const o14 = cO('street11',[o11,o12]);
const o15 = cO('street12',[o11,o12]);
const o16 = cO('street21',[o11,o13]);
const o17 = cO('street22',[o11,o13]);
const o18 = cO('house',[root,o11]);
const o19 = cO('house1', [o18,o14]);
const o20 = cO('population',[root,o10]);
const o21 = cO('30000',[o20,o13]);

const r=cR([o19, o18, o20, o21]);

///////
//log('gA', gA([o11,o12]).map(l=>gO(l[ID])));
//log('gOT', gOT([o10,o20,o11,o18]).map(r=>r.map(c=>gV(c))));
log('gR', r, gR(r), [o19, o18, o20, o21]);
log('rule: eR', eR(gR(r)), '; gL(21)', gL(o21));
cL(o18, o19);
log('rule: eR', eR(gR(r)), '; gL(21)', gL(o21));
//log('cOI', cOI(root), '; gOI', gOI(ROOT)); //log('oi', oi);
//log('ccnt', ccnt(rule));
//log('gOL_', gOL_(gL(0))(1));
//log('gW_', gW_(gOL_(gL(0))(1)), '; gT_', gT_(gOL_(gL(0))(1)), '; gU_', gU_(gOL_(gL(0))(1)));
//log('isC_', [0,1,4].map(isC_));
//log('uW: gW', gW(0,1), '; uW',uW(0,1,2), '; gW',gW(0,1));
//log('uT: gT', gT(0,1), '; uT',uT(0,1,dt()), '; gT',gT(0,1));
//log('uU: gU', gU(0,1), '; uU',uU(0,1,1), '; gU',gU(0,1));

//const cAO = (cid) => [cO('access'+dt(), gOI(ACCESS))].map(aid=>cL(cid, aid))[0];
//const gAO = (uid) => gA([uid, gOI(ACCESS)])
//const uAO = (cids, aid) => cids.map(cid=>cL(cid, aid));
//const cUA = (uid, passid, aid) => cL(aid, [uid, passid]);
//const gUA = (uid, passid) => gA([uid, passid]);
//const cUO = (v, login1, pass1) => cO(v, [gOI(USER), login1, pass1]);
//const gUO = (login1, pass1) => gA([login1, pass1, gOI(USER)]).map(l=>gO(l[ID]))[0];
//const cAO = (uid, oid) => cO('access'+ccnt(gOI(ACCESS)), [gOI(ACCESS), uid, oid]);
//const gAO = (uid, oid) => !!gA([gOI(ACCESS), uid, oid]).length;
const cSO = (uid) => cO('session'+ccnt(gOI(SESSION)), [gOI(SESSION), uid]);
const gSO = (uid, t=60*60*1000) => gA([uid, gOI(SESSION)]).filter(l=>l[ID]  
  && uT(gOI(SESSION), l[ID], dt())
  && gT(gOI(SESSION), l[ID]) > dt()-10)[0];

const cgL = (cid) => [cO('gL'+dt(), gOI(GL))].map(aid=>cL(cid, aid))[0];
const ccL = (cid) => [cO('cL'+dt(), gOI(CL))].map(aid=>cL(cid, aid))[0];

const gl1 = root;
const cl1 = root;
const uid1 = cO('admin', [user]);
const pass1 = cO('qwerty',[pass]);
cL(gl1, [uid1, pass1, gl]);
cL(cl1, [uid1, pass1, cl]);

log('gl', gA([uid1,pass1,gl]));
log('gl', gA([root,root,gl]));
//log('gSO', gSO(uid), 'cSO', cSO(uid), 'gSO', gSO(uid));
//log('gAO', gAO(uid), 'gUA', gUA(uid, pass1))
log(ol. length) 
/*
console. time() 
for (var i=24;i<1000000;i++) {
	 cO(""+i,[i-1, i-2])
}
console. timeEnd () 
console. time() 
log(gA([999997,999998])) 
console. timeEnd () 
*/
