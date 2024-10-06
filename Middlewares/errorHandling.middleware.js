const fs = require('fs')

app.get('/', (req, res, next) => {
    fs.readFile('/file-does-not-exist', (err, data) => {
        if (err) {
            next(err) 
        } else {
            res.send(data)
        }
    })
})