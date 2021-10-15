const fs = require('fs').promises;
const path = require('path');
const cheerio = require('cheerio');
const axios = require('axios');

const URL = 'https://en.wikipedia.org/wiki/List_of_MeSH_codes';
const DATA_FOLDER_NAME = 'data';
const HTML_FILE_NAME = 'index.html';


const isFolderExist = async (folderPath) => {
  try {
    await fs.access(folderPath);
    return true;
  } catch (error) {
    return false;
  }
};

const readLocalHtml = async (folderName = DATA_FOLDER_NAME, htmlFileName = HTML_FILE_NAME) => {
  try {
    const dataFolderPath = path.join(__dirname, '..', folderName);
    const isFolderPresent = await isFolderExist(dataFolderPath);
    if (!isFolderPresent) {
      return null;
    }

    const htmlFilePath = path.join(dataFolderPath, htmlFileName);
    return fs.readFile(htmlFilePath, 'utf-8');
  } catch (error) {
    return null;
  }
};



const retrieveHtml = async (url = URL) => {
  const localHtml = await readLocalHtml();
  if (localHtml) {
    return localHtml;
  }

  const { data: html } = await axios.get(url);
  return html;
};

const createDataFolder = async (folderPath) => {
  const isExist = await isFolderExist(folderPath);
  if (isExist) {
    return;
  }

  await fs.mkdir(folderPath);
}

const parseName = (name) => {
  return name
    .trim()
    .split('(')[0]
    .split(' ')
    .filter((word) => word !== '')
    .map((word) => {
      if (word === 'and' || word === 'of') {
        return word;
      }

      return word[0].toUpperCase() + word.slice(1);
    })
    .join(' ')
    .trim();
};

const parseHeading = (strHeading) => {
  const parts = strHeading.split('–');

  return { prefix: parts[0].trim(), name: parseName(parts[1]) };
};

const scrapHeadings = async () => {
  try {
    const html = await retrieveHtml();
    const dataFolderPath = path.join(__dirname, '..', DATA_FOLDER_NAME);
    const htmlFilePath = path.join(dataFolderPath, HTML_FILE_NAME);
    const parsedCategories = [];

    await createDataFolder(dataFolderPath);
    await fs.writeFile(htmlFilePath, html);

    const $ = cheerio.load(html);
    const list = $('#mw-content-text > div.mw-parser-output > ul');

    const categories = $(list).children();
    $(categories).each((_, element) => {
      const content = $(element).text();
      const { name, prefix } = parseHeading(content.split('\n')[0]);

      const children = $(element).find('li');
      const parsedChildren = $(children).map((_, child) => {
        const text = $(child).text();
        const { prefix: code, name: childName } = parseHeading(text);

        return {
          name: childName,
          code,
        };
      }).toArray();

      parsedCategories.push({
        name,
        prefix,
        children: parsedChildren,
      });
    });

    return parsedCategories;
  } catch (error) {
    console.log(error);
  }
};


module.exports = { scrapHeadings };

