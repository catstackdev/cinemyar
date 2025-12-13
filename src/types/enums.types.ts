/**
 * Frontend type definitions derived from backend-generated enums
 * Import the const objects from @/shared/types/enums and derive types from them
 * 
 * This file should be updated when backend enums change
 */

import * as BackendEnums from "@/shared/types/enums";

// Derive types from backend const objects
export type UserRole = typeof BackendEnums.UserRole[keyof typeof BackendEnums.UserRole];
export type SubscriptionTier = typeof BackendEnums.SubscriptionTier[keyof typeof BackendEnums.SubscriptionTier];
export type ContentStatus = typeof BackendEnums.ContentStatus[keyof typeof BackendEnums.ContentStatus];
export type VideoQuality = typeof BackendEnums.VideoQuality[keyof typeof BackendEnums.VideoQuality];

// Re-export the const objects for use in code
export { UserRole as UserRoleEnum } from "@/shared/types/enums";
export { SubscriptionTier as SubscriptionTierEnum } from "@/shared/types/enums";
export { ContentStatus as ContentStatusEnum } from "@/shared/types/enums";
export { VideoQuality as VideoQualityEnum } from "@/shared/types/enums";
