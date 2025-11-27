import sampleRoute from "./sample.js";

export const useSample = () => {
  const fetchSample = async () => {
    try {
      const data = await sampleRoute.fetchSample();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  };

  return { fetchSample };
};
