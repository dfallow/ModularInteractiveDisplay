//import { parse } from 'node-html-parser';
import * as cheerio from 'cheerio';


const years = ["dc.date.issued%3A2024", "dc.date.issued%3A2023", "dc.date.issued%3A2022"]

const getHTML = async(url) => {

    const response = await fetch(url);

    //console.log('response', response)
    const handleArray = [];

    if(response.status == 200){

        const $ = cheerio.load(await response.text());

        const $class = $('.col-sm-9.artifact-description');
        const $links = $class.find('a');

        //Gets each handle link separately
        $links.each((index, value) => {
            handleArray.push($(value).attr("href"))
        })
           
        //console.log('handleArray', handleArray);
        const data = $.extract({
            theses: [
                {
                    selector: '.col-sm-9.artifact-description',
                    value: {
                        title: 'h4',
                        author: '.author.h4',
                        publisher: '.publisher',
                        year: '.date',
                    }
                }
            ]


        })
        return [data.theses, handleArray];
    }
}

const [thesisList, handleList] = await getHTML("https://www.theseus.fi/discover?scope=10024%2F6&query=+nokia&rpp=30")

const test = cheerio.load('<h2 class="title">Hello world</h2>');

//console.log( thesisList);
//console.log( handleList);
