import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import exhibitionsRoutes from "./routes/exhibitions.js"
import imageRoutes from "./routes/image.js"


/* CONFIGURATIONS */
const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );
dotenv.config();
const app = express();
app.use( express.json() );

app.use( morgan( "common" ) );
app.use( bodyParser.json( { limit: "30mb", extended: true } ) );
app.use( bodyParser.urlencoded( { limit: "30mb", extended: true } ) );
app.use( cors() );
app.use( "/assets", express.static( path.join( __dirname, "public/assets" ) ) );

/* FILE STORAGE */
app.use( '/images', express.static( 'images' ) );

// /* ROUTES WITH FILES */
// app.post( "/auth/register", upload.single( "picture" ), register );

/* ROUTES */
app.use( "/auth", authRoutes );
app.use( "/users", userRoutes );
app.use( "/exhibitions", exhibitionsRoutes )
app.use( "/images", imageRoutes)


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect( 'mongodb+srv://stuckenskelian:kelian-agarta@cluster0.xzabpi8.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } )
  .then( () => {
    app.listen( PORT, () => console.log( `Server Port: ${PORT}` ) );
    console.log( 'connected to database' )
    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Exhibition.insertMany( exhibitions )
  } )
  .catch( ( error ) => console.log( `${error} did not connect` ) );
