import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useCourse } from "../../components/Context/courseData";

export default function Science() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAddon, setSelectedAddon] = useState("");
  const { scienceCourses } = useCourse();

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gradient-to-b from-[#052949] to-[#07447a] w-full pt-14">
        <h1 className="mt-10 text-white text-4xl md:text-5xl font-bold">
          Browse Your Career
        </h1>

        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[80%] mt-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-white text-center">
            💼 Science Degree Courses
          </h1>

          {/* Dropdowns */}
          <div className="flex flex-col md:flex-row gap-6">
            <select
              className="w-full p-3 border border-gray-400 rounded-lg bg-gray-100 text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedAddon("");
              }}
            >
              <option value="" disabled>
                Select Course
              </option>
              {scienceCourses.map((course, index) => (
                <option key={index} value={course.category}>
                  {course.category}
                </option>
              ))}
            </select>

            {selectedCategory && (
              <select
                className="w-full p-3 border border-gray-400 rounded-lg bg-gray-100 text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedAddon}
                onChange={(e) => setSelectedAddon(e.target.value)}
              >
                <option value="" disabled>
                  Select Specialization
                </option>
                {scienceCourses
                  .find((course) => course.category === selectedCategory)
                  ?.addons.map((addon, index) => (
                    <option key={index} value={addon.name}>
                      {addon.name}
                    </option>
                  ))}
              </select>
            )}
          </div>

          {/* College Cards */}
          {selectedAddon && (
            <div className="mt-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
                Colleges Offering Your Course
              </h2>
              <div className="grid gap-6">
                {scienceCourses
                  .find((course) => course.category === selectedCategory)
                  ?.addons.find((addon) => addon.name === selectedAddon)
                  ?.colleges.map((college, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl shadow-xl bg-white/20 backdrop-blur-md text-white transition-transform transform hover:scale-101  flex flex-col md:flex-row items-center justify-between border border-gray-300"
                    >
                      <h2 className="text-xl font-semibold w-full text-center md:text-left">
                        {college}
                      </h2>
                      <a
                        href={`https://wa.me/918281060462?text=${encodeURIComponent(
                          `I need to Know about ${selectedAddon} in ${college}`
                        )}`}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="md:mt-0 text-sm text-white bg-blue-600 px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                      >
                        Fees & More Info
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}