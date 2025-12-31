export const AdminAuditQueryKey = (type: string, params?: any) => {
  return ["admin", "audit", type, ...(params ? [params] : [])];
};
