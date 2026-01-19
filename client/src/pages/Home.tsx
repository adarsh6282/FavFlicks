import { useEffect, useState } from "react";
import { Search, Heart, LogOut } from "lucide-react";
import image from "../assets/icon.png";
import {
  addToFavourite,
  getFavourites,
  removeFromFavourite,
  searchMovies,
} from "../services/omdb.services";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { errorToast, successToast } from "../components/Toast";

const Home = () => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("avengers");

  const toggleWishlist = async (movie: any) => {
    try {
      const id = movie.imdbID;

      if (wishlist.includes(id)) {
        await removeFromFavourite(id);
        setWishlist((prev) => prev.filter((mid) => mid !== id));
        successToast("Removed From Favourites");
      } else {
        await addToFavourite(movie);
        setWishlist((prev) => [...prev, id]);
        successToast("Added To Favourites");
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      console.log(err);
      errorToast(error.response?.data?.message ?? "Something went wrong");
    }
  };

  const fetchMovies = async () => {
    try {
      const res = await searchMovies(searchQuery || "avengers");
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchMovies();
  }, [searchQuery]);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const res = await getFavourites();
        const ids = res.data.map((m: any) => m.imdbID);
        setWishlist(ids);
      } catch (err: unknown) {
        const error = err as AxiosError<{ message: string }>;
        console.log(err);
        errorToast(error.response?.data?.message ?? "Something went wrong");
      }
    };

    loadWishlist();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="fixed top-0 w-full bg-gray-900 bg-opacity-95 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={image} className="h-15 w-15 mt-1" alt="logo" />
            <h1 className="text-3xl font-bold text-white">Fav-Flicks</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                placeholder="Search movies..."
                className="bg-gray-800 text-white pl-9 pr-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button className="p-2 rounded-full hover:bg-gray-800 transition">
              <Heart className="w-5 h-5 text-red-500" />
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition"
            >
              <LogOut className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </header>

      <div className="pt-30 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <section className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Popular Movies</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movies.map((movie: any) => {
                const isWishlisted = wishlist.includes(movie.imdbID);

                return (
                  <div
                    key={movie.imdbID}
                    className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200"
                  >
                    <button
                      className="absolute top-2 right-2 z-10 p-1 bg-black/60 rounded-full hover:bg-black"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(movie);
                      }}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isWishlisted
                            ? "text-red-500 fill-red-500"
                            : "text-white"
                        }`}
                      />
                    </button>

                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="h-48 w-full object-cover"
                    />
                    <div className="p-3">
                      <h4 className="font-semibold truncate">{movie.Title}</h4>
                      <p className="text-sm text-gray-400">{movie.Year}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
