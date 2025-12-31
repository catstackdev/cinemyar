import {
  useQueryClient,
  useMutation,
  QueryClient,
  type QueryKey,
  type MutateOptions,
} from "@tanstack/react-query";
import { mediaAPI } from "../api/media.api";
import { useState, useCallback, useRef, useEffect } from "react";
import type {
  ApiMediaDelParam,
  ApiMediaPostParam,
  MediaUploadParams,
  MediaRegenerateParams,
  MediaRegenerateResponse,
} from "../api/media.types";
import { queryClient } from "@/contexts/AppProviders";
import type {
  APiDelEntityVersionActionType,
  APiPostEntityVersionActionType,
  ApiResponse,
} from "@/shared/types";
import { useJobProgress } from "@/hooks/useJobProgress";
import type { ProgressEvent } from "@/shared/types/progress.types";

export const useUploadMedia = () => {
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState(0);

  const mutation = useMutation({
    mutationFn: ({
      entityId,
      entityType,
      mediaType,
      subType,
      file,
    }: MediaUploadParams) =>
      mediaAPI.uploadMedia({
        entityId,
        entityType,
        mediaType,
        subType,
        file,
        onProgress: (percent) => {
          setUploadProgress(percent);
        },
      }),
    onSuccess: (_, variables) => {
      setUploadProgress(0);
      return refreshQueryClient(
        queryClient,
        variables.entityType,
        variables.entityId,
        false,
      );
    },

    onError: () => {
      setUploadProgress(0);
    },
  });

  return {
    ...mutation,
    uploadProgress,
  };
};
const usePostMediaAction = () => {
  return useMutation({
    mutationFn: (params: ApiMediaPostParam) =>
      mediaAPI.postVersionMedia(params),
    onSuccess: (_, variables) => {
      return refreshQueryClient(
        queryClient,
        variables.entityType,
        variables.entityId,
        true,
      );
    },
  });
};

const useDeleteMediaAction = () => {
  return useMutation({
    mutationFn: (params: ApiMediaDelParam) => mediaAPI.delVersionMedia(params),
    onSuccess: (_, variables) => {
      return refreshQueryClient(
        queryClient,
        variables.entityType,
        variables.entityId,
        true,
      );
    },
  });
};
const createMediaPostActionHook = (action: APiPostEntityVersionActionType) => {
  return () => {
    const mutation = usePostMediaAction();
    const execute = (
      params: Omit<ApiMediaPostParam, "action">,
      options?: MutateOptions<ApiResponse<any>, Error, ApiMediaPostParam>,
    ) => {
      return mutation.mutate({ ...params, action }, options);
    };
    return { ...mutation, mutate: execute };
  };
};

export const usePublishMedia = createMediaPostActionHook("publish");
export const useUnpublishMedia = createMediaPostActionHook("unpublish");
export const useRecoverMedia = createMediaPostActionHook("recover");

const createMediaDeleteActionHook = (action: APiDelEntityVersionActionType) => {
  return () => {
    const mutation = useDeleteMediaAction();
    const execute = (
      params: Omit<ApiMediaDelParam, "action">,
      options?: MutateOptions<ApiResponse<any>, Error, ApiMediaDelParam>,
    ) => {
      if (action === "permanent" && !params?.reason) {
        console.error("A reason is required to reject media.");
        return;
      }
      return mutation.mutate({ ...params, action }, options);
    };

    return { ...mutation, mutate: execute };
  };
};

export const useSofDeleteMedia = createMediaDeleteActionHook("staged");
export const usePermanentDeleteMedia = createMediaDeleteActionHook("permanent");

/**
 * Hook for regenerating media with job progress tracking
 * Combines mutation with useJobProgress for real-time progress updates
 *
 * @example
 * ```tsx
 * const { regenerate, isRegenerating, progress, jobProgress } = useMediaRegenerate({
 *   onComplete: () => toast.success('Regeneration complete!'),
 * });
 *
 * const handleClick = async () => {
 *   await regenerate({
 *     entityType: 'genres',
 *     entityId: 'uuid',
 *     mediaType: 'images',
 *     subType: 'ICON',
 *     version: 1
 *   });
 * };
 *
 * {isRegenerating && <Progress value={jobProgress?.progress || 0} />}
 * ```
 */
export const useMediaRegenerate = (options?: {
  mode?: "sse" | "polling";
  onProgress?: (event: ProgressEvent) => void;
  onComplete?: (event: ProgressEvent) => void;
  onError?: (event: ProgressEvent) => void;
}) => {
  const [jobId, setJobId] = useState<string | null>(null);

  // Use refs to keep callbacks stable without causing re-renders
  const onProgressRef = useRef(options?.onProgress);
  const onCompleteRef = useRef(options?.onComplete);
  const onErrorRef = useRef(options?.onError);

  // Update refs when callbacks change
  useEffect(() => {
    onProgressRef.current = options?.onProgress;
    onCompleteRef.current = options?.onComplete;
    onErrorRef.current = options?.onError;
  }, [options?.onProgress, options?.onComplete, options?.onError]);

  // Stable callbacks
  const handleProgress = useCallback((event: ProgressEvent) => {
    onProgressRef.current?.(event);
  }, []);

  const handleComplete = useCallback((event: ProgressEvent) => {
    onCompleteRef.current?.(event);
    setJobId(null);
  }, []);

  const handleError = useCallback((event: ProgressEvent) => {
    onErrorRef.current?.(event);
    setJobId(null); // Clear jobId after error
  }, []);

  // Job progress tracking hook
  const {
    progress: jobProgress,
    isLoading: isTrackingJob,
    reset: resetJobProgress,
  } = useJobProgress({
    jobId: jobId || "",
    mode: options?.mode || "sse",
    autoStart: !!jobId,
    onProgress: handleProgress,
    onComplete: handleComplete,
    onError: handleError,
  });

  // Regenerate mutation
  const mutation = useMutation({
    mutationFn: (params: MediaRegenerateParams) =>
      mediaAPI.regenerateMedia(params),
    onSuccess: (response, variables) => {
      if (response.data.jobId) {
        setJobId(response.data.jobId);
      } else {
        const completeEvent: ProgressEvent = {
          jobId: "sync",
          step: "completed",
          progress: 100,
          message: response.data.message || "Regeneration completed",
          status: "completed",
          timestamp: new Date().toISOString(),
          metadata: response.data,
        };
        handleComplete(completeEvent);
      }

      // Refresh cache
      // return refreshQueryClient(
      //   queryClient,
      //   variables.entityType,
      //   variables.entityId,
      //   true,
      // );
    },
    onError: (error) => {
      setJobId(null);
      resetJobProgress();
    },
  });

  // Regenerate function with proper typing
  const regenerate = useCallback(
    (
      params: MediaRegenerateParams,
      mutationOptions?: MutateOptions<
        ApiResponse<MediaRegenerateResponse>,
        Error,
        MediaRegenerateParams
      >,
    ) => {
      // Reset previous job progress
      resetJobProgress();
      return mutation.mutate(params, mutationOptions);
    },
    [mutation, resetJobProgress],
  );

  // Debug logging
  // if (jobProgress) {
  // console.log("[useMediaRegenerate] Job progress update:", {
  //   progress: jobProgress.progress,
  //   step: jobProgress.step,
  //   message: jobProgress.message,
  //   status: jobProgress.status,
  //   jobProgress,
  // });
  // }

  return {
    ...mutation,
    regenerate,
    isRegenerating: mutation.isPending || isTrackingJob,
    progress: jobProgress?.progress || 0,
    jobProgress,
    currentStep: jobProgress?.step,
    jobMessage: jobProgress?.message,
  };
};

const invalidate = (
  queryClient: QueryClient,
  queryKey: QueryKey,
  exact = false,
) =>
  queryClient.invalidateQueries({
    queryKey,
    exact,
  });

export const refreshQueryClient = (
  queryClient: QueryClient,
  type: string,
  id?: string,
  onlyThis = false,
) => {
  const tasks: Promise<unknown>[] = [];
  if (id) {
    [
      [type, id],
      ["public", type, id],
      ["admin", type, id],
      ["admin", "audit", type],
    ].forEach((key) => {
      tasks.push(invalidate(queryClient, key, true));
    });
  }
  if (!onlyThis) {
    [[type], ["public", type], ["admin", type]].forEach((key) => {
      tasks.push(invalidate(queryClient, key));
    });
  }

  return Promise.all(tasks);
};
