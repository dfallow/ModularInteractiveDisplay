// server.js (Node.js server)
import axios from "axios";
import express from "express";
import * as cheerio from "cheerio";
//import * as FileSystem from 'expo-file-system';

const app = express();

// Link for metropolia theses
const link = "https://www.theseus.fi/discover?scope=10024%2F6&query=+nokia&rpp=30";

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get("/theses", async (req, res) => {
    try {
      //const { data } = await axios.get(link);
      const response = await fetch(link);

        if(response.status == 200) {
            const $ = cheerio.load(await response.text());
            const thesesData = [];
            const $class = $('.col-sm-9.artifact-description');
            const $links = $class.find('a');

            const data = $.extract({
                theses: [
                    {
                        /* selector: '.col-sm-9.artifact-description',
                        value: {
                            title: 'h4',
                            author: '.author.h4',
                            publisher: '.publisher',
                            year: '.date',
                        },
                        selector: 'thumbnail artifact-preview',
                        value: {
                            image: '.img-responsive.thumbnailcover'
                        } */
                       selector: '.row.ds-artifact-item',
                       value: {
                            img: {
                                selector: '.img-responsive.thumbnailcover',
                                value: (el, key) => {
                                    const src = $(el).attr("src");
                                    return `${key}=${src}`
                                }
                            },
                            thesis: {
                                selector: '.col-sm-9.artifact-description',
                                value: {
                                    title: 'h4',
                                    author: '.author.h4',
                                    publisher: '.publisher',
                                    year: '.date',
                                },
                            }
                            
                       }
                    }
                ]
            })

            $links.each((index, value) => {
                //console.log('index', index);
                data.theses[index].handle = $(value).attr("href");
                thesesData.push($(value).attr("href"))
            })

            res.json(data.theses);
        }

    } catch (error) {
      res.status(500).send("Error fetching theses");
    }
  });

   app.get("/download", async (req, res) => {
    let handle = req.query.handle;
    console.log('handle', handle);
    try {
        const response = await fetch(handle);
        const $ = cheerio.load(await response.text());
        console.log('cheerio', $);
        

        //console.log('response', $);
        if (response.status == 200) {
            console.log('response', response);
            const $pages = $.find('.page');

            console.log('pages', $pages);
            $pages.each((index, value) => {
                console.log('page', value);
            })
            console.log('pages', $pages);
            const text = $.extract({
                selector: ".page",
                text: "span"
            })

            console.log('text', text);
        }
    } catch (error) {
      res.status(500).send("Error fetching single thesis");
    }
  }); 

  /* app.get("/download", async (req, res) => {
    const callback = downloadProgress => {
        let handle = req.query.handle;
        console.log('handle', handle);
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        console.log(`Download progress: ${progress}`);

        const downloadResumable = FileSystem.createDownloadResumable(
            handle,
            FileSystem.documentDirectory + 'thesis.pdf',
            {},
            callback
        )
    };

    try {
        const { uri } = await downloadResumable.downloadAsync();
        console.log('Finished downloading to ', uri);
    } catch (e) {
        console.error('Download error: ', e);
    }

    try {
        await downloadResumable.pauseAsync();
        console.log('Paused download operation, saving for future retrieval');
    } catch (e) {
        console.error('Pause error: ', e);
    }

    try {
        const { uri } = await downloadResumable.resumeAsync();
        console.log('Finished downloading to ', uri);
    } catch (e) {
        console.error('Resume error: ', e);
    }

    const downloadSnapshotJson = await AsyncStorage.getItem('pausedDownload');
const downloadSnapshot = JSON.parse(downloadSnapshotJson);
const downloadResumable = new FileSystem.DownloadResumable(
  downloadSnapshot.url,
  downloadSnapshot.fileUri,
  downloadSnapshot.options,
  callback,
  downloadSnapshot.resumeData
);


try {
    const { uri } = await downloadResumable.resumeAsync();
    console.log('Finished downloading to ', uri);
  } catch (e) {
    console.error(e);
  }


}); */

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
