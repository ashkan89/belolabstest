exports.healthCheckController = (req, res) => {
  res.status(200).json({ status: 'ok' });
};