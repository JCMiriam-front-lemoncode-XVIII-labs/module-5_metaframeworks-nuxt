import type { House } from "~/types/house";

export const useHousesApi = () => {
  const requestFetch = useRequestFetch();

  const getHouses = async () => {
    try {
      return await requestFetch<House[]>("/api/houses");
    } catch (error) {
      throw createError({
        statusCode: 503,
        statusMessage: "No se pudo obtener el catálogo de casas",
        cause: error,
      });
    }
  };

  const getHouse = async (id: string) => {
    try {
      return await requestFetch<House>(`/api/houses/${id}`);
    } catch (error: unknown) {
      const status = (error as { statusCode?: number; response?: { status?: number } }).statusCode
        ?? (error as { response?: { status?: number } }).response?.status;
      if (status === 404) return undefined;
      throw createError({ statusCode: 503, statusMessage: "No se pudo obtener la casa", cause: error });
    }
  };

  return { getHouses, getHouse };
};
