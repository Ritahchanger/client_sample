"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Course {
  id: number;
  title: string;
  university: string;
  category: string;
  duration: string;
}

const CourseFinder = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get<Course[]>(
          "https://raw.githubusercontent.com/Ritahchanger/university-courses/main/courses.json"
        );
        setCourses(response.data);
        setFilteredCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    const filtered = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(event.target.value.toLowerCase()) ||
        course.university.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Fixed Header Section */}
      <div className="bg-white shadow-md fixed top-0 left-0 w-full z-50 px-4 py-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
          University Course Finder
        </h1>
        <div className="text-center">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by course title or university"
            className="p-3 w-full md:w-1/2 border border-neutral-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Course Cards Section */}
      <div className="pt-[180px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition ease-in-out duration-300 transform hover:scale-105"
              >
                <h2 className="text-2xl font-semibold text-indigo-700 mb-3">
                  {course.title}
                </h2>
                <p className="text-gray-700 font-medium mb-2">
                  University: <span className="font-normal">{course.university}</span>
                </p>
                <p className="text-gray-500 font-medium mb-2">
                  Category: <span className="font-normal">{course.category}</span>
                </p>
                <p className="text-gray-500">
                  Duration: <span className="font-normal">{course.duration}</span>
                </p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No courses found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseFinder;
