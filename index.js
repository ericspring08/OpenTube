const fs = require('fs')
const path = require('path')
const ytdl = require('ytdl-core')
const express = require('express')
const {exec} = require('child_process')
const app = express();

app.enable('trust proxy')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));   
})

app.get('/download_file', (req, res) => {
    const file = req.query.file;

    console.log(file)

    if(file == "mp3") {
        res.download("video.mp3")
    } else {
        res.download("video.mp4")
    }
    
})

app.get('/download', (req, res) => {
    const url = req.query.url
    var format = req.query.format

    console.log(`url: ${decodeURIComponent(url)}`)
    console.log(`format: ${format}`)

    res.set({
        'Location': "/"
    })

    switch (format) {
        case 'mp4':
            ytdl(url)
                .pipe(fs.createWriteStream(`video.mp4`))
                .on('finish', () => {
                    console.log("finished")
                    res.json({
                        status: 'success'
                    })
                })
            break
        case 'mp3':
            ytdl(url)
                .pipe(fs.createWriteStream(`video.mp4`))
                .on('finish', () => {
                    exec(`ffmpeg -y -i video.mp4 video.mp3`)
                        .on('close', () => {
                            console.log("finished")
                            res.json({
                                status: 'success'
                            })
                    })

                })
            break
        default:
            res.send('Format not supported')
            break
    }
})

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port 3000!');
})