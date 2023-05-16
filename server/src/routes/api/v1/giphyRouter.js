import express from "express";
import fetch from "node-fetch";

const giphyRouter = new express.Router();

giphyRouter.get("/", async (req, res) => {
  try {
    console.log("Request received at /api/v1/giphy");
    const { searchTerm } = req.query;
    const apiKey = process.env.Giphy_API_Key;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}`;

    const response = await fetch(url);
    const data = await response.json();
    const giphyResults = data.data;

    return res.status(200).json({ giphyResults });
  } catch (error) {
    console.error("Error searching GIFs:", error);
    return res.status(500).json({ message: "Error searching GIFs" });
  }
});

export default giphyRouter;