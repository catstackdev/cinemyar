export const CRUD = {
  CREATE: "create",
  READ: "read",
  UPDATE: "update",
  DELETE: "delete",
} as const;
export const GENRE_PERMISSIONS = {
  CREATE: "genre.create",
  UPDATE: "genre.update",
  DELETE: "genre.delete",
  DELETED_VIEW: "genre.delete.view",
  DELETED_RESTORE: "genre.delete.restore",
  DELETE_PERMANENT: "genre.delete.permanent",
} as const;
