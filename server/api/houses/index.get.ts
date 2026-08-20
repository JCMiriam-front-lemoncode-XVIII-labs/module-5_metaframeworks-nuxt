import type { House } from "~/types/house";
import { getApiBaseUrl, resolveHouseImage } from "~/server/utils/houses-api";

export default defineEventHandler(async () => {
  try {
    const houses = await $fetch<House[]>(`${getApiBaseUrl()}/api/houses`);
    return houses.map(resolveHouseImage);
  } catch (error) {
    throw createError({
      statusCode: 503,
      statusMessage: "No se pudo obtener el catálogo de casas",
      cause: error,
    });
  }
});
