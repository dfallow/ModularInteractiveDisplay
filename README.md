# StandOut Modular Interactive Display Application

# Overview
The StandOut application is an innovation project which aims to showcase collaboration between students and Nokia. So far one module has been implemented, which is a thesis search, where users can browse theses completed by students at different universities that have some relation to Nokia. This module also gerenates key points about a thesis using AI and provides an qr code which allow users to easily download.

# Table of Contents
- [Installation](https://github.com/dfallow/ModularInteractiveDisplay?tab=readme-ov-file#installation)
- [Usage](https://github.com/dfallow/ModularInteractiveDisplay/edit/main/README.md#usage)

# Installation

1. Clone the repository:
   
   ```
      git clone https://github.com/dfallow/ModularInteractiveDisplay.git
   ```
3. Install dependencies
   ```
      npm install
   ``` 
# Usage
1. Create a ```.env``` file in ```/backend``` with OpenAI API key
   
   ```
      OPENAI_KEY=your_api_secret_key
   ```
3. Start express server
   ```
      node .\backend\server.js
   ```
4. In a sepertate terminal start flask server
   ```
      python .\backend\downloads.py
   ```
5. Start application in root directory
   ```
      npx expo start
   ```
