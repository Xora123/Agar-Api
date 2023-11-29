import Image from "../models/Image.js";

/* CREATE */
export const addImage = async ( req, res ) => {
    try {

        const { filePath, title, creator, technical, description, sizeX, sizeY, exihibitionId } = req.body
        const newImage = new Image( { filePath, title, creator, technical, description, sizeX, sizeY, exihibitionId } );

        const savedImage = await newImage.save();
        res.status( 201 ).json( savedImage );
    } catch ( err ) {
        res.status( 400 ).json( { message: err.message } );
    }
};

/* READ */
export const getExihibitionImages = async ( req, res ) => {
    try {
        const { exihibitionId } = req.params
        const images = await Image.find( { exihibitionId } )
        res.status( 200 ).json( images )
    } catch ( err ) {
        res.status( 500 ).json( { message: err.message } );
    }
}


// Recuperer les details en fonction d'une image
export const getImageDetails = async ( req, res ) => {
    try {
        const { imageId } = req.params;

        console.log(imageId)
        const image = await Image.findById( imageId );
        if ( !image ) {
            return res.status( 404 ).json( { message: "Image not found" } );
        }
        res.status( 200 ).json( image );
    } catch ( err ) {
        res.status( 500 ).json( { message: err.message } );
    }
};


// Fonction pour compter les images
export const countImages = async ( req, res ) => {
    try {
        const { userId, exhibitionId } = req.params;
        // Utilisez la méthode `.countDocuments` de Mongoose pour compter les images
        const imageCount = await Image.countDocuments( { userId, exhibitionId } );
        res.status( 200 ).json( { count: imageCount } );
    } catch ( err ) {
        res.status( 500 ).json( { message: err.message } );
    }
};

// Fonction pour obtenir les informations de chaque image pour une exposition spécifique
export const getImagesForExhibition = async ( req, res ) => {
    try {
        const { exhibitionId } = req.params;
        // Utilisez la méthode `.find` de Mongoose pour obtenir les images pour une exposition spécifique
        const images = await Image.find( { exhibitionId } );
        res.status( 200 ).json( images );
    } catch ( err ) {
        res.status( 500 ).json( { message: err.message } );
    }
};


export const getImageByName = async ( req, res ) => {
    try {
        const { exhibitionId, imageName } = req.params;
        console.log( exhibitionId )
        console.log( exhibitionId, imageName )
        // Recherchez l'image dans la base de données en fonction de ces paramètres
        const image = await Image.findOne( {
            exhibitionId: exhibitionId,
            imageName: imageName, // Assurez-vous que le champ "title" correspond au nom de l'image dans votre modèle de données
        } );

        if ( !image ) {
            return res.status( 404 ).json( { message: "Image not found" } );
        }
        // Si l'image est trouvée, renvoyez-la en réponse
        res.status( 200 ).json( image );
    } catch ( err ) {
        res.status( 500 ).json( { message: err.message } );
    }
};

/* UPDATE */
export const uploadImage = async ( req, res ) => {
    if ( !req.file ) {
        return res.status( 400 ).send( 'No file uploaded.' );
    }

    try {
        const filePath = req.file.path;
        const imageName = req.file.filename; // Ajout du nom de l'image
        const { exhibitionId } = req.body;
        const existingImage = await Image.findOne( { filePath } );

        // Obtenez l'index à partir du nom de fichier
        const match = imageName.match( /image-(\d+)/ );
        const inputIndex = match ? parseInt( match[1] ) : null;

        if ( existingImage ) {
            existingImage.exhibitionId = exhibitionId;
            existingImage.imageName = imageName; // Mise à jour du nom de l'image
            existingImage.location = inputIndex;

            const updatedImage = await existingImage.save();
            res.status( 200 ).json( updatedImage );
        } else {
            const newImage = new Image( { filePath, exhibitionId, imageName: imageName, location: inputIndex.toString() } ); // Ajout du nom de l'image lors de la création
            const savedImage = await newImage.save();
            res.status( 201 ).json( savedImage );
        }
    } catch ( err ) {
        res.status( 500 ).json( { message: err.message } );
    }
};


// Update Metadonnée de l'image
export const updateImageMetadata = async ( req, res ) => {
    const { id } = req.params;

    // Récupérez les valeurs des métadonnées à partir du corps de la requête
    const { title, creator, technical, origin, description, sizeX, sizeY, fondBlanc } = req.body;

    // Créez un objet pour stocker les valeurs de métadonnées à mettre à jour
    const updatedMetadata = {};

    // Vérifiez si chaque champ est défini, s'il est défini, ajoutez-le à l'objet updatedMetadata
    if ( title !== undefined ) {
        updatedMetadata.title = title;
    }
    if ( creator !== undefined ) {
        updatedMetadata.creator = creator;
    }
    if ( technical !== undefined ) {
        updatedMetadata.technical = technical;
    }
    if ( origin !== undefined ) {
        updatedMetadata.origin = origin;
    }
    if ( description !== undefined ) {
        updatedMetadata.description = description;
    }
    if ( sizeX !== undefined ) {
        updatedMetadata.sizeX = sizeX;
    }
    if ( sizeY !== undefined ) {
        updatedMetadata.sizeY = sizeY;
    }
    if ( fondBlanc !== undefined ) {
        updatedMetadata.fondBlanc = fondBlanc;
    }


    try {
        const updatedImage = await Image.findOneAndUpdate(
            { _id: id }, // Utilisez un objet avec _id pour filtrer par l'ID
            updatedMetadata, // Utilisez l'objet updatedMetadata pour mettre à jour les métadonnées
            { new: true } // { new: true } pour retourner le document après mise à jour
        );

        if ( !updatedImage ) {
            return res.status( 404 ).json( { message: 'Image not found' } );
        }

        res.status( 200 ).json( updatedImage );
    } catch ( err ) {
        console.error( err );
        res.status( 500 ).json( { message: 'Erreur côté serveur' } );
    }
};


/* DELETE */
export const deleteImage = async ( req, res ) => {
    const { id } = req.params

    try {
        const image = await Image.findById( id )

        if ( !image ) {
            return res.status( 404 ).json( { message: "Image not found" } )
        }

        await image.remove()
        res.status( 200 ).json( { message: "Image deleted successfully" } )
    } catch ( err ) {
        res.status( 500 ).json( { message: err.message } )
    }
}
