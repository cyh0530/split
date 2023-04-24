import { env } from "process";
import { Scan } from "./generated/Scan";
import { ApiError } from "./ApiError";

export const ScanApi = new Scan({
    baseUrl: "http://localhost:7071",
    customFetch: async (input, init) => {
        const response = await fetch(input, init)

        if (!response.ok) {
            const error = await response.text();
            
            return Promise.reject(new ApiError(error, response.status, input.toString()))
        }
        return response
    },
})