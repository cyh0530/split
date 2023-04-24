import { Scan } from "./generated/Scan";
import { ApiError } from "./ApiError";

export const ScanApi = new Scan({
    baseUrl: process.env.REACT_APP_API_URL,
    customFetch: async (input, init) => {
        const response = await fetch(input, init)

        if (!response.ok) {
            const error = await response.text();
            
            return Promise.reject(new ApiError(error, response.status, input.toString()))
        }
        return response
    },
})