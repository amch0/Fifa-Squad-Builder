import axios from "axios";

export const fetchNationalityNames = async () => {
  try {
    const response = await axios.get(
      "https://restcountries.com/v2/all?fields=name"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching country names:", error);
    return null;
  }
};
