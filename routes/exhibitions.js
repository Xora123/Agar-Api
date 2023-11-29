import express from "express";
import { createExhibition, getExhibitions, getUserExhibitons, getExhibitionById, deleteExhibition } from "../controllers/exhibitions.js";
import { verifyToken } from "../middleware/auth.js";
import { upload } from "../middleware/multerConfig.js"
const router = express.Router();

/* READ */
router.get( "/", getExhibitions );
router.get( "/:userId", verifyToken, getUserExhibitons );


// Obtenez une exposition par ID
router.get( '/exhibitionId/:id', getExhibitionById );


/* UPDATE */
router.post( "/createExhibition", createExhibition );

// // Upload Images
// router.post( '/profile', upload.single( 'image' ), uploadExhibitionImage )

/* DELETE */

router.delete( '/delete/:id', deleteExhibition )

export default router;