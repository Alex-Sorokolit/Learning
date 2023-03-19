import axios from 'axios';

axios.defaults.baseURL = 'https://api.wisey.app/api/v1';

// Autorization
export async function Autorization() {
  try {
    const responce = await axios.get('auth/anonymous?platform=subscriptions');
    return responce;
  } catch (error) {
    console.log(error.message);
  }
}

// Courses
export async function getCourses(token) {
  try {
    const responce = await axios.get('core/preview-courses', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const courses = responce.data.courses.map(
      ({
        id,
        title,
        lessonsCount,
        previewImageLink,
        rating,
        description,
        meta: { skills, courseVideoPreview },
      }) => ({
        id,
        title,
        lessonsCount,
        previewImageLink,
        rating,
        description,
        skills,
        courseVideoPreview,
      })
    );
    return courses;
  } catch (error) {
    console.log(error.message);
  }
}

// Course
export async function getCourse(courseId, token) {
  try {
    const responce = await axios.get(`core/preview-courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { id, title, description, lessons, tags } = responce.data;
    return { id, title, description, lessons, tags };
  } catch (error) {
    console.log(error.message);
  }
}
