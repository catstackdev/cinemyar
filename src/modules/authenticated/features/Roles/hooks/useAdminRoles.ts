import type { AllAdminRoleParams } from "@/shared/types";
import {
  AdminAllRolesOptionsQueryKey,
  AdminAllRolesQueryKey,
  AdminRoleDetailQueryKey,
} from "../api/roles-query-key";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminRolesAPI } from "../api/admin-roles.api";
import { Time } from "@/shared/constants";
import type { AdminCreateRoleFormData } from "../schemas/roles.schemas";
import { refreshQueryClient } from "@/modules/domain/media/hooks/useMedia";
import type {
  AdminAssignRolePayload,
  AdminRoleDetailParams,
} from "../api/admin-roles.types";

export const useAdminRoles = (params: AllAdminRoleParams) => {
  const queryKey = AdminAllRolesQueryKey(params);
  return useQuery({
    queryKey: queryKey,
    queryFn: () => AdminRolesAPI.getRoles(params),
    staleTime: 5 * Time.MINUTE,
  });
};
export const useAdminRoleOptions = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: AdminAllRolesOptionsQueryKey(),
    queryFn: () => AdminRolesAPI.getRolesOptions(),
    staleTime: 5 * Time.MINUTE,
    ...options,
  });
};

export const useAdminRole = (id?: string, params?: AdminRoleDetailParams) => {
  const queryKey = AdminRoleDetailQueryKey(id!, params);
  return useQuery({
    queryKey: queryKey,
    queryFn: () => AdminRolesAPI.getRole(id!, params),
    enabled: Boolean(id),
    staleTime: 5 * Time.MINUTE,
  });
};
export const useAdminAddRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AdminRolesAPI.addRole,
    onSuccess: () => {
      return refreshQueryClient(queryClient, "roles");
    },
  });
};
export const useAdminUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<AdminCreateRoleFormData>;
    }) => AdminRolesAPI.updateRole(id, data),
    onSuccess: () => {
      return refreshQueryClient(queryClient, "roles");
    },
  });
};
export const useAdminDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AdminRolesAPI.DeleteRole,
    onSuccess: () => {
      return refreshQueryClient(queryClient, "roles");
    },
    onError: (err: any) => {
      console.error("Failed to delete role:", err);
    },
  });
};
export const useAdminAssignRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: string;
      payload: AdminAssignRolePayload;
    }) => AdminRolesAPI.postAssignRoles(userId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });
};

export const useAdminRemoveRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, roleId }: { id: string; roleId: string }) =>
      AdminRolesAPI.deleteRemoveRoles(id, roleId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });
};
