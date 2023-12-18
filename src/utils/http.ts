import axios, { AxiosResponse } from 'axios';

export enum HttpMethodEnum {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type RequestMethodType = keyof typeof HttpMethodEnum;

// enum ApiEndpointEnum {
//   'sample' = '/sample',
// }

class BaseHttpService {
  private readonly apiBaseURL: string;

  constructor(baseURL: string) {
    this.apiBaseURL = baseURL;
  }

  private async request<T>(method: RequestMethodType, url: string, data: T, headers: Record<string, unknown> = {}): Promise<AxiosResponse> {
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };
    try {
      const response = await axios.request({
        url: `${this.apiBaseURL}${url}`,
        method,
        data,
        ...requestConfig,
      });

      return response.data as AxiosResponse;
    } catch (error) {
      throw error.response;
    }
  }

  public get(url: string, data: Record<string, unknown> = {}, headers: Record<string, unknown> = {}): Promise<AxiosResponse> {
    return this.request(HttpMethodEnum.GET, url, data, headers);
  }

  public post(url: string, data: Record<string, unknown> = {}, headers: Record<string, unknown> = {}): Promise<AxiosResponse> {
    return this.request(HttpMethodEnum.POST, url, data, headers);
  }
}

export default BaseHttpService;

// class SampleService extends BaseHttpService {
//   public async getSampleData(baseUrl: string) {
//     const response = await this.get(ApiEndpointEnum.sample, {}, { baseUrl });
//     return response;
//   }
// }

// const s1 = new SampleService('http://localhost:3000');
// s1.getSampleData('http://localhost:3000');
