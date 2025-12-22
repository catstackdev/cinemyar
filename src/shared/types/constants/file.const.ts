// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/file.const.ts
// Generated: 2025-12-22T16:22:29.029Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

export const FileSize = {
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
  TB: 1024 * 1024 * 1024 * 1024,
} as const;

export type FileSizeUnit = keyof typeof FileSize;

// ["image/jpeg", "image/jpg", "image/png", "image/webp"]
export const FileType = {
  IMAGE: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  VIDEO: ['video/mp4', 'video/webm', 'video/x-msvideo'],
  AUDIO: ['audio/mpeg', 'audio/mp3', 'audio/ogg', 'audio/wav'],
  DOCUMENT: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  SUBTITLE: [
    'application/x-subrip',
    'application/x-srt',
    'application/x-ass',
    'text/vtt',
  ],
} as const;

export type FileType = keyof typeof FileType;

export const FileExtension = {
  IMAGE: ['jpg', 'jpeg', 'png', 'webp'],
  VIDEO: ['mp4', 'webm', 'avi', 'mov', 'mkv', 'flv', 'wmv'],
  AUDIO: ['mp3', 'ogg', 'wav'],
  DOCUMENT: ['pdf', 'doc', 'docx'],
  SUBTITLE: ['srt', 'ass', 'vtt'],
} as const;

export type FileExtension = keyof typeof FileExtension;

export const FileMimeType = {
  IMAGE: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  VIDEO: ['video/mp4', 'video/webm', 'video/x-msvideo'],
  AUDIO: ['audio/mpeg', 'audio/mp3', 'audio/ogg', 'audio/wav'],
  DOCUMENT: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  SUBTITLE: [
    'application/x-subrip',
    'application/x-srt',
    'application/x-ass',
    'text/vtt',
  ],
} as const;

export type FileMimeType = keyof typeof FileMimeType;

export const FileTypeExtension = {
  IMAGE: ['jpg', 'jpeg', 'png', 'webp'],
  VIDEO: ['mp4', 'webm', 'avi', 'mov', 'mkv', 'flv', 'wmv'],
  AUDIO: ['mp3', 'ogg', 'wav'],
  DOCUMENT: ['pdf', 'doc', 'docx'],
  SUBTITLE: ['srt', 'ass', 'vtt'],
} as const;

export type FileTypeExtension = keyof typeof FileTypeExtension;

export const FileTypeMimeType = {
  IMAGE: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  VIDEO: ['video/mp4', 'video/webm', 'video/x-msvideo'],
  AUDIO: ['audio/mpeg', 'audio/mp3', 'audio/ogg', 'audio/wav'],
  DOCUMENT: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  SUBTITLE: [
    'application/x-subrip',
    'application/x-srt',
    'application/x-ass',
    'text/vtt',
  ],
} as const;

export type FileTypeMimeType = keyof typeof FileTypeMimeType;

export const FileTypeDescription = {
  IMAGE: 'Image',
  VIDEO: 'Video',
  AUDIO: 'Audio',
  DOCUMENT: 'Document',
  SUBTITLE: 'Subtitle',
} as const;

export type FileTypeDescription = keyof typeof FileTypeDescription;

export const FileTypeIcon = {
  IMAGE: '🖼️',
  VIDEO: '🎥',
  AUDIO: '🎵',
  DOCUMENT: '📄',
  SUBTITLE: '📖',
} as const;

export type FileTypeIcon = keyof typeof FileTypeIcon;
