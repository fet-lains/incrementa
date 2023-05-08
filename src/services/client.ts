import { APP_HOSTNAME } from '@/constants';

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type HttpResponse<T = any> = Response & {
  data: T;
};

export class HttpClient {
  private readonly _apiUrl: string;

  constructor(apiUrl: string) {
    this._apiUrl = apiUrl;
  }

  async get<T>(
    path: string,
    query: Record<string, unknown> = {},
    options: RequestInit = {},
  ): Promise<HttpResponse<T>> {
    const mappedQuery = Object.entries(query)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const encodedQuery = mappedQuery ? `?${mappedQuery}` : '';

    return this._request<T>({
      path: `${path}${encodedQuery}`,
      options: {
        ...options,
        method: HttpMethod.GET,
      },
    });
  }

  async post<T>(
    path: string,
    data: unknown,
    options: RequestInit = {},
  ): Promise<HttpResponse<T>> {
    return this._request<T>({
      path,
      data,
      options: {
        ...options,
        method: HttpMethod.POST,
      },
    });
  }

  async put<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<HttpResponse<T>> {
    return this._request<T>({
      path,
      options: {
        ...options,
        method: HttpMethod.PUT,
      },
    });
  }

  async patch<T>(
    path: string,
    data: unknown,
    options: RequestInit = {},
  ): Promise<HttpResponse<T>> {
    return this._request<T>({
      path,
      data,
      options: {
        ...options,
        method: HttpMethod.PATCH,
      },
    });
  }

  async delete<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<HttpResponse<T>> {
    return this._request<T>({
      path,
      options: {
        ...options,
        method: HttpMethod.DELETE,
      },
    });
  }

  private async _request<T>({
    path,
    data,
    options = {},
  }: {
    path: string;
    data?: unknown;
    options?: RequestInit;
  }): Promise<HttpResponse<T>> {
    try {
      const skipStatuses = [303];

      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
      };

      const response = await fetch(`${APP_HOSTNAME}${this._apiUrl}${path}`, {
        ...options,
        body: JSON.stringify(data),
      });

      if (response.status === 401 || response.status === 403) {
        window.location.reload();
      }

      if (!skipStatuses.includes(response.status) && !response.ok)
        throw new Error(response.status.toString());

      return {
        ...response,
        data: await response.json(),
      };
    } catch (error) {
      throw new Error();
    }
  }
}
