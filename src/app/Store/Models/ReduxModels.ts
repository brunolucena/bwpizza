import { Environments } from "../Services/Api";

export interface ApiRequest {
  data?: any;
  method: string;
  url: string;
}

export interface BaseAction {
  type: string;
}

export interface BaseResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiError {
  code: string;
  description: string;
}

export interface Action<T> {
  error?: PayloadError;
  payload: ActionPayload<T>;
  type: string;
}

export interface ActionResponse<T> {
  error?: PayloadError;
  payload: ActionPayloadResponse<T>;
  type: string;
}

export interface ActionAnyPayload<T> {
  error?: PayloadError;
  payload: T;
  type: string;
}

export interface ActionAnyData<T> {
  error?: PayloadError;
  payload: ActionPayloadResponse<T>;
  type: string;
}

export interface ActionPayload<T> {
  request: ActionPayloadRequest<T>;
  client?: Environments;
  redirectTo?: string;
  additionalData?: any;
}

export interface ActionPayloadResponse<T> {
  data: T;
  config?: object;
  headers?: object;
  request?: XMLHttpRequest;
  status?: number;
  statusText?: string | undefined;
}

export interface ActionPayloadRequest<T> {
  method: string;
  url: string;
  data?: T;
}

export interface PayloadError {
  data: string;
  message: string;
  code: number;
  config: any;
  response: any;
}

export interface BaseErrorResponse {
  success: boolean;
  errors: string[];
}
