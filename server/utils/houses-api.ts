import type { House } from "~/types/house";

export const getApiBaseUrl = () => useRuntimeConfig().apiBaseUrl.replace(/\/$/, "");

export const resolveHouseImage = (house: House): House => {
  const apiBaseUrl = getApiBaseUrl();
  return {
    ...house,
    image: house.image.startsWith("http") ? house.image : `${apiBaseUrl}${house.image}`,
  };
};
