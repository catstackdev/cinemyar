import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AddUpdateRoleProps } from "./AddUpdateRole.types";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalRoot,
  ModalTitle,
} from "@/components/ui/Modal";
import {
  Button,
  LoadingOverlay,
  FormField,
  Badge,
  Checkbox,
} from "@/components/ui";
import { cn } from "@/utils/helpers/classNames";
import { usePermissionApi } from "@/modules/domain/permission/hooks/usePermissionApi";
import {
  AdminCreateRoleSchema,
  type AdminCreateRoleFormData,
} from "../../../schemas/roles.schemas";
import {
  useAdminAddRole,
  useAdminUpdateRole,
  useAdminRole,
} from "../../../hooks/useAdminRoles";
import type { PermissionAction, PermissionGroup } from "@/shared/types/types";
import {
  Check,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const AddUpdateRole: React.FC<AddUpdateRoleProps> = ({
  onOpenChange,
  item,
  children,
  className,
  ...rest
}) => {
  const isEditMode = Boolean(item?.id);

  // Fetch permission structure
  const { data: permissionResData, isLoading: isPermissionLoading } =
    usePermissionApi({
      enabled: Boolean(rest.open),
    });

  // Fetch role details if editing
  const { data: roleDetail, isLoading: isRoleLoading } = useAdminRole(item?.id);

  // Mutations
  const { mutate: addRole, isPending: isAdding } = useAdminAddRole();
  const { mutate: updateRole, isPending: isUpdating } = useAdminUpdateRole();

  // Form state
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    trigger,
    clearErrors,
  } = useForm<AdminCreateRoleFormData>({
    resolver: zodResolver(AdminCreateRoleSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      name: "",
      displayName: "",
      description: "",
      permissions: [],
    },
  });

  // Step state (0 = metadata, 1 = permissions)
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Permission selection state
  const [activeEntity, setActiveEntity] = useState<string>("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {},
  );

  // Initialize form with existing data in edit mode
  useEffect(() => {
    if (isEditMode && roleDetail?.data) {
      const role = roleDetail.data;
      reset({
        name: role.name,
        displayName: role.displayName,
        description: role.description || "",
        permissions: role.permissions,
      });
      setSelectedPermissions(role.permissions);
      setValue("permissions", role.permissions);
    } else if (!isEditMode && rest.open) {
      reset({
        name: "",
        displayName: "",
        description: "",
        permissions: [],
      });
      setSelectedPermissions([]);
    }
  }, [roleDetail?.data, isEditMode, reset, rest.open, setValue]);

  // Set first entity as active when permissions load and expand first group
  useEffect(() => {
    if (permissionResData?.data && !activeEntity) {
      const firstGroupKey = Object.keys(permissionResData.data.groups)[0];
      if (firstGroupKey) {
        const firstGroup = permissionResData.data.groups[firstGroupKey];

        if (firstGroup?.entities?.[0]) {
          setActiveEntity(firstGroup.entities[0]);
          setExpandedGroups({ [firstGroupKey]: true });
        }
      }
    }
  }, [permissionResData?.data, activeEntity]);

  // Check if permission has unmet dependencies
  const getUnmetDependencies = useCallback(
    (permissionKey: string, currentPermissions: string[]) => {
      if (!permissionResData?.data) return [];

      const [entityKey, actionKey] = permissionKey.split(".");
      if (!entityKey || !actionKey) return [];

      const entity = permissionResData.data.permissions[entityKey];
      if (!entity) return [];

      const action = entity.actions.find(
        (a: PermissionAction) => a.key === actionKey,
      );
      if (!action?.dependencies) return [];

      return action.dependencies.filter(
        (dep: string) => !currentPermissions.includes(dep),
      );
    },
    [permissionResData?.data],
  );

  // Get permissions that depend on this one
  const getDependentPermissions = useCallback(
    (permissionKey: string, currentPermissions: string[]) => {
      if (!permissionResData?.data) return [];

      const dependents: string[] = [];
      Object.entries(permissionResData.data.permissions).forEach(
        ([entityKey, entity]) => {
          entity.actions.forEach((action) => {
            const fullKey = `${entityKey}.${action.key}`;
            if (
              action.dependencies?.includes(permissionKey) &&
              currentPermissions.includes(fullKey)
            ) {
              dependents.push(fullKey);
            }
          });
        },
      );

      return dependents;
    },
    [permissionResData?.data],
  );

  // Handle permission toggle with dependency validation
  const handlePermissionToggle = useCallback(
    (permissionKey: string) => {
      setSelectedPermissions((prev) => {
        const isSelected = prev.includes(permissionKey);

        if (isSelected) {
          // Unchecking - check if other permissions depend on this
          const dependents = getDependentPermissions(permissionKey, prev);

          if (dependents.length > 0) {
            // Auto-uncheck dependents as well
            const newPermissions = prev.filter(
              (p) => p !== permissionKey && !dependents.includes(p),
            );
            setValue("permissions", newPermissions, {
              shouldDirty: true,
              shouldValidate: true,
            });
            return newPermissions;
          }

          // No dependents, just uncheck this one
          const newPermissions = prev.filter((p) => p !== permissionKey);
          setValue("permissions", newPermissions, {
            shouldDirty: true,
            shouldValidate: true,
          });
          return newPermissions;
        } else {
          // Checking - verify dependencies are met
          const unmetDeps = getUnmetDependencies(permissionKey, prev);

          if (unmetDeps.length > 0) {
            // Auto-select dependencies
            const newPermissions = [...prev, ...unmetDeps, permissionKey];
            setValue("permissions", newPermissions, {
              shouldDirty: true,
              shouldValidate: true,
            });
            // Clear errors when permissions are added
            if (newPermissions.length > 0) {
              clearErrors("permissions");
            }
            return newPermissions;
          }

          // Dependencies met, just check this one
          const newPermissions = [...prev, permissionKey];
          setValue("permissions", newPermissions, {
            shouldDirty: true,
            shouldValidate: true,
          });
          // Clear errors when permissions are added
          if (newPermissions.length > 0) {
            clearErrors("permissions");
          }
          return newPermissions;
        }
      });
    },
    [setValue, getUnmetDependencies, getDependentPermissions, clearErrors],
  );

  // Handle select all for entity (with dependency resolution)
  const handleSelectAllEntity = useCallback(
    (entityKey: string) => {
      if (!permissionResData?.data) return;

      const entity = permissionResData.data.permissions[entityKey];
      if (!entity) return;

      const entityPermissions = entity.actions.map((action) => `${action.key}`);
      const allSelected = entityPermissions.every((p) =>
        selectedPermissions.includes(p),
      );

      setSelectedPermissions((prev) => {
        if (allSelected) {
          // Deselecting all - check for dependents across ALL entities
          const allDependents: string[] = [];
          entityPermissions.forEach((perm) => {
            const deps = getDependentPermissions(perm, prev);
            allDependents.push(...deps);
          });

          const newPermissions = prev.filter(
            (p) => !p.startsWith(`${entityKey}.`) && !allDependents.includes(p),
          );

          setValue("permissions", newPermissions, {
            shouldDirty: true,
            shouldValidate: true,
          });
          return newPermissions;
        } else {
          // Selecting all - include dependencies from other entities
          const allDependencies: string[] = [];
          entityPermissions.forEach((perm) => {
            const unmet = getUnmetDependencies(perm, prev);
            allDependencies.push(...unmet);
          });

          const newPermissions = [
            ...prev.filter((p) => !p.startsWith(`${entityKey}.`)),
            ...entityPermissions,
            ...allDependencies.filter((dep) => !prev.includes(dep)),
          ];

          setValue("permissions", newPermissions, {
            shouldDirty: true,
            shouldValidate: true,
          });
          // Clear errors when permissions are added
          if (newPermissions.length > 0) {
            clearErrors("permissions");
          }
          return newPermissions;
        }
      });
    },
    [
      permissionResData?.data,
      selectedPermissions,
      setValue,
      getUnmetDependencies,
      getDependentPermissions,
      clearErrors,
    ],
  );

  // Form submission
  const onSubmit = (data: AdminCreateRoleFormData) => {
    if (isEditMode && item?.id) {
      updateRole(
        { id: item.id, data },
        {
          onSuccess: () => {
            handleClose();
          },
        },
      );
    } else {
      addRole(data, {
        onSuccess: () => {
          handleClose();
        },
      });
    }
  };

  const handleClose = () => {
    reset();
    setSelectedPermissions([]);
    setActiveEntity("");
    setCurrentStep(0);
    setExpandedGroups({});
    onOpenChange?.(false);
  };

  // Toggle group expansion
  const toggleGroup = useCallback((groupKey: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }));
  }, []);

  // Handle "Next" from metadata step
  const handleNextStep = async () => {
    const isValid = await trigger(["name", "displayName", "description"]);

    if (isValid) {
      setCurrentStep(1);
    }
  };

  const isLoading = isPermissionLoading || (isEditMode && isRoleLoading);
  const isSaving = isAdding || isUpdating;

  // Get active entity data
  const activeEntityData = activeEntity
    ? permissionResData?.data?.permissions[activeEntity]
    : null;

  const allEntityPermissionsSelected =
    activeEntityData &&
    activeEntityData.actions.every((action) =>
      selectedPermissions.includes(action.key),
    );

  return (
    <ModalRoot open={rest.open} onOpenChange={onOpenChange}>
      <ModalContent className="border border-primary/50" size="4xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="pr-16">
            <div className="flex justify-between gap-3">
              <ModalTitle>
                {isEditMode ? "Update Role" : "Add New Role"}
              </ModalTitle>

              {/* Step Indicator */}
              <div className="flex items-center gap-2 text-sm">
                <div
                  className={cn(
                    "flex items-center gap-2 px-3 py-1 rounded-full",
                    currentStep === 0
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "bg-slate-100 text-slate-500",
                  )}
                >
                  <span
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                      currentStep === 0
                        ? "bg-blue-500 text-white"
                        : "bg-slate-300 text-slate-600",
                    )}
                  >
                    1
                  </span>
                  <span>Metadata</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
                <div
                  className={cn(
                    "flex items-center gap-2 px-3 py-1 rounded-full",
                    currentStep === 1
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "bg-slate-100 text-slate-500",
                  )}
                >
                  <span
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                      currentStep === 1
                        ? "bg-blue-500 text-white"
                        : "bg-slate-300 text-slate-600",
                    )}
                  >
                    2
                  </span>
                  <span>Permissions</span>
                </div>
              </div>
            </div>
          </ModalHeader>

          <LoadingOverlay isLoading={isLoading}>
            <ModalBody className="relative p-0 overflow-hidden flex flex-col h-[600px]">
              {currentStep === 0 ? (
                /* STEP 1: Metadata Form */
                <div className="p-6 space-y-4 overflow-y-auto flex-1">
                  <div className="max-w-3xl mx-auto">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">
                      Role Information
                    </h3>

                    <div className="p-4 space-y-4">
                      <FormField.Root
                        name="name"
                        error={errors.name?.message}
                        layout="stacked"
                      >
                        <FormField.Label>
                          Internal Name
                          <span className="text-red-500 ml-1">*</span>
                        </FormField.Label>
                        <FormField.Input
                          {...register("name")}
                          placeholder="content_manager"
                          disabled={isSaving || isEditMode}
                        />
                        {errors.name ? (
                          <FormField.Error icon>
                            {errors.name.message}
                          </FormField.Error>
                        ) : (
                          <p className="text-xs text-slate-500 mt-1">
                            snake_case only. Used in code.
                          </p>
                        )}
                      </FormField.Root>

                      <FormField.Root
                        name="displayName"
                        error={errors.displayName?.message}
                        layout="stacked"
                      >
                        <FormField.Label>
                          Display Name
                          <span className="text-red-500 ml-1">*</span>
                        </FormField.Label>
                        <FormField.Input
                          {...register("displayName")}
                          placeholder="Content Manager"
                          disabled={isSaving}
                        />
                        {errors.displayName ? (
                          <FormField.Error icon>
                            {errors.displayName.message}
                          </FormField.Error>
                        ) : (
                          <p className="text-xs text-slate-500 mt-1">
                            Human-friendly name shown in UI.
                          </p>
                        )}
                      </FormField.Root>
                    </div>

                    <FormField.Root
                      name="description"
                      error={errors.description?.message}
                      layout="stacked"
                    >
                      <FormField.Label>Description</FormField.Label>
                      <FormField.Textarea
                        {...register("description")}
                        placeholder="Manages content creation and publishing..."
                        rows={4}
                        disabled={isSaving}
                      />
                      {errors.description && (
                        <FormField.Error icon>
                          {errors.description.message}
                        </FormField.Error>
                      )}
                    </FormField.Root>

                    {selectedPermissions.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                        <Info className="w-4 h-4" />
                        <span className="font-medium">
                          {selectedPermissions.length} permission(s) selected
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* STEP 2: Permissions Selection */
                <div className="flex gap-0 flex-1 overflow-hidden">
                  {/* Expandable Sidebar */}
                  {permissionResData?.data ? (
                    <aside className="w-72 bg-slate-50 border-r border-slate-200 flex flex-col shrink-0">
                      <div className="p-4 border-b bg-white shrink-0">
                        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-tight">
                          Navigation
                        </h2>
                      </div>

                      <nav className="flex-1 overflow-y-auto py-4 space-y-6 min-h-0">
                        {Object.entries(permissionResData.data.groups).map(
                          ([groupKey, group]) => {
                            const typedGroup = group as PermissionGroup;
                            return (
                              <div key={groupKey} className="px-3">
                                {/* Group Header - Clickable */}
                                <button
                                  type="button"
                                  onClick={() => toggleGroup(groupKey)}
                                  className="w-full mb-2 px-3 py-2 rounded-lg hover:bg-slate-200/50 transition-colors"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      {expandedGroups[groupKey] ? (
                                        <ChevronDown className="w-4 h-4 text-slate-600" />
                                      ) : (
                                        <ChevronRight className="w-4 h-4 text-slate-600" />
                                      )}
                                      <h3
                                        className={cn(
                                          "text-[11px] font-bold tracking-widest uppercase text-left",
                                          typedGroup.restricted
                                            ? "text-amber-600"
                                            : "text-slate-600",
                                        )}
                                      >
                                        {typedGroup.label}
                                      </h3>
                                      {typedGroup.restricted && (
                                        <span className="text-[10px] bg-amber-100 text-amber-700 px-1 rounded font-bold">
                                          SECURE
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5 text-left">
                                    {typedGroup.description}
                                  </p>
                                </button>

                                {/* Entity List - Collapsible */}
                                {expandedGroups[groupKey] && (
                                  <div className="space-y-1 pl-2">
                                    {typedGroup.entities.map((entityKey) => {
                                      const entity =
                                        permissionResData.data.permissions[
                                          entityKey
                                        ];
                                      if (!entity) return null;

                                      const total = entity.actions.length;
                                      const selected =
                                        selectedPermissions.filter((p) =>
                                          p.startsWith(`${entityKey}.`),
                                        ).length;
                                      const isActive =
                                        activeEntity === entityKey;

                                      return (
                                        <button
                                          type="button"
                                          key={entityKey}
                                          onClick={() =>
                                            setActiveEntity(entityKey)
                                          }
                                          className={cn(
                                            "w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all group",
                                            isActive
                                              ? "bg-white shadow-sm border border-slate-200 ring-1 ring-black/5 text-blue-600"
                                              : "text-slate-600 hover:bg-slate-200/50 border border-transparent",
                                          )}
                                        >
                                          <div className="flex items-center gap-2 min-w-0">
                                            <span className="text-sm font-semibold truncate">
                                              {entity.label}
                                            </span>
                                          </div>

                                          <div
                                            className={cn(
                                              "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border flex-shrink-0",
                                              selected > 0
                                                ? "bg-blue-50 border-blue-100 text-blue-700"
                                                : "bg-slate-100 border-slate-200 text-slate-400",
                                            )}
                                          >
                                            {selected}/{total}
                                          </div>
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          },
                        )}
                      </nav>
                    </aside>
                  ) : (
                    <div className="w-72 border-r bg-slate-50 animate-pulse flex flex-col gap-4 p-4">
                      <div className="h-4 w-24 bg-slate-200 rounded" />
                      <div className="h-10 w-full bg-slate-200 rounded" />
                      <div className="h-10 w-full bg-slate-200 rounded" />
                    </div>
                  )}

                  {/* Permissions Panel - Scrollable */}
                  {activeEntityData ? (
                    <div className="flex-1 overflow-y-auto bg-slate-50 min-w-0">
                      {/* Real-time Validation Warning */}
                      {selectedPermissions.length === 0 && (
                        <div className="m-6 mb-0 flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span className="font-medium">
                            At least one permission must be selected
                          </span>
                        </div>
                      )}

                      <div className="p-6">
                        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                          {/* Entity Header */}
                          <div className="p-4 border-b flex items-center justify-between bg-white ">
                            <div>
                              <h3 className="text-lg font-bold text-slate-900">
                                {activeEntityData.label}
                              </h3>
                              <p className="text-sm text-slate-600">
                                {activeEntityData.description}
                              </p>
                            </div>
                            <Button
                              type="button"
                              size="sm"
                              variant={
                                allEntityPermissionsSelected
                                  ? "outline"
                                  : "glass"
                              }
                              onClick={() =>
                                handleSelectAllEntity(activeEntity)
                              }
                            >
                              {allEntityPermissionsSelected
                                ? "Deselect All"
                                : "Select All"}
                            </Button>
                          </div>

                          {/* Permissions List */}
                          <div className="grid gap-2 p-4 grid-cols-1  lg:grid-cols-2">
                            {activeEntityData.actions.map(
                              (action: PermissionAction) => {
                                const permissionKey = action.key;
                                const isSelected =
                                  selectedPermissions.includes(permissionKey);

                                // Check dependency status
                                const unmetDeps = isSelected
                                  ? []
                                  : getUnmetDependencies(
                                      permissionKey,
                                      selectedPermissions,
                                    );
                                const dependents = getDependentPermissions(
                                  permissionKey,
                                  selectedPermissions,
                                );
                                const hasDependencyIssue = unmetDeps.length > 0;

                                return (
                                  <label
                                    key={permissionKey}
                                    className={cn(
                                      "flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer hover:shadow-sm",
                                      isSelected
                                        ? "bg-blue-50 border-blue-200"
                                        : hasDependencyIssue
                                          ? "bg-amber-50 border-amber-200"
                                          : "bg-white border-slate-200 hover:border-slate-300",
                                      action.danger &&
                                        "border-l-4 border-l-red-500",
                                    )}
                                  >
                                    <Checkbox
                                      checked={isSelected}
                                      onChange={() =>
                                        handlePermissionToggle(permissionKey)
                                      }
                                      className="mt-0.5"
                                    />

                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <span className="font-mono text-sm font-semibold text-slate-900">
                                          {permissionKey}
                                        </span>
                                        {action.superAdminOnly && (
                                          <Badge variant="warning" size="sm">
                                            SUPER ADMIN
                                          </Badge>
                                        )}
                                        {action.danger && (
                                          <Badge variant="danger" size="sm">
                                            DANGER
                                          </Badge>
                                        )}
                                        {dependents.length > 0 &&
                                          isSelected && (
                                            <Badge variant="info" size="sm">
                                              {dependents.length} dependent
                                              {dependents.length > 1 ? "s" : ""}
                                            </Badge>
                                          )}
                                      </div>
                                      <p className="text-sm text-slate-600">
                                        {action.description}
                                      </p>

                                      {/* Show dependencies */}
                                      {action.dependencies &&
                                        action.dependencies.length > 0 && (
                                          <div className="mt-2 text-xs">
                                            <div className="flex items-start gap-1">
                                              <Info className="w-3 h-3 text-amber-600 mt-0.5 shrink-0" />
                                              <div>
                                                <span className="text-amber-700 font-semibold">
                                                  Requires:
                                                </span>
                                                <div className="mt-1 space-y-1">
                                                  {action.dependencies.map(
                                                    (dep: string) => {
                                                      const isDepMet =
                                                        selectedPermissions.includes(
                                                          dep,
                                                        );
                                                      return (
                                                        <div
                                                          key={dep}
                                                          className={cn(
                                                            "flex items-center gap-1 font-mono",
                                                            isDepMet
                                                              ? "text-green-600"
                                                              : "text-amber-600",
                                                          )}
                                                        >
                                                          {isDepMet ? (
                                                            <Check className="w-3 h-3" />
                                                          ) : (
                                                            <AlertCircle className="w-3 h-3" />
                                                          )}
                                                          <span>{dep}</span>
                                                          {!isDepMet && (
                                                            <span className="text-amber-500 italic">
                                                              (auto-selected)
                                                            </span>
                                                          )}
                                                        </div>
                                                      );
                                                    },
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}

                                      {/* Show what depends on this */}
                                      {dependents.length > 0 && isSelected && (
                                        <div className="mt-2 text-xs">
                                          <div className="flex items-start gap-1">
                                            <AlertCircle className="w-3 h-3 text-blue-600 mt-0.5 shrink-0" />
                                            <div>
                                              <span className="text-blue-700 font-semibold">
                                                Used by:
                                              </span>
                                              <div className="mt-1 space-y-1">
                                                {dependents.map(
                                                  (dep: string) => (
                                                    <div
                                                      key={dep}
                                                      className="flex items-center gap-1 font-mono text-blue-600"
                                                    >
                                                      <span>→ {dep}</span>
                                                    </div>
                                                  ),
                                                )}
                                              </div>
                                              <p className="text-blue-600 italic mt-1">
                                                (auto-deselected if unchecked)
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>

                                    {isSelected && (
                                      <Check className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                                    )}
                                  </label>
                                );
                              },
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-400">
                      Select an entity from the sidebar to manage permissions
                    </div>
                  )}
                </div>
              )}
            </ModalBody>
          </LoadingOverlay>

          <ModalFooter className="border-t bg-slate-50">
            {currentStep === 0 ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="glass"
                  onClick={handleNextStep}
                  disabled={!!errors.name || !!errors.displayName}
                >
                  Next: Select Permissions
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(0)}
                  disabled={isSaving}
                >
                  Back
                </Button>
                {errors.permissions && (
                  <div className="flex items-center gap-2 text-sm text-red-600 mr-auto">
                    <AlertCircle className="w-4 h-4" />
                    <span>
                      {Array.isArray(errors.permissions)
                        ? errors.permissions[0]?.message ||
                          "At least one permission must be selected"
                        : errors.permissions.message ||
                          "At least one permission must be selected"}
                    </span>
                  </div>
                )}
                <Button
                  type="submit"
                  variant="glass"
                  color={isEditMode ? "success" : "primary"}
                  disabled={isSaving || selectedPermissions.length === 0}
                  isLoading={isSaving}
                >
                  {isEditMode ? "Update Role" : "Create Role"}
                </Button>
              </>
            )}
          </ModalFooter>
        </form>
      </ModalContent>
    </ModalRoot>
  );
};

export default AddUpdateRole;
