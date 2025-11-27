// sampleRoute.js
class sampleRoute {
  constructor() {
    this.endPoint = `${import.meta.env.VITE_API_ENDPOINT}`;
  }

  getEndPoint() {
    return this.endPoint;
  }

  async fetchSample() {
    const response = await fetch(this.getEndPoint());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.text()) + " from sample route";
  }
}

export default new sampleRoute();
