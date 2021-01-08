// from wds
function makeRequest(loc: string) {
  return new Promise((resolve, reject) => {
    console.log(`Making request to ${loc}`);
    if (loc === "Google") resolve("Google says yo");
    else reject("Gimme Google");
  });
}

function processResponse(response: unknown) {
  return new Promise(resolve => {
    console.log("Processing response");
    resolve(`Extra response info: ${response}`);
  });
}

async function makeRequestAsync(location: string) {
  try {
    const response = await makeRequest(location);
    console.log(`Response received`);
    const processedResponse = await processResponse(response);
    console.log(processedResponse);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

makeRequestAsync("Schmoogle");
