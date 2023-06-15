# Ethereum Block Explorer

This project is a simple Ethereum blockchain block explorer. It provides real time info for the latest mined block and the current gas price.

It also includes the ability to search any previously mined block by number, as well as to check the details for any included transaction.


You will need to:


## 1. Create a unique Alchemy API key

Create a unique Alchemy API Mainnet key for the project as [described here](https://docs.alchemy.com/reference/api-overview).


## 2. Add your API key to as an environment variable for the project

Create an empty `.env` file in the base directory of this project.

Add the following line to the `.env` file replacing `YOUR_ALCHEMY_API_KEY` with your api key.

```sh
REACT_APP_ALCHEMY_API_KEY=YOUR_ALCHEMY_API_KEY
```

Do not remove the `REACT_APP_` prefix. React uses that to import env variables.


## 3. Start the webserver

`npm start`

Running the command above will run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


