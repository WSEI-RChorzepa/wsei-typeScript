import { Response } from "./types";
import { buildUrl, POST } from "./http";

const url = buildUrl("https://countriesnow.space/api/v0.1");

interface IPlace {
  data: string[];
  error: boolean;
  msg: string;
}

export const getPlaces = async (): Promise<Response<IPlace>> =>
  await POST<IPlace>(url("countries/cities"), { country: "poland" });
