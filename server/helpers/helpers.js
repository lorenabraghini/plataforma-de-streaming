function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function testePromise() {
  return new Promise(async (resolve, reject) => {
    try {
      await sleep(5000);
      resolve("Oi");
    } catch (error) {
      reject("puts");
    }
  });
}

module.exports = {
  testePromise,
};
