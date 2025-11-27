class AuthHooks {
  constructor() {
    this.endPoint = `${import.meta.env.VITE_API_ENDPOINT}/api/auth/`;
  }

  getEndPoint() {
    return this.endPoint;
  }

  getLoginEndpoint() {
    return `${this.endPoint}login`;
  }

  async fetchAuthStatus() {
    const response = await fetch(this.getEndPoint());
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  }
}

export default new AuthHooks();
