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

// Function to find a user by email in Box
async function findBoxUserByEmail(client, email) {
    try {
        const users = await client.enterprise.getUsers({ filter_term: email });
        if (users.total_count === 0) {
            throw new Error('No user found with the provided email.');
        }
        // Assuming the first match should be the user
        return users.entries[0].id;
    } catch (error) {
        console.error('Failed to find user by email:', error);
        throw error;
    }
}

// Function to get a user-specific access token
// This method could be edited or extended to accept scopes as a parameter
async function getUserAccessToken(client, userId) {
    try {
        const userClient = sdk.getAppAuthClient('user', userId);
        const tokenInfo = await userClient.exchangeToken(['base_explorer','item_preview', 'item_download', 'item_rename', 'item_upload']);
        // const tokenInfo = await userClient.exchangeToken(['base_explorer','item_preview', 'item_download', 'item_rename', 'item_upload', 'ai.readwrite']);
        return tokenInfo.accessToken;
    } catch (error) {
        console.error('Failed to get user access token:', error);
        throw error;
    }
}

// API endpoint to get a Box access token for a specific user
module.exports = async (req, res) => {
    const userEmail = req.query.email;
    if (!userEmail) {
        return res.status(400).send('Email parameter is required');
    }

    const client = sdk.getAppAuthClient('enterprise', process.env.BOX_ENTERPRISE_ID);

    try {
        const userId = await findBoxUserByEmail(client, userEmail);
        const accessToken = await getUserAccessToken(client, userId);

        // Send the access token back as response
        res.status(200).json({ accessToken });
    } catch (error) {
        console.error('Error processing Box token request:', error);
        res.status(500).send(error.message);
    }
};
