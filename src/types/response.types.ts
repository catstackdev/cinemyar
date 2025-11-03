export interface ResponseMeta {
  timestamp: string;
  path: string;
  method: string;
}
export interface Response<T> {
  success: boolean;
  message: string;
  data?: T;
  statusCode?: number;
  error?: any;
  meta?: ResponseMeta;
}
