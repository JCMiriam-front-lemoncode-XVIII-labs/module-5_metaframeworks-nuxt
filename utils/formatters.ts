import type { House } from "~/types/house";

export const getHouseRating = ({ reviews }: House) => {
  if (!reviews.length) return 0;
  return reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
