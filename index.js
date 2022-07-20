const fs = require('fs')
const path = require('path')
const ytdl = require('ytdl-core')
const express = require('express')
const {exec} = require('child_process')
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));   
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
                    res.download(`video.mp4`, function (error) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Downloaded')
                        }
                    })
                })
            break
        case 'mp3':
            ytdl(url)
                .pipe(fs.createWriteStream(`video.mp4`))
                .on('finish', () => {
                    exec(`ffmpeg -y -i video.mp4 video.mp3`)
                        .on('close', () => {
                            res.download(`video.mp3`, function (error) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Downloaded')
                                }
                        })
                    })

                })
            break
        default:
            res.send('Format not supported')
            break
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port 3000!');
})