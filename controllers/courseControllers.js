const admin = require("firebase-admin");

const getAllCourses = async (req, res) => {
  const db = admin.firestore();

  const coursesSnapshot = await db.collection("courses").get();

  const courses = [];
  coursesSnapshot.forEach((doc) => {
    courses.push(doc.data());
  });

  res.status(200).json(courses);
}

const getCourseById = async (req, res) => {
  const db = admin.firestore();

  const courseId = req.query.course_id;

  if (!courseId) {
    return res.status(400).send("Course Id Required");
  }

  const courseDocResponse = await db.collection("courses").doc(courseId)
  const courseDocRef = await courseDocResponse.get();

  if (courseDocRef.exists) {
    const courseDocData = courseDocRef.data();
    res.status(200).json(courseDocData);
  } else {
    res.status(404).json(null);
  }
}

module.exports = { getAllCourses, getCourseById}