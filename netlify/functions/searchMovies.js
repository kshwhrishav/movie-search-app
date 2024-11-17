require("dotenv").config(); // Ensure .env variables are loaded (for local testing)

exports.handler = async function (event, context) {
  console.log("Netlify function triggered!");
  console.log("Received event:", JSON.stringify(event, null, 2));

  const { s } = event.queryStringParameters || {};
  const apiKey = process.env.MOVIE_API_KEY;
  console.log(apiKey)
  console.log("API Key:", apiKey || "No API Key found");

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "API Key not found in environment variables" }),
    };
  }

  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${s}`;
  console.log("API URL:", url);

  try {
    const response = await fetch(url, {
        headers: {
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
        },
      });
      
    const responseText = await response.text();

    // Check if response is valid JSON
    if (response.headers.get("content-type").includes("application/json")) {
      const data = JSON.parse(responseText);
      console.log("API Response:", data);

      if (data.Response === "True") {
        return {
          statusCode: 200,
          body: JSON.stringify(data.Search),
        };
      } else {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: data.Error || "No movies found" }),
        };
      }
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Unexpected response from OMDb API" }),
      };
    }
  } catch (error) {
    console.log("Error:", error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error", error: error.message }),
    };
  }
};
