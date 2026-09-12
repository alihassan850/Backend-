import express from 'express';
import cors from 'cors';
import parseCookie from 'cookie';

const app = express();

//Cors middleware configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

//This middleware is used to parses incoming JSON data and make it available in the req.body property of the request object.
app.use(express.json({limit: '20kb'}));

//This middleware is used to read the data from a client when the data is sent in the form of URL-encoded format.
app.use(express.urlencoded({ extended: true, limit: '20kb' }));

//This middleware is used to serve static file (images, CSS files, JS files, HTML files, PDF) to the folder (public)
app.use(express.static('public'));  

app.use(cookieParser())

export default app;