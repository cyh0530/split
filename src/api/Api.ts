import { ApiError } from "./ApiError";
import { ApiConfig } from "./generated/http-client";

export const apiConfg: ApiConfig = {
    baseUrl: import.meta.env.VITE_API_URL,
    customFetch: async (input, init) => {
        const response = await fetch(input, init)

        if (!response.ok) {
            const error = await response.text();
            
            return Promise.reject(new ApiError(error, response.status, input.toString()))
        }
        return response
    },
}