import { MovieApiData } from "../../types/movie-api-data";
import Api from "./Api";
import Movie from "./Movie";

class MovieList {
  #movies: Movie[];

  constructor() {
    this.#movies = [];
  }

  get movies() {
    return [...this.#movies];
  }

  getMoviesByPage(page: number) {
    return this.movies.slice(
      Api.NUM_MOVIES_PER_PAGE * (page - 1),
      Api.NUM_MOVIES_PER_PAGE * page
    );
  }

  addMovie(movie: Movie) {
    this.#movies.push(movie);
  }

  async fetchMovies(page: number) {
    const movieUrl = Api.generateUrl(page);

    try {
      const { results: movies } = await Api.get<MovieApiData[]>(movieUrl);

      movies.forEach((movie) => {
        this.addMovie(
          new Movie({
            title: movie.title,
            thumbnail: `${Api.THUMBNAIL_URL}${movie.poster_path}`,
            rating: movie.vote_average,
          })
        );
      });
    } catch (e) {
      alert(e.message);
    }
  }
}

export default MovieList;