export const getGoogleAPIKey = (req, res) => {
  res.json(process.env.GOOGLE_MAPS_API_KEY);
};
