import { Request, Response } from "express";

export interface IOmdbController{
    searchMovies(req:Request,res:Response):Promise<void>
    addToFavourite(req:Request,res:Response):Promise<void>
    getFavourites(req: Request, res: Response): Promise<void>
    deleteFavourite(req: Request, res: Response): Promise<void>
}