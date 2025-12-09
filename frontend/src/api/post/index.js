const apiLink = import.meta.env.VITE_API_LINK + "/admin/post";

const getAllPost = async () => {
  try {
    const response = await fetch(apiLink, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      console.warn("Backend responded with success:false", result);
    }

    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

export { getAllPost };
