import { Request, Response } from "express";
import { IOmdbController } from "../interfaces/omdb.interface";
import { httpStatus } from "../../constants/statusCodes";
import { IOmdbService } from "../../services/interfaces/omdb.interface";

export class OmdbController implements IOmdbController {
  constructor(private _omdbService: IOmdbService) {}

  async searchMovies(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query.q as string;
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 6
      const userId=req.user?.id
      if(!userId){
          res.status(httpStatus.UNAUTHORIZED).json({message:"User not found"})
          return
      }
      const movies = await this._omdbService.searchMovies(query,page,limit);
      console.log(movies);
      res.status(httpStatus.OK).json(movies);
    } catch (error) {
      console.log(error);
    }
  }

  async addToFavourite(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const movie = req.body;
      await this._omdbService.addToFavourite(userId!, movie);
      res.status(200).json({message:"Added to Favourites"})
    } catch (error) {
      console.log(error);
    }
  }

  async getFavourites(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const result = await this._omdbService.getFavourites(userId!);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to fetch favourites" });
    }
  }

  async deleteFavourite(req: Request, res: Response): Promise<void> {
      try {
        const userId=req.user?.id
        const id=req.params.id as string
        const updated=await this._omdbService.removeFromFavourite(userId!,id)
        res.status(200).json(updated)
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to remove from favourites" });
      }
  }
}
