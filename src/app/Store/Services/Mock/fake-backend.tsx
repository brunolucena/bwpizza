import { ApiRequest, BaseResponse } from "app/Store/Models/ReduxModels";

/**
 * Cada if representa um endpoint que será utilizado como
 * retorno caso seja chamado
 */
export function fakeBackend(request: ApiRequest) {
  const { url } = request;

  if (url === "/example-fake-endpoint") {
    return new Promise(function (resolve) {
      const response: BaseResponse<any> = {
        data: {},
        success: true,
      };

      resolve(response);
    });
  }

  return false;
}
