// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/media-permissions.const.ts
// Generated: 2025-12-30T04:21:52.057Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

/**
 * Media Permissions Helper
 *
 * Centralized media permissions for all entities (Genre, Movie, Actor, User)
 * Use these constants in controllers instead of hardcoding permission strings
 */

// ==========================================
// MEDIA PERMISSION CONSTANTS
// ==========================================

export const MediaPermissions = {
  // View & Browse
  VIEW: 'media.view',
  VIEW_ALL: 'media.view.all',
  VIEW_VERSIONS: 'media.view.versions',

  // Upload & Staging
  UPLOAD: 'media.upload',
  UPLOAD_GENRE: 'media.upload.genre',
  UPLOAD_MOVIE: 'media.upload.movie',
  UPLOAD_ACTOR: 'media.upload.actor',

  // Approval Workflow
  APPROVE: 'media.approve',
  REJECT: 'media.reject',
  PUBLISH: 'media.publish',
  UNPUBLISH: 'media.unpublish',

  // Version Management
  ROLLBACK: 'media.rollback',
  RECOVER: 'media.recover',

  // Delete Operations
  DELETE: 'media.delete',
  DELETE_STAGED: 'media.delete.staged',
  DELETE_PERMANENT: 'media.delete.permanent',

  // System & Maintenance
  CLEANUP: 'media.cleanup',
  STATS: 'media.stats',
  HEALTH: 'media.health',
} as const;

// ==========================================
// GENRE-SPECIFIC MEDIA PERMISSIONS
// ==========================================

export const GenreMediaPermissions = {
  VIEW: 'genre.view',
  UPLOAD: 'genre.upload', // OR media.upload.genre
  APPROVE: 'genre.approve', // OR media.approve
  PUBLISH: 'genre.publish', // OR media.publish
  REJECT: 'genre.reject', // OR media.reject
  DELETE: 'genre.delete',
  DELETE_PERMANENT: 'genre.delete.permanent',
} as const;

// ==========================================
// MOVIE-SPECIFIC MEDIA PERMISSIONS
// ==========================================

export const MovieMediaPermissions = {
  VIEW: 'movie.view',
  UPLOAD: 'movie.upload', // OR media.upload.movie
  APPROVE: 'movie.approve', // OR media.approve
  PUBLISH: 'movie.publish', // OR media.publish
  REJECT: 'movie.reject', // OR media.reject
  DELETE: 'movie.delete',
  DELETE_PERMANENT: 'movie.delete.permanent',
} as const;

// ==========================================
// ACTOR-SPECIFIC MEDIA PERMISSIONS
// ==========================================

export const ActorMediaPermissions = {
  VIEW: 'actor.view',
  UPLOAD: 'actor.upload', // OR media.upload.actor
  DELETE: 'actor.delete',
} as const;

// ==========================================
// PERMISSION MAPPING BY ENTITY TYPE
// ==========================================

export const EntityMediaPermissions = {
  Genre: GenreMediaPermissions,
  Movie: MovieMediaPermissions,
  Actor: ActorMediaPermissions,
} as const;

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get upload permission for a specific entity type
 */
export function getUploadPermission(
  entityType: 'Genre' | 'Movie' | 'Actor',
): string {
  switch (entityType) {
    case 'Genre':
      return GenreMediaPermissions.UPLOAD;
    case 'Movie':
      return MovieMediaPermissions.UPLOAD;
    case 'Actor':
      return ActorMediaPermissions.UPLOAD;
    default:
      return MediaPermissions.UPLOAD;
  }
}

/**
 * Get approve permission for a specific entity type
 */
export function getApprovePermission(entityType: 'Genre' | 'Movie'): string {
  switch (entityType) {
    case 'Genre':
      return GenreMediaPermissions.APPROVE;
    case 'Movie':
      return MovieMediaPermissions.APPROVE;
    default:
      return MediaPermissions.APPROVE;
  }
}

/**
 * Get publish permission for a specific entity type
 */
export function getPublishPermission(entityType: 'Genre' | 'Movie'): string {
  switch (entityType) {
    case 'Genre':
      return GenreMediaPermissions.PUBLISH;
    case 'Movie':
      return MovieMediaPermissions.PUBLISH;
    default:
      return MediaPermissions.PUBLISH;
  }
}

/**
 * Get delete permission for a specific entity type
 */
export function getDeletePermission(
  entityType: 'Genre' | 'Movie' | 'Actor',
): string {
  switch (entityType) {
    case 'Genre':
      return GenreMediaPermissions.DELETE;
    case 'Movie':
      return MovieMediaPermissions.DELETE;
    case 'Actor':
      return ActorMediaPermissions.DELETE;
    default:
      return MediaPermissions.DELETE;
  }
}

// ==========================================
// USAGE EXAMPLES
// ==========================================

/**
 * Example usage in controllers:
 *
 * // Genre Images
 * @Post(':id/images/:type')
 * @Permissions(GenreMediaPermissions.UPLOAD)
 * async uploadImage() { ... }
 *
 * @Post(':id/images/:type/approve/:version')
 * @Permissions(GenreMediaPermissions.APPROVE)
 * async approveImage() { ... }
 *
 * @Post(':id/images/:type/publish/:version')
 * @Permissions(GenreMediaPermissions.PUBLISH)
 * async publishImage() { ... }
 *
 * // Generic Media (works for all entities)
 * @Get('media')
 * @Permissions(MediaPermissions.VIEW_ALL)
 * async getAllMedia() { ... }
 *
 * @Post('media/cleanup')
 * @Permissions(MediaPermissions.CLEANUP)
 * async cleanupMedia() { ... }
 *
 * // Dynamic permission based on entity type
 * @Post(':entityType/:id/upload')
 * async uploadMedia(@Param('entityType') entityType: 'Genre' | 'Movie') {
 *   const permission = getUploadPermission(entityType);
 *   // Check permission dynamically
 * }
 */
