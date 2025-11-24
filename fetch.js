class Fetcher {
  config = {
    timeout: 1000,
    header: {
      "content-type": "application/json",
    },
  };
  requestInterceptor = [];
  responseInterceptor = [];

  constructor(config) {
    this.config = this.configMerge(config);
  }

  addRequestInterceptor(successFn, failFn) {
    this.requestInterceptor.push({ successFn, failFn });
  }

  addResponseInterceptor(successFn, failFn) {
    this.responseInterceptor.push({ successFn, failFn });
  }

  async request(url, config) {
    let promise = Promise.resolve({ url, config });

    const chain = [
      ...this.requestInterceptor,
      { successFn: this.dispatchRequest.bind(this) },
      ...this.responseInterceptor,
    ];

    for (const { successFn, failFn } of chain) {
      promise = promise.then(
        (data) => {
          try {
            return successFn(data);
          } catch (error) {
            if (failFn) {
              return failFn(error);
            }
            return Promise.reject(error);
          }
        },
        (error) => {
          if (failFn) {
            return failFn(error);
          }
          return Promise.reject(error);
        }
      );
    }

    return promise;
  }

  async dispatchRequest({ url, config }) {
    const abortController = new AbortController();
    const timeout = config.timeout || 0;
    let timer;

    if (timeout) {
      timer = setTimeout(() => {
        abortController.abort();
      }, timeout);
    }

    try {
      return await fetch(config.baseUrl + url, {
        ...config,
        signal: abortController.signal,
      });
    } finally {
      timer && clearTimeout(timer);
    }
  }

  get(url, config) {
    const finalConfig = this.configMerge(config);
    return this.request(url, { ...finalConfig, method: "GET" });
  }

  post(url, config, payload) {
    const finalConfig = this.configMerge({
      ...config,
      body: payload,
      method: "POST",
    });
    return this.request(url, finalConfig);
  }

  put(url, config, payload) {
    const finalConfig = this.configMerge({
      ...config,
      body: payload,
      method: "PUT",
    });
    return this.request(url, finalConfig);
  }

  delete(url, config) {
    const finalConfig = this.configMerge({
      ...config,
      body: payload,
      method: "DELETE",
    });
    return this.request(url, finalConfig);
  }

  configMerge(config) {
    return {
      ...this.config,
      ...config,
      header: {
        ...(this.config?.header || {}),
        ...(config?.header || {}),
      },
    };
  }
}

function create(config) {
  return new Fetcher(config);
}

export default {
  create,
};
