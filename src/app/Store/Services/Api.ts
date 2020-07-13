import axios, { AxiosRequestConfig, ResponseType } from "axios";

import { Action } from "../Models/ReduxModels";
import { fakeBackend } from "./Mock/fake-backend";

export type Environments = "local" | "postman" | "";

/**
 * Retorna uma instância do axios com o ambiente passado como client
 */
export function getClient(client: Environments) {
  let baseURL = "";
  let responseType: ResponseType = "json";

  switch (client) {
    case "local": {
      baseURL = "localhost:3000";
      break;
    }

    case "postman": {
      baseURL = "https://e9ff83df-b8f9-4368-9258-4121a9023381.mock.pstmn.io";
      break;
    }

    default: {
      baseURL = "https://e9ff83df-b8f9-4368-9258-4121a9023381.mock.pstmn.io";
      break;
    }
  }

  return axios.create({
    baseURL,
    responseType,
  });
}

async function Api(action: Action<any>, noAuth?: boolean) {
  // pega qual client está sendo usado na redux que chamou a Api.
  const apiClient = action.payload.client!;

  // cria a instância do Axios
  const client = getClient(apiClient);

  // cria um interceptor para retornar de acordo os diferentes tipos de retornos
  // possíveis. Ex: o retorno pode vir da Api com um erro ou pode dar um erro
  // do próprio Axios.
  client.interceptors.response.use(
    function (response) {
      return response.data;
    },
    function (error) {
      const { response } = error;
      const { data } = response;

      return Promise.reject(data || response || error);
    }
  );

  const { data, method, url } = action.payload.request;

  // verifica se no fakebackend tem um endpoint configurado para
  // o endpoint que foi chamado
  const fakeBackendResponse = fakeBackend(action.payload.request);

  if (fakeBackendResponse) {
    return fakeBackendResponse;
  }

  let config: AxiosRequestConfig | undefined = {
    withCredentials: false,
  };

  // configura o bearer token caso necessário
  if (!noAuth) {
    const token = "";

    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  if (method === "POST") {
    return client.post(url, data, config);
  }

  return client.get(url, { params: data });
}

export default Api;
