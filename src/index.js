const ytdl = require('ytdl-core');
const express = require('express');

const app = express();


app.get('/download.mp4', async (req, res) => {
    if (!req.query.url) return res.status(404).end();

    // The desired format can be specified.
    const download = ytdl(req.query.url, { 
        filter: (format) => format.container === 'mp4' 
    });
    
    // The result can be streamed, which opens up tons of possibilities.
    download.pipe(res);
});

// Quick-and-dirty web interface.
app.get("/", (req, res) => {
    res.set('content-type', 'text/html');
    res.send(`
        <html>
            <body>
                <form action="/download.mp4" method="get">
                    <div>Enter YouTube Url</div>
                    <div><input type="text" name="url" /></div>
                    <div><button type="submit">Download!</button></div> 
                </form>
            </body>
        </html>
    `);
});

app.listen(Number(process.env.PORT) || 3000);