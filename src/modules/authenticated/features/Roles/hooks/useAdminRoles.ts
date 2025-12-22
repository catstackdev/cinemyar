import type { AllAdminRoleParams } from "@/shared/types/types";
import {
  AdminAllRolesQueryKey,
  AdminRolesQueryKey,
} from "../api/roles-query-key";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminRolesAPI } from "../api/admin-roles.api";
import { Time } from "@/shared/types/constants";
import type { AdminCreateRoleFormData } from "../schemas/roles.schemas";
import { refreshQueryClient } from "@/modules/domain/media/hooks/useMedia";

export const useAdminRoles = (params: AllAdminRoleParams) => {
  const queryKey = AdminAllRolesQueryKey(params);
  return useQuery({
    queryKey: queryKey,
    queryFn: () => AdminRolesAPI.getRoles(params),
    staleTime: 5 * Time.MINUTE,
  });
};

export const useAdminRole = (id?: string) => {
  const queryKey = AdminRolesQueryKey(id!);
  return useQuery({
    queryKey: queryKey,
    queryFn: () => AdminRolesAPI.getRole(id!),
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
