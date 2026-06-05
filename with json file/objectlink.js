const log = console.log, time = Date.now, assert = console.assert
var ol = []
const ROOT = 0
const ID = 0, VALUE = 1, LINK = 2
const gO = (id = ROOT) => ol[id]
const gV = (id = ROOT) => gO(id)[VALUE]
const gL = (id = ROOT) => gO(id)[LINK]
const isC = (id) => gL(id).some(it => it === 0)