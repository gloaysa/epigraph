import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

export type TQueryOptions<T> = Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>;
export type TMutationOptions<T, Y> = Omit<UseMutationOptions<T, Error, Y>, 'mutationKey' | 'mutationFn'>;

export class ApiService {
  private static instance: ApiService;
  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private readonly baseUrl;
  private headers: Record<string, string> = {};

  constructor() {
    const apiBase = import.meta.env.PROD
      ? new URL('/api', window.location.origin)
      : new URL(`${import.meta.env.VITE_APP_API_URL}/api`);

    this.baseUrl = apiBase.href;
  }

  private async baseFetch(url: URL, options: RequestInit = {}): Promise<Response> {
    return fetch(url, {
      ...options,
      headers: {
        ...this.headers,
        ...options.headers,
      },
    });
  }

  setApiToken(userId: string) {
    this.headers = {
      ...this.headers,
      ['user-id']: userId,
    };
  }

  async get<T>(path: string, params?: URLSearchParams) {
    const url = new URL(`${this.baseUrl}${path}`);
    if (params) {
      url.search = params.toString();
    }
    const response = await this.baseFetch(url);
    return this.handleResponse<T>(response);
  }

  async post<T>(path: string, request: RequestInit) {
    const url = new URL(`${this.baseUrl}${path}`);
    const response = await this.baseFetch(url, {
      method: 'POST',
      ...request,
      headers: request.headers,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(path: string, request: RequestInit) {
    const url = new URL(`${this.baseUrl}${path}`);
    const response = await this.baseFetch(url, {
      method: 'PUT',
      ...request,
      headers: request.headers,
    });
    return this.handleResponse<T>(response);
  }

  async delete<T>(path: string) {
    const url = new URL(`${this.baseUrl}${path}`);
    const response = await this.baseFetch(url, {
      method: 'DELETE',
    });

    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const jsonRes = await response.json();

    if (jsonRes.error || !response.ok) {
      throw new Error(jsonRes.error ?? response.statusText);
    }

    if (!jsonRes.data) {
      throw new Error('No data in response');
    }

    return jsonRes.data;
  }
}

export class HTTPError extends Error {
  code?: number;
  type?: string;
  details?: string;

  constructor(error: { message: string; code?: number; type?: string; details?: string }) {
    super(error.message);
    this.code = error.code;
    this.type = error.type;
    this.details = error.details;
    console.error(error);
  }
}
