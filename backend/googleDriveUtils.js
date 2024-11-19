const fs = require("fs");
const { google } = require("googleapis");
const apikeys = require("./apikey.json");
const SCOPE = ["https://www.googleapis.com/auth/drive"];

const { PassThrough } = require("stream");

function bufferToStream(buffer) {
  const stream = new PassThrough();
  stream.end(buffer);
  return stream;
}

async function authorize() {
  const jwtClient = new google.auth.JWT(
    apikeys.client_email,
    null,
    apikeys.private_key,
    SCOPE
  );
  await jwtClient.authorize();
  return jwtClient;
}

async function uploadFile(authClient, fileBuffer, fileName) {
  const drive = google.drive({ version: "v3", auth: authClient });
  const fileMetadata = {
    name: fileName,
    parents: ["1ofsfhoqPe9W6B316kq9_Gx57PUlNh_Qk"],
  };

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      media: {
        body: bufferToStream(fileBuffer),
        mimeType: "application/pdf",
      },
      fields: "id",
    });

    const fileId = response.data.id;

    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const fileUrl = `https://drive.google.com/uc?id=${fileId}&export=view`;

    return {
      name: fileName,
      url: fileUrl,
    };
  } catch (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }
}

module.exports = { authorize, uploadFile };
