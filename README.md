# Mojo Takehome
Setup:
Open up a terminal and enter the directory you want to download this project to. Once there, clone this repo using the following command:

```
git clone https://github.com/mohtasim317/mojo-takehome.git
```

Enter the project directory from your terminal and run the following command to install all necessary dependencies:

```
npm install
```

Add the API key in the .env file's VITE_POLYGON_API_KEY variable (example below)

```
VITE_POLYGON_API_KEY="EXAMPLE_KEY"
```

To run the application:

```
npm run dev
```

## Languages/Libraries/Tools used:
-Built using React, TypeScript, Vite. Styled using CSS.

-Fetched data from Polygon Crypto/Forex Websockets API.

-Used the "react-use-websocket" library to handle websocket functionality.

## Future Improvements:
-Improve styling/UX.

-Use JavaScript's built-in websocket functionality to lessen external dependencies.
