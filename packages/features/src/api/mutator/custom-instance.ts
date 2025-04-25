import type { AxiosError, AxiosRequestConfig } from "axios";
import Axios from "axios";

export const AXIOS_INSTANCE = Axios.create({
  // TODO: use environment variable
  baseURL: "http://localhost:8080",
});

// add a second `options` argument here if you want to pass extra options to each generated query
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- for now, we can assume that the data is safe thanks to generating via OpenAPI
  }).then(({ data }) => data);

  // @ts-expect-error -- TODO: fix this
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
