const BASE_URL = import.meta.env.VITE_SERVER_URL;

type OptionsType = {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
};

export function makeRequest(url: string, options?: OptionsType) {
  return fetch(BASE_URL + url, {...options, headers: {"Content-Type": "application/json"}})
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) =>
      Promise.reject(error?.response?.data?.message ?? "Error")
    );
}
