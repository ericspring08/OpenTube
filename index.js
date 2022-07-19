const fs = require('fs')
const path = require('path')
const ytdl = require('ytdl-core')
const express = require('express')
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));   
})

app.get('/download', (req, res) => {
    const url = req.query.url
    var type = req.query.type

    console.log(decodeURIComponent(url))
    console.log(`${format}type`)
    res.set({
        'Location': "/"
    })
    ytdl(url)
        .pipe(fs.createWriteStream(`video.mp4`))
        .on('finish', () => {
            res.download(`video.mp4`, function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Downloaded')
                }
            })
        })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port 3000!');
})