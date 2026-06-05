const get = (id) => document.getElementById(id)
const workspace = get('workspace')
const set = (el, parent = workspace) => parent.appendChild(document.createElement(el))
const clearWorkspace = (id) => { workspace.innerHTML = gV(id) }

const createButton = (o) => {
  const b = set('button', set('div'))
  b.oid = o[ID]
  b.value = o[VALUE]
  b.link = o[LINK]

  b.id = 'but'+b.oid
  b.innerHTML = b.value
  b.style.width = '100%'
  b.style.fontWeight = isC(b.oid) ? 'bold' : 'normal'

  get('but'+b.oid).addEventListener('click', (e) => {
    mapObjectLink(e.target.oid)
  })
}

const mapObjectLink = (id) => {
  clearWorkspace(id)
  gL(id).map(o => {
    createButton(gO(o))
  })
}

get('getObjectLink').addEventListener("change", () => {
  var fileread = new FileReader()
  fileread.onload = (e) => {
    ol = JSON.parse(e.target.result)
    log(ol)
    mapObjectLink(ROOT)
  }
  fileread.readAsText(get('getObjectLink').files[0])
})

get('getObjectLinkBut').addEventListener("click", () => {
  get('getObjectLink').click()
})

get('setObjectLink').addEventListener("click", () => {
  get('getObjectLink').click()
  const a = set('a', document.body);
  a.href = URL.createObjectURL(new Blob([JSON.stringify(ol)], {
    type: "application/json"
  }));
  a.setAttribute("download", "objectlink.json");
  a.click();
  document.body.removeChild(a);
})
