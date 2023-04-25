import { apiConfg } from "./Api";
import { Health } from "./generated/Health";

export const HealthApi = new Health(apiConfg)