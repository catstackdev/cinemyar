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
  Image,
  Tooltip,
} from "@/components/ui";
import { useMovies } from "../../hooks/useMovies";

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
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
        <Card key={index}>
          <Tooltip
            delay={100}
            content={
              <div className="h-auto w-88">
                <Image
                  src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800"
                  alt="Cover fit"
                  fit="cover"
                  className="h-full w-full"
                />
                <h3> Movie name {item} </h3>
                <p>Description</p>
              </div>
            }
          >
            <Card className="h-64 w-48 rounded-lg overflow-hidden hover:shadow-md hover:cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800"
                alt="Cover fit"
                fit="cover"
                className="h-full w-full"
              />
            </Card>
          </Tooltip>
        </Card>
      ))}

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
