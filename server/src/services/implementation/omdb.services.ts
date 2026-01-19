import { IMovie } from "../../types/movie";
import { IOmdbService } from "../interfaces/omdb.interface";
import axios from "axios";
import fs from "fs";
import path from "path";

const baseUrl = process.env.OMDB_BASE_URL;
const apiKey = process.env.OMDB_API_KEY as string;
const filePath = path.join(__dirname, "../../data/favourites.json");

export class OmdbService implements IOmdbService {
  async searchMovies(query: string): Promise<IMovie | null> {
    const response = await axios.get(baseUrl!, {
      params: {
        s: query,
        apiKey: apiKey,
      },
    });

    return response.data.Search || [];
  }

  async addToFavourite(
    userId: string,
    movie: Partial<IMovie>,
  ): Promise<IMovie[] | null> {
    let data: any = {};

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      data = fileContent ? JSON.parse(fileContent) : {};
    }

    if (!data[userId]) {
      data[userId] = [];
    }

    data[userId].push(movie);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return data[userId];
  }

  async getFavourites(userId: string): Promise<IMovie[]|null> {
    let data: any = {};

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      data = fileContent ? JSON.parse(fileContent) : {};
    }

    return data[userId] || [];
  }

  async removeFromFavourite(
  userId: string,
  imdbID: string
): Promise<IMovie[] | null> {
  let data: any = {};

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    data = fileContent ? JSON.parse(fileContent) : {};
  }

  if (!data[userId]) {
    return [];
  }

  data[userId] = data[userId].filter(
    (movie: IMovie) => movie.imdbID !== imdbID
  );

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return data[userId];
}

}
