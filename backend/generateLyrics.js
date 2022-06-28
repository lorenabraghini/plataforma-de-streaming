const fs = require("fs");
const exec = require("child_process").execSync;
const request = require("request");
const SpeechToTextV1 = require("ibm-watson/speech-to-text/v1");
const LanguageTranslatorV3 = require("ibm-watson/language-translator/v3");
const { IamAuthenticator } = require("ibm-watson/auth");
const {
  getBlobs,
  selectMetadata,
  inserirLyrics,
  select,
} = require("./server/common/Database/helpers");

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: "",
  }),
  serviceUrl: "",
});

const languageTranslator = new LanguageTranslatorV3({
  version: "2018-05-01",
  authenticator: new IamAuthenticator({
    apikey: "",
  }),
  serviceUrl: "",
});

const models = {
  en: "en-US_BroadbandModel",
  pt: "pt-BR_BroadbandModel",
  es: "es-ES_BroadbandModel",
  fr: "fr-FR_BroadbandModel",
};

function identifyLanguage(text) {
  return new Promise((resolve, reject) => {
    const identifyParams = {
      text,
    };
    languageTranslator
      .identify(identifyParams)
      .then((identifiedLanguages) => {
        resolve(identifiedLanguages.result.languages[0].language);
      })
      .catch((err) => {
        console.log("error:", err);
        reject(err);
      });
  });
}

function getLyrics(filepath, model) {
  return new Promise((resolve, reject) => {
    const recognizeParams = {
      audio: fs.createReadStream(filepath),
      contentType: "audio/wav",
      model,
      timestamps: true,
    };

    speechToText
      .recognize(recognizeParams)
      .then((results) => {
        let data = [];
        for (let result of results.result.results)
          data = [...data, ...result.alternatives[0].timestamps];
        resolve(data);
      })
      .catch((err) => {
        console.log("error:", err);
        reject(err);
      });
  });
}
const pathModel = new RegExp(/[\w\/]+\/vocals.wav/g);
async function main() {
  let rows = await select("MusicaMetadata");
  rows = rows.filter((row) => ids.includes(row.idMusica));
  for (let row of rows) {
    const filepath = `${__dirname}/audios/${row.nome.replace(
      /[^A-Za-z]/g,
      ""
    )}.mp3`;
    const process = exec(
      `spleeter separate -p spleeter:2stems -o output ${filepath}`
    );
    const path = process.toString().match(pathModel)[0];
    console.log(path);
    if (path) {
      const model = models[row.language] ? models[row.language] : models.en;
      const lyrics = await getLyrics(`${__dirname}/${path}`, model);
      await inserirLyrics(row.idMusica, JSON.stringify(lyrics));
    }
  }
}
async function getLanguages() {
  const rows = await selectMetadata();
  rows.forEach(async (row) => {
    const language = await identifyLanguage(row.nome);
    await inserirLanguage(row.idMusica, language);
    console.log(row.nome, language);
  });
}
const ids = [
  "0892wPiVU3lHRaH7L6l7g1",
  "0lznW9pdvDEAvHEtLXIk9r",
  "1IFRVS4t1olI0XG9RBWdKH",
  "1XKhDkF8bX5IxMO4QTirvl",
  "5E3ZZEkQgedTutwFTVHj33",
];
function downloadAudio(url, filepath) {
  return new Promise((resolve, reject) => {
    request
      .get(url)
      .on("error", function (err) {
        console.log("Error downloading audio");
      })
      .pipe(fs.createWriteStream(filepath))
      .on("finish", function () {
        return resolve("foi");
      });
  });
}
async function teste() {
  let rows = await select("MusicaMetadata");
  rows = rows.filter((row) => ids.includes(row.idMusica));
  rows.forEach((row) => {
    const filepath = `${__dirname}/audios/${row.nome.replace(
      /[^A-Za-z]/g,
      ""
    )}.mp3`;
    downloadAudio(row.url, filepath);
  });
}
// teste();
main();

// getLyrics(
//   "/Users/lorenabraghini/Documents/arquivos/EPs/plataforma-de-streaming/pythonScripts/output/FreshPairofEyes/vocals.wav"
// );
