import { useAuthStatus } from "./hooks/auth/useAuth";
import { useSample } from "./hooks/surface/useSample";
import { useState } from "react";

function App() {
  const { data, loading, error } = useAuthStatus();

  const [sampleResult, setSampleResult] = useState(null);
  const [sampleError, setSampleError] = useState(null);

  const { fetchSample } = useSample();

  const handleSampleFetch = async () => {
    const { data, error } = await fetchSample();
    setSampleResult(data);
    setSampleError(error);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Auth Status</h2>
      <pre>{data?.message}</pre>

      <button onClick={handleSampleFetch}>Fetch Sample Route</button>

      {sampleResult && <pre>{JSON.stringify(sampleResult, null, 2)}</pre>}

      {sampleError && <div>Error: {sampleError}</div>}
    </div>
  );
}

export default App;
