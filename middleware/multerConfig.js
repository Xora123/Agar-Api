import multer from 'multer'
import path from 'path'
import fs from 'fs'

// Fonction pour créer un dossier si ce dernier n'existe pas
function ensureDirSync( dirpath ) {
  try {
    return fs.mkdirSync( dirpath, { recursive: true } );
  } catch ( err ) {
    if ( err.code !== 'EEXIST' ) throw err;
  }
}

// Image Upload
const imageStorage = multer.diskStorage( {
  // Destination to store image 
  destination: function ( req, files, cb ) {

    const userId = req.body.userId;
    const exhibitionId = req.body.exhibitionId

    const path = `images/${userId}/${exhibitionId}`
    
    // S'assurer que le dossier existe
    ensureDirSync( path );

    cb( null, path );
  },

  filename: ( req, file, cb ) => {
    const inputIndex = req.body.inputIndex;
    cb(null, 'image-' + inputIndex + path.extname(file.originalname));
    // file.fieldname is name of the field (image), path.extname get the uploaded file extension
  }
} );


export const upload = multer( { storage: imageStorage } )