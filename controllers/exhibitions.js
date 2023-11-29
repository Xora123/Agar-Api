import Exhibition from "../models/Exhibitions.js"
/* CREATE */
export const createExhibition = async ( req, res ) => {
    try {

        const { userId, title, template, artworksnb } = req.body;

        const newExhibition = new Exhibition( { userId, title, template, artworksnb, __v: 0 } );
        await newExhibition.save();

        const folderUrl = `${userId}/${newExhibition._id}`;
        newExhibition.folderUrl = folderUrl;

        await newExhibition.save();

        res.status( 201 ).json( { exhibitionId: newExhibition._id, ...newExhibition } );
    } catch ( err ) {
        console.error( "Erreur lors de la sauvegarde:", err );
        res.status( 409 ).json( { message: err.message } );
    }
}

/* READ */
export const getExhibitions = async ( req, res ) => {
    try {
        const exhibition = await Exhibition.find()
        res.status( 200 ).json( exhibition );
    } catch ( err ) {
        res.status( 404 ).json( { message: err.message } )
    }
}


export const getUserExhibitons = async ( req, res ) => {
    try {
        const { userId } = req.params;
        const exhibition = await Exhibition.find( { userId } )
        res.status( 200 ).json( exhibition );
    } catch ( err ) {
        res.status( 404 ).json( { message: err.message } )
    }
}

export const getExhibitionById = async ( req, res ) => {
    const { id } = req.params;

    try {
        const exhibition = await Exhibition.findById( id );

        if ( !exhibition ) {
            return res.status( 404 ).json( { message: "Exhibition not found" } );
        }

        res.status( 200 ).json( exhibition );
    } catch ( err ) {
        res.status( 500 ).json( { message: err.message } );
    }
};

/* UPDATE */

// export const uploadExhibitionImage = async ( req, res ) => {
//     if ( !req.file ) {
//         return res.status( 400 ).send( 'No file uploaded.' );
//     }
// }

/* DELETE */
export const deleteExhibition = async ( req, res ) => {
    const { id } = req.params;

    try {
        const exhibition = await Exhibition.findById( id );

        if ( !exhibition ) {
            return res.status( 404 ).json( { message: "Exhibition not found" } );
        }

        await exhibition.remove();
        res.status( 200 ).json( { message: "Exhibition deleted successfully" } );
    } catch ( err ) {
        res.status( 500 ).json( { message: err.message } );
    }
};