// Validate Add School
export function validateAddSchool(req, res, next) {
  const { name, address, latitude, longitude } = req.body;
  const errors = [];

  if (!name || typeof name !== "string" || name.trim() === "") {
    errors.push("Name is required and must be a non-empty string.");
  }

  if (!address || typeof address !== "string" || address.trim() === "") {
    errors.push("Address is required and must be a non-empty string.");
  }

  if (latitude === undefined || isNaN(Number(latitude)) || latitude < -90 || latitude > 90) {
    errors.push("Latitude must be a number between -90 and 90.");
  }

  if (longitude === undefined || isNaN(Number(longitude)) || longitude < -180 || longitude > 180) {
    errors.push("Longitude must be a number between -180 and 180.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
}

// Validate List Schools
export function validateListSchools(req, res, next) {
  const { latitude, longitude } = req.query;
  const errors = [];

  if (!latitude || isNaN(Number(latitude))) {
    errors.push("Valid latitude is required.");
  }

  if (!longitude || isNaN(Number(longitude))) {
    errors.push("Valid longitude is required.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
}