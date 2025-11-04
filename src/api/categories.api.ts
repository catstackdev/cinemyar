import { apiClient } from "@/lib/axios";
import type { AddCategoryFormData } from "@/schemas/movie.schema";
import type { ResponseType } from "@/types/response.types";
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  active: boolean;
  thumbnail_url: string;
  createdAt: string;
  updatedAt: string;
}
export type CategoryResponse = Category[];

export const categoriesAPI = {
  getCategories: async (params?: {}): Promise<
    ResponseType<CategoryResponse>
  > => {
    const { data } = await apiClient.get<ResponseType<CategoryResponse>>(
      "/categories",
      {
        params,
      },
    );
    return data;
  },

  getCategory: async (id: string): Promise<ResponseType<Category>> => {
    const { data } = await apiClient.get<ResponseType<Category>>(
      `/categories/${id}`,
    );
    return data;
  },

  deleteCategory: async (id: string): Promise<ResponseType<any>> => {
    const { data } = await apiClient.delete<ResponseType<Category>>(
      `/categories/${id}`,
    );
    return data;
  },

  updateCategory: async (
    id: string,
    categoryData: Partial<AddCategoryFormData>,
  ): Promise<ResponseType<Category>> => {
    const { data } = await apiClient.patch<ResponseType<Category>>(
      `/categories/${id}`,
      categoryData,
    );
    return data;
  },
};

export const addCategory = async (data: AddCategoryFormData) => {
  const res = await apiClient.post<ResponseType<Category>>("/categories", data);
  return res.data;
};

export const updateCategory = async (
  id: string,
  data: Partial<AddCategoryFormData>,
) => {
  const res = await apiClient.patch<ResponseType<Category>>(
    `/categories/${id}`,
    data,
  );
  return res.data;
};
