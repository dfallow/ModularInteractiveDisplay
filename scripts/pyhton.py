# -*- coding: utf-8 -*-
from pyquery import PyQuery
from bs4 import BeautifulSoup
import requests

thesis_array = []

# Year Array will be in the form of [dc.date.issued%3A2024, dc.date.issued%3A2023, dc.date.issued%3A2022, ...]
year_array = ["dc.date.issued%3A2024", "dc.date.issued%3A2023", "dc.date.issued%3A2022"]
keyword_list = "+nokia+5G"

base_link = "https://www.theseus.fi"
search_link = base_link + "/discover?scope=10024%2F6&query="
search_link2 = "/discover?scope=10024%2F6&query="

def get_all_from_page(webpage):
    i = 0
    for link in webpage.findAll('div', class_='col-sm-9 artifact-description'):
        thesis_dict = {}

        #This gets the title of the thesis    
        thesis_dict['title'] = link.find('h4').text

        # This gets teh handle of the thesis
        thesis_dict['handle'] = link.find('a').get('href')

        # This gets the author of the thesis
        thesis_dict['author'] = link.find('small').find('span').text

        # This gets the year of the thesis
        thesis_dict['date'] = link.find('span', class_='date').text

        # Adds the thesis to the array
        thesis_array.append(thesis_dict)

    return thesis_array

def thesis_search(year_array, keyword="+nokia", rpp="&rpp=30"):
    for year in year_array:
        complete_link = base_link + search_link2 + year + keyword + rpp
        print('Complete Link', complete_link)

        website = requests.get(complete_link)
        website.encoding = website.apparent_encoding

        soup = BeautifulSoup(website.text, "html.parser")
        all_theses = get_all_from_page(soup)
        return all_theses

thesis_search(year_array, keyword_list)

#print(thesis_array)