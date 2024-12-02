type RequestParams = {
  method: "GET" | "POST" | "PUT";
  url: string;
  data?: any;
  params?: Record<string, any>;
  access_token?: string; // New locale property
};

type ApiResponse<T> = Promise<T>;

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>({
    method,
    url,
    data,
    params,
    access_token, // Accept locale parameter
  }: RequestParams): Promise<T> {
    // Combine baseURL with the endpoint URL
    url = `${this.baseURL}${url}`;

    // Build the query string for GET requests with params
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      url += `?${queryString}`;
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Set Accept-Language header if locale is provided
    if (access_token) {
      headers["x-access-token"] = access_token;
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        return await response.json();
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error("API request error:", error);
      throw error;
    }
  }

  get<T>(
    url: string,
    {
      params,
      access_token,
    }: { params?: Record<string, any>; access_token?: string } = {}
  ): ApiResponse<T> {
    return this.request<T>({ method: "GET", url, params, access_token });
  }

  post<T>(url: string, data: any, access_token?: string): ApiResponse<T> {
    return this.request<T>({ method: "POST", url, data, access_token });
  }

  put<T>(url: string, data: any, access_token?: string): ApiResponse<T> {
    return this.request<T>({ method: "PUT", url, data, access_token });
  }
}

// Instantiate the client with a base URL
const apiClient = new ApiClient(
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://techtest.youapp.ai"
);

export default apiClient;
