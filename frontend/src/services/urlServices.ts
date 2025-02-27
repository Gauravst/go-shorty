import api from "./api";

interface ShortUrlResponse {
  shortUrl: string;
  status: number;
}

export const GenerateShortUrl = async (
  url: string,
): Promise<ShortUrlResponse> => {
  try {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const response = await api.post("/url", { originalUrl: url });
    const fullShortUrl = `${baseUrl}/${response.data.shortUrl}`;
    return {
      shortUrl: fullShortUrl,
      status: response.status,
    };
  } catch (error: any) {
    console.error("Error:", error);
    throw new Error(
      error.response?.data?.message || "Failed to generate short URL",
    );
  }
};
