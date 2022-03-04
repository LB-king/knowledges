function* generator(i) {
  yield i
  yield i + 10
}

function * idMaker() {
  let index = 0
  while (index < 3) {
    yield index++
  }
}

function anotherGeneRator(i) {
  yield i + 1
  yield i + 2
  yield i + 3
}

function GE() {
  
}