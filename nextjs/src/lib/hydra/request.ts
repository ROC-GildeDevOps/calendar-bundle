import axios, { type AxiosRequestConfig } from "axios";

const hydraClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { Accept: "application/ld+json" },
});

hydraClient.interceptors.request.use((config) => {
  if (config.method === "patch") {
    config.headers["Content-Type"] = "application/merge-patch+json";
  }
  return config;
});

interface QueuedRequest {
  execute: () => Promise<void>;
}

const queue: QueuedRequest[] = [];
let processing = false;

async function processQueue() {
  if (processing) return;
  processing = true;

  while (queue.length > 0) {
    const request = queue.shift()!;
    await request.execute();
  }

  processing = false;
}

function makeRequest(method: "get" | "post" | "put" | "patch" | "delete") {
  return <T>(path: string, config?: AxiosRequestConfig): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      queue.push({
        execute: () =>
          hydraClient
            .request<T>({ ...config, method, url: path })
            .then((res) => resolve(res.data))
            .catch(reject),
      });
      processQueue();
    });
  };
}

export const api = {
  get: makeRequest("get"),
  post: makeRequest("post"),
  put: makeRequest("put"),
  patch: makeRequest("patch"),
  delete: makeRequest("delete"),
};
