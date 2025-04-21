import  db  from '../db.js';
import { getDistance } from '../utils/distanceCalculator.js';

/** @type {import('express').RequestHandler} */
export const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );
    res.status(201).json({ message: "School added", id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: "DB error", error: err.message });
  }
};

/** @type {import('express').RequestHandler} */
export const listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;
  
    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ message: "Invalid location input" });
    }
  
    try {
      const [schools] = await db.execute('SELECT * FROM schools');
      const sorted = schools.map((school) => ({
        ...school,
        distance: getDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          school.latitude,
          school.longitude
        )
      })).sort((a, b) => a.distance - b.distance);
  
      console.log("Sorted schools by distance:", sorted);
      res.status(200).json(sorted);
    } catch (err) {
      res.status(500).json({ message: "DB error", error: err.message });
    }
  };
  
