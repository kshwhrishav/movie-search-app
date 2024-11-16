const fetch = require('node-fetch');  // Ensure you have node-fetch available

exports.handler = async function(event, context) {
  const { s } = event.queryStringParameters; // Get search query from the frontend
  const apiKey = process.env.MOVIE_API_KEY;  // Use environment variable for the API key

  try {
    // Make the request to the OMDb API
    const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${s}`);
    const data = await response.json();

    if (data.Response === "True") {
      return {
        statusCode: 200,
        body: JSON.stringify(data.Search),  // Return the movie search results
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "No movies found" }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error", error: error.message }),
    };
  }
};
