import { pool } from "../config/db.js";

// Haversine Formula
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

//  Add School
export async function addSchool(req, res) {
  try {
    const { name, address, latitude, longitude } = req.body;

    const cleanName = name?.trim();
    const cleanAddress = address?.trim();

    const [result] = await pool.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [cleanName, cleanAddress, Number(latitude), Number(longitude)]
    );

    return res.status(201).json({
      success: true,
      message: "School added successfully",
      data: {
        id: result.insertId,
        name: cleanName,
        address: cleanAddress,
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
    });
  } catch (error) {
    console.error("addSchool error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// List Schools
export async function listSchools(req, res) {
  try {
    const userLat = Number(req.query.latitude);
    const userLon = Number(req.query.longitude);

    const [rows] = await pool.execute("SELECT * FROM schools");

    const schoolsWithDistance = rows
      .map((school) => ({
        ...school,
        distance_km: parseFloat(
          getDistanceKm(
            userLat,
            userLon,
            school.latitude,
            school.longitude
          ).toFixed(2)
        ),
      }))
      .sort((a, b) => a.distance_km - b.distance_km);

    return res.status(200).json({
      success: true,
      message: "Schools fetched successfully",
      data: schoolsWithDistance,
    });
  } catch (error) {
    console.error("listSchools error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}