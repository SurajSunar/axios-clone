class Fetcher {
  config = {
    header: {
      "content-type": "application/json",
    },
  };

  constructor(config) {
    this.config = this.configMerge(config);
  }

  async dispatchRequest(url, config) {
    return await fetch(url, config);
  }

  get(url, config) {
    const finalConfig = this.configMerge(config);
    return this.dispatchRequest(url, finalConfig);
  }

  configMerge(config) {
    return {
      ...this.config,
      ...config,
      header: {
        ...(this.config?.header || {}),
        ...(config.header || {}),
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
