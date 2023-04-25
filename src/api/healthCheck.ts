import { HealthApi } from "./Health";

export async function healthCheck(): Promise<boolean> {
    try {
        const response = await HealthApi.heatlhHealthGet();
        return response.ok;
    } catch {
        return false;
    }
}