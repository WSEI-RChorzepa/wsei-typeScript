import { Response } from "./types";

export const buildUrl = (baseUrl: string) => {
  return (endpoint: string) => {
    return `${baseUrl}/${endpoint}`;
  };
};

export async function GET<T>(url: string): Promise<Response<T>> {
  const httpResponse = await fetch(url);
  const { status, statusText } = httpResponse;

  let response: Response<T> = {
    status,
    statusText,
    body: null,
  };

  if (status === 200) {
    const data = (await httpResponse.json()) as T;
    response.body = data;
  }

  return response;
}

export async function POST<T>(url: string, body: object): Promise<Response<T>> {
  const httpResponse = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const { status, statusText } = httpResponse;

  let response: Response<T> = {
    status,
    statusText,
    body: null,
  };

  if (status === 200) {
    const data = (await httpResponse.json()) as T;
    response.body = data;
  }

  return response;
}
