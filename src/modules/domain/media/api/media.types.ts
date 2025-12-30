import type { GenreImageType } from "@/shared/constants";
import type {
  APiDelEntityVersionActionType,
  APIEntityType,
  APiGetEntityVersionActionType,
  APiPostEntityVersionActionType,
} from "@/shared/types";
import type { APIMediaType } from "@/shared/types/media/media.types";

export interface MediaUploadParams {
  entityType: APIEntityType;
  entityId: string;
  mediaType: APIMediaType;
  subType: GenreImageType;
  file: File;
}
export interface MediaUploadApiParams extends MediaUploadParams {
  onProgress?: (percent: number) => void;
}
export interface MediaParams {
  entityType: string;
  entityId: string;
  mediaType: APIMediaType;
  subType: GenreImageType;
  version: number;
  reason?: string;
}
export interface ApiMediaPostParam extends MediaParams {
  action: APiPostEntityVersionActionType;
}

export interface ApiMediaGetParam extends MediaParams {
  action: APiGetEntityVersionActionType;
}
export interface ApiMediaDelParam extends MediaParams {
  action: APiDelEntityVersionActionType;
}

export interface MediaRegenerateParams {
  entityType: APIEntityType;
  entityId: string;
  mediaType: APIMediaType;
  subType: GenreImageType;
  version: number;
}

export interface MediaRegenerateResponse {
  message: string;
  imageId: string;
  version: number;
  status: string;
  urls: Record<string, string>;
  jobId?: string;
}
