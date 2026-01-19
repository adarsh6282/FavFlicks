import { Router } from "express";
import { OmdbController } from "../controllers/implementation/omdb.controller";
import { OmdbService } from "../services/implementation/omdb.services";
import useAuth from "../middlewares/useAuth";

const omdbService=new OmdbService()
const omdbController=new OmdbController(omdbService)

const router=Router()

router.delete("/favourites/:id",useAuth(),omdbController.deleteFavourite.bind(omdbController))
router.get("/search",useAuth(),omdbController.searchMovies.bind(omdbController))
router.post("/favourites",useAuth(),omdbController.addToFavourite.bind(omdbController))
router.get("/favourites",useAuth(),omdbController.getFavourites.bind(omdbController))

export default router