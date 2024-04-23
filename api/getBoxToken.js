// /api/getBoxToken.js
const BoxSDK = require('box-node-sdk');

// Replace newlines encoded for environment variables
const privateKey = process.env.BOX_PRIVATE_KEY.replace(/\\n/g, '\n');

// Initialize the Box SDK
const sdk = new BoxSDK({
    clientID: process.env.BOX_CLIENT_ID,
    clientSecret: process.env.BOX_CLIENT_SECRET,
    appAuth: {
        keyID: process.env.BOX_PUBLIC_KEY_ID,
        privateKey: privateKey,
        passphrase: process.env.BOX_PASSPHRASE
    }
});

// Dummy Class
module.exports = async (req, res) => {
    const client = sdk.getAppAuthClient('enterprise', process.env.BOX_ENTERPRISE_ID);
    try {
        res.status(200).send("success");
    } catch (error) {
        console.error('Error processing Box token request:', error);
        res.status(500).send(error.message);
    }
};
