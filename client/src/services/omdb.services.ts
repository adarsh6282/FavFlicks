import { api } from "./apiService";

export const searchMovies = async (query: string,page:number,limit:number) => {
  return await api.get("/movies/search", {
    params: { q: query,page,limit },
  });
};

export const removeFromFavourite = async (id: string) => {
  return await api.delete(`/movies/favourites/${id}`);
};

export const addToFavourite = async (movie: any) => {
  return await api.post("/movies/favourites", movie);
};

export const getFavourites=async()=>{
  return await api.get("/movies/favourites")
}