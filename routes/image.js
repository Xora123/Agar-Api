import express from "express";
import { addImage, deleteImage, uploadImage, updateImageMetadata, countImages, getImagesForExhibition, getImageByName, getImageDetails } from "../controllers/image.js";
import { upload } from "../middleware/multerConfig.js";

const router = express.Router();

// READ 
router.get( "/:usedId", )

router.get('/count-images/:userId/:exhibitionId', countImages);

router.get('/image-by-name/:exhibitionId/:imageName', getImageByName);

// Ajoutez une nouvelle route pour obtenir les informations de chaque image
router.get('/images-for-exhibition/:exhibitionId', getImagesForExhibition);

router.get('/image-details/:imageId', getImageDetails);
// POST 
router.post( '/', addImage )

router.post( '/upload', upload.single( 'image' ), uploadImage )

router.put('/update/:id', upload.none(), updateImageMetadata);

// DELETE
router.delete( '/delete/:id', deleteImage )

export default router