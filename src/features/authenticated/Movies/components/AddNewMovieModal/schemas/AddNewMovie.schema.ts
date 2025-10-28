import { z } from "zod";

// const CURRENT_YEAR = new Date().getFullYear();

// const base64Regex = /^(?:data:[\w/+.-]+;base64,)?[A-Za-z0-9+/]+={0,2}$/;

// export const addNewMovieSchema = z.object({
//   // required strings
//   title: z.string().min(1, "Title is required"),
//   description: z.string().min(1, "Description is required"),
//   genre: z.string().min(1, "Genre is required"),
//
//   releaseYear: z.coerce
//     .number()
//     .int("releaseYear must be an integer")
//     .min(1888, "releaseYear seems too old")
//     .max(CURRENT_YEAR + 1, `releaseYear must be <= ${CURRENT_YEAR + 1}`),
//
//   duration: z.coerce.number().int().positive().optional(),
//
//   // optional binary blobs represented as base64 strings (or data URI)
//   poster: z
//     .string()
//     .optional()
//     .refine((v) => (v === undefined ? true : base64Regex.test(v)), {
//       message: "poster must be a base64 string or data URI",
//     }),
//
//   video: z
//     .string()
//     .optional()
//     .refine((v) => (v === undefined ? true : base64Regex.test(v)), {
//       message: "video must be a base64 string or data URI",
//     }),
//
//   trailer: z
//     .string()
//     .optional()
//     .refine((v) => (v === undefined ? true : base64Regex.test(v)), {
//       message: "trailer must be a base64 string or data URI",
//     }),
// });

export const AddNewMovieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  genre: z.string().min(1, "Genre is required"),
  releaseYear: z.coerce.number().int().min(1900, "Invalid year"),
  duration: z.coerce.number().optional(),
  poster: z.string().optional(),
  video: z.string().optional(),
  trailer: z.string().optional(),
});

export type AddNewMovieFormData = z.infer<typeof AddNewMovieSchema>;
