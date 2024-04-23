# Box Custom Portal Demo

This repository hosts a demo showcasing how to create a custom portal using Box Platform APIs, Box UI Elements, React, Tailwind CSS, and Vercel. This demo is aligned with the developer session #2 at the Box Cloud Content Summit 2024, focusing on building secure content portals with UI elements.

## ⚠️ Important Notice

This demo is for demonstration purposes only and is not production-ready. It lacks complete authentication measures, making it unsuitable for live environments without further development.

## What does the project use?

This project requires:
- [Box UI Elements](https://developer.box.com/guides/embed/ui-elements/) v19.0.0
- [React](https://www.npmjs.com/package/react/v/17.0.2) v17.0.2
- Accounts on GitHub, Vercel, and Box (free accounts are sufficient for demo purposes).
- An IDE like VS Code for customization

## Components

### Frontend

The demo includes:
- Login and logout pages.
- A main page.
- Three pages showcasing different Box UI Elements.

Text and images can be customized by modifying the `config.json` in the `/public` folder and images in `/images/platform` and `/public`. The uploader component is initially located in `/solutions` and requires moving to `/pages` and uncommenting specific code lines to activate.

### Backend Serverless Functions

Using Vercel, the project deploys serverless functions from the `/api` folder, where each file becomes a separate function. A base file is provided to demonstrate token exchange, and more advanced examples are available in `/solutions`.

## Setup Guide

### Configuring Your Box Application

1. **Create a Box Developer Account**: Sign up at [Box Developers](https://account.box.com/signup/n/developer) or use a pre-existing Box Enterprise account. Do not deploy to production!
2. **Create a New Application**: Go to the [Box Developer Console](https://app.box.com/developers/console), click 'Create New App', choose 'Custom App', then 'Server Authentication with JWT'. Name your app.
3. **Set Application Scopes**: Ensure the application is configured with the necessary permissions: App + Enterprise, read/write all files, manage users/groups/enterprise properties, and generate user access tokens.
4. **Generate a Public/Private Keypair**: Click the button to generate a public/private keypair.
5. **Download the JSON Config File**: This file is automatically downloaded upon keypair generation.

### Authorizing Your Box Application

Follow the steps outlined at [Custom App Approval](https://developer.box.com/guides/authorization/custom-app-approval/) to authorize the application. Post-authorization, a service account email is assigned to the app. Anytime someone makes changes the app will need to be reauthorized. 

### Box Dummy Content Setup

- Create a parent folder in Box, under which you should organize portal-specific folders.
- For an example user (i.e. Robert Smith), create a folder with their name.
- Create folders underneath that one for 'applications' and 'statements'. Note down the IDs.
- Add a dummy statement in the statements folder: [Dummy Statement](https://cloud.box.com/s/gjsrr5jycgf2cuwr9zh11sy5n3clr4a9).
- In the customer folder, add a terms and conditions file: [Terms and Conditions](https://cloud.box.com/s/zi86p374v5kikavtq9xfgiziz9yxh9gh). Note down the ID.

### Deploying with Vercel

Deploy directly to Vercel using the following button, which will prompt for necessary environment variables and configurations:

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbox-community%2Fbox-custom-portal-demo&env=REACT_APP_BOX_CONTENT_UPLOADER_FOLDER_ID,REACT_APP_BOX_UPLOADER_FOLDER_ID,REACT_APP_BOX_PREVIEW_FILE_ID,BOX_CLIENT_ID,BOX_CLIENT_SECRET,BOX_PUBLIC_KEY_ID,BOX_PASSPHRASE,BOX_ENTERPRISE_ID,BOX_PRIVATE_KEY&project-name=box-portal-demo&repository-name=box-portal-demo&build-command=pnpm%20run%20build&install-command=pnpm%20install)

### Post-Deployment Configuration

- Add the Vercel domain to the CORS configuration for your Box application.

### Testing the Deployed Site

Use any email address to access. Input a developer token from your Box application in the password field for authentication. Ensure the developer account used for generating the token has access to the content IDs specified in the environment variables.

### Customization Options

There is a lot you could do to customize this portal demo. You could automate the content folder creation. You can add full authentication through Auth0 as an example and use Box App Users https://developer.box.com/guides/users/create-app-user/. You can change the box token exhange serverless function https://developer.box.com/guides/authentication/tokens/downscope/. This demo is meant to help you get started.

Clone the repository and navigate into it you will need to replace the below with the url of the repo vercel set up for you

```bash
git clone https://github.com/your-repository-url.git
cd your-repository-directory
```

Open the project in VS Code or your preferred IDE

```bash
code .
```

Use nvm to manage Node.js version, install if not already installed
Installation instructions for nvm: https://github.com/nvm-sh/nvm

```bash
nvm install 18.18.0
nvm use 18.18.0
```

Install pnpm and Vercel CLI globally

```bash
npm install -g pnpm
npm install -g vercel
```

Install project dependencies

```bash
pnpm install
```

Copy env file and add information for each variable based on the json config file and content ids

```bash
cp .env_example .env
```

Run the project locally using Vercel CLI

```bash
vercel dev
```

Make changes to the portal.

Push changes to GitHub and auto-deploy via Vercel

```bash
git add .
git commit -m "Describe your changes here"
git push origin main
```

## Learn More

For detailed information on Box APIs and integration capabilities, visit the [Box Developer Documentation](https://developer.box.com/).

## License

This project is open source and available under the MIT License.