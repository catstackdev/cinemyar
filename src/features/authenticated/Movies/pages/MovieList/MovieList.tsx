import React, { useState } from "react";
import clsx from "clsx";
import styles from "./MovieList.module.css";
import type { MovieListProps } from "./MovieList.types";
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Button,
  Loading,
  Card,
  EmptyState,
} from "@/components/ui";
import { useMovies } from "../../hooks/useMovies";
import { MovieItemCard } from "../../components/MovieItemCard";

const MovieList: React.FC<MovieListProps> = ({ children, className }) => {
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useMovies({ page: 1, search });

  if (isLoading) {
    return (
      <div className={clsx(styles.root, className)}>
        <h1>Movies</h1>
        <Loading size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={clsx(styles.root, className)}>
        <h1>Movies</h1>
        <p className="text-red-500">Error loading movies: {error.message}</p>
      </div>
    );
  }
  const images = [
    "",
    "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800",
    "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=800",
    "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800",
    "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800",

    "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800",
    "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=800",
    "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800",
    "https://images.unsplash.com/photo-1499084732479-de2c02d45fc4?w=800",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800",
    "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=800",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800",
    "https://images.unsplash.com/photo-1502786129293-79981df4e689?w=800",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
    "",
  ];

  return (
    <div className={clsx(styles.root, className)}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Movies</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
        {Array.from({ length: 20 }, (_, i) => (
          <MovieItemCard
            key={i}
            title={`Movie ${i + 1}`}
            description="An epic adventure awaits"
            imageUrl={images[i % images.length]}
            onClick={() => console.log(`Clicked movie ${i + 1}`)}
          />
        ))}
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Release Date</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell className="font-medium">{movie.title}</TableCell>
                <TableCell>{movie.genre}</TableCell>
                <TableCell>
                  {new Date(movie.releaseDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{movie.rating}/10</TableCell>
                <TableCell>{movie.duration} min</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {!!data && data?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>
                  <EmptyState title="No data available" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* {data && ( */}
      {/*   <div className="flex justify-between items-center mt-6"> */}
      {/*     <p className="text-sm text-gray-600"> */}
      {/*       Showing {data.movies.length} of {data.total} movies */}
      {/*     </p> */}
      {/*     <div className="flex gap-2"> */}
      {/*       <Button */}
      {/*         variant="outline" */}
      {/*         disabled={page === 1} */}
      {/*         onClick={() => setPage(page - 1)} */}
      {/*       > */}
      {/*         Previous */}
      {/*       </Button> */}
      {/*       <Button */}
      {/*         variant="outline" */}
      {/*         disabled={data.movies.length < 20} */}
      {/*         onClick={() => setPage(page + 1)} */}
      {/*       > */}
      {/*         Next */}
      {/*       </Button> */}
      {/*     </div> */}
      {/*   </div> */}
      {/* )} */}

      {children}
    </div>
  );
};

export default MovieList;
