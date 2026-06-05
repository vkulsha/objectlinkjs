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
  mind.cm("mind.initInterface()")
};

mind.init=()=>{
  mind.loadLocalStorageDB()
  mind.ol.length===OL.length && mind.initNewDB()
}

addEventListener('load',(e)=>mind.init())

//utils
function intersec(arr1=[],arr2=[],issort=false){
  if (!issort){
    arr1.sort(compareNumeric)
    arr2.sort(compareNumeric)
  }
  const m = arr1.length
  const n = arr2.length
  const res = []
  let i = 0, j = 0
  while ((i < m)&& (j < n)){
    if (arr1[i]===arr2[j]){
      res.push(arr1[i])
      i++
      j++
    } else {
      arr1[i] < arr2[j] ? i++ : j++
    }
  }
  return res
}
function includes(arr=[],val,issort=false){
  return binSearch(arr,val,issort)>=0
}
function binSearch(arr=[],val,issort=false){
  if (!issort) arr.sort(compareNumeric)
  let i = 0
  let j = arr.length
  while (i < j) {
    let k = Math.floor((i+j)/2)
    if (val <= arr[k]) j = k
    else i = k + 1
  }
  return arr.length && arr[i]===val 
    ? i 
    : undefined;
}
function compareNumeric(a, b){
  if (a > b) return 1
  if (a == b) return 0
  if (a < b) return -1
}