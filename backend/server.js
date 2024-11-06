// server.js (Node.js server)
import axios from "axios";
import express from "express";
import * as cheerio from "cheerio";
//import * as FileSystem from 'expo-file-system';

const app = express();

// Link for metropolia theses
const baseLink = "https://www.theseus.fi";
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
                data.theses[index].handle = $(value).attr("href");
                thesesData.push($(value).attr("href"))
            })

            res.json(data.theses);
        }

    } catch (error) {
      res.status(500).send("Error fetching theses");
    }
  });

  app.get("/single-thesis/:handle/:group/:id", async (req, res) => {
    try {
        console.log('handle4', req.params);
        const handleArray = req.params
        const link = `${baseLink}/${handleArray.handle}/${handleArray.group}/${handleArray.id}`;
        console.log('link', link);
        
        const response = await fetch(link);

        if(response.status == 200) {
            const $ = cheerio.load(await response.text());
            //console.log('cheerio', $);

            const test = $('div.item-page-field-wrapper.table.word-break > div > a').attr('href');
            console.log('test', test);
            res.json(test);
        }

    } catch (error) {
      res.status(500).send("Error fetching single thesis");
    }
  });

   app.get("/download", async (req, res) => {
    let handle = req;
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

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
