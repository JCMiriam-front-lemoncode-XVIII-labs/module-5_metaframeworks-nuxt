import type { House } from "~/types/house";
import { getApiBaseUrl, resolveHouseImage } from "~/server/utils/houses-api";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  try {
    const house = await $fetch<House>(`${getApiBaseUrl()}/api/houses/${id}`);
    if (!house) throw createError({ statusCode: 404, statusMessage: "Casa no encontrada" });
    return resolveHouseImage(house);
  } catch (error: unknown) {
    const status = (error as { statusCode?: number; response?: { status?: number } }).statusCode
      ?? (error as { response?: { status?: number } }).response?.status;
    if (status === 404) throw createError({ statusCode: 404, statusMessage: "Casa no encontrada" });
    throw createError({ statusCode: 503, statusMessage: "No se pudo obtener la casa", cause: error });
  }
});
