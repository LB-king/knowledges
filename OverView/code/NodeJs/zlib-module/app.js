const fs = require('fs')
const zlib = require('zlib')
const GZIP = zlib.createGzip()

const rs = fs.createReadStream('./note.txt')
const ws = fs.createWriteStream('./note.txt.gz')

rs.pipe(GZIP).pipe(ws)
