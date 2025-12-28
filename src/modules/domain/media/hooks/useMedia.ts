import {
  useQueryClient,
  useMutation,
  QueryClient,
  type QueryKey,
  type MutateOptions,
} from "@tanstack/react-query";
import { mediaAPI } from "../api/media.api";
import { useState } from "react";
import type {
  ApiMediaDelParam,
  ApiMediaPostParam,
  MediaUploadParams,
} from "../api/media.types";
import { queryClient } from "@/contexts/AppProviders";
import type {
  APiDelEntityVersionActionType,
  APiPostEntityVersionActionType,
  ApiResponse,
} from "@/shared/types";

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
      if (action === "reject" && !params.reason) {
        console.error("A reason is required to reject media.");
        return;
      }
      return mutation.mutate({ ...params, action }, options);
    };

    return { ...mutation, mutate: execute };
  };
};

export const useApproveMedia = createMediaPostActionHook("approve");
export const useRejectMedia = createMediaPostActionHook("reject");
export const usePublishMedia = createMediaPostActionHook("publish");
export const useRollbackMedia = createMediaPostActionHook("rollback");
export const useRecoverbackMedia = createMediaPostActionHook("recover");

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
