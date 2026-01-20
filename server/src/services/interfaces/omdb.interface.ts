import { IMovie } from "../../types/movie";

export interface IOmdbService {
  searchMovies(query: string,page:number,limit:number): Promise<{movies:IMovie[],total:number}>;
  addToFavourite(
    userId: string,
    movie: Partial<IMovie>,
  ): Promise<IMovie[] | null>;
  getFavourites(userId: string): Promise<IMovie[] | null>;
  removeFromFavourite(userId: string, imdbID: string): Promise<IMovie[] | null>;
}
