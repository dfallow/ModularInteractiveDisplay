from flask import Flask, jsonify, request
import urllib.request
import pdfplumber
from openai import OpenAI
from pathlib import Path
import os
import PyPDF2
from markupsafe import escape
from flask_cors import CORS, cross_origin

#url = "https://www.theseus.fi/bitstream/handle/10024/506961/Vainola_Lassi.pdf?sequence=2&isAllowed=y"

api_key = "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"

#file_path = 'backend/files/thesis.pdf'
#urllib.request.urlretrieve(url, file_path)  

# OpenAI API Client
client = OpenAI(
    api_key=api_key,
)

# Download thesis pdf file from url
def download_file(url, file_path):
    urllib.request.urlretrieve(url, file_path)

# Extract text from the thesis pdf file
# TODO - Extract text from all pages
def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = reader.pages[1].extract_text()
    return text

# Ask a question to the OpenAI API Client
# TODO - Input every page into the API
def ask_question(text, question):
    response = client.chat.completions.create(
        model="gpt-4o", 
        messages=[{
            "role": "system",
            "content": "You are a university lecturer, and will be summarizing a thesis for a student from the absrtact."
        },
        {
            "role": "user",
            "content": f"Here is the document text: {text}. Now, do the following: {question}"
        }],
        max_tokens=150
    )
    return response.choices[0].message.content

#pdf_path = 'backend/files/thesis.pdf'
#pdf_text = extract_text_from_pdf(pdf_path)

# The Question that will be asked to AI
question = "Create 3 short bullet points (max 80 characters per point) for this thesis that will make a user interested in reading it."

# https://www.theseus.fi/bitstream/handle/10024/506961/Vainola_Lassi.pdf?sequence=2&isAllowed=y

app = Flask(__name__)
cors = CORS(app)
@app.route('/download', methods=['GET'])
@cross_origin()
def download():
    
    key = request.args.get('key', default="", type=str)
    retrieve = request.args.get('retrieve', default="false", type=str)
    base_url = 'https://www.theseus.fi/'
    file_path = 'backend/files/thesis.pdf'

    print("test", key)
    if retrieve == "false":
        download_file(base_url + key, file_path)
        #downloaded = urllib.request.urlretrieve(base_url + key)
        pdf_text = extract_text_from_pdf(file_path)
        answer = ask_question(pdf_text, question)
        
        return ({'result': answer})
    else:
        return ({'result': 'No file provided'})
    
    
 
if __name__ == '__main__':
    app.run(debug=True, port=5000)
