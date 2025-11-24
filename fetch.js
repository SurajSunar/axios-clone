class Fetcher {
  config = {
    timeout: 1000,
    header: {
      "content-type": "application/json",
    },
  };

  constructor(config) {
    this.config = this.configMerge(config);
  }

  async dispatchRequest(url, config) {
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
    return this.dispatchRequest(url, { ...finalConfig, method: "GET" });
  }

  post(url, config, payload) {
    const finalConfig = this.configMerge({
      ...config,
      body: payload,
      method: "POST",
    });
    return this.dispatchRequest(url, finalConfig);
  }

  put(url, config, payload) {
    const finalConfig = this.configMerge({
      ...config,
      body: payload,
      method: "PUT",
    });
    return this.dispatchRequest(url, finalConfig);
  }

  delete(url, config) {
    const finalConfig = this.configMerge({
      ...config,
      body: payload,
      method: "DELETE",
    });
    return this.dispatchRequest(url, finalConfig);
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
