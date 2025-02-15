import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useCourse } from "../../components/Context/courseData";

export default function Commerce() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAddon, setSelectedAddon] = useState("");
  const { commerceCourses } = useCourse();

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-[#052949] w-full">
        <h1 className="mt-30 text-white">Browrse Your Career</h1>

        <div className="bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-lg w-fit m-20 max-w-5xl">
          <h1 className="text-4xl font-extrabold mb-8 text-white text-center">
            💼 Commerce Degree Courses
          </h1>

          {/* Dropdowns */}
          <div className="flex flex-col md:flex-row gap-6 ">
            <select
              className="w-full p-3 border border-white rounded-lg shadow-md bg-white/30 text-white text-lg focus:outline-none focus:ring-2 focus:ring-white"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedAddon("");
              }}
            >
              <option value="" disabled>
                Select Course
              </option>
              {commerceCourses.map((course, index) => (
                <option
                  key={index}
                  value={course.category}
                  className="text-black"
                >
                  {course.category}
                </option>
              ))}
            </select>

            {selectedCategory && (
              <select
                className="w-full p-3 border border-white rounded-lg shadow-md bg-white/30 text-white text-lg focus:outline-none focus:ring-2 focus:ring-white"
                value={selectedAddon}
                onChange={(e) => setSelectedAddon(e.target.value)}
              >
                <option value="" disabled>
                  Select Specialization
                </option>
                {commerceCourses
                  .find((course) => course.category === selectedCategory)
                  ?.addons.map((addon, index) => (
                    <option
                      key={index}
                      value={addon.name}
                      className="text-black text-xs"
                    >
                      {addon.name}
                    </option>
                  ))}
              </select>
            )}
          </div>

          {/* College Cards */}
          {selectedAddon && (
            <div className="mt-8 w-full">
              <h2 className="text-3xl font-bold text-white text-center mb-6">
                Colleges Offering Your Course
              </h2>
              <div className="flex flex-col gap-6 w-full">
                {commerceCourses
                  .find((course) => course.category === selectedCategory)
                  ?.addons.find((addon) => addon.name === selectedAddon)
                  ?.colleges.map((college, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl shadow-lg bg-white/20 backdrop-blur-md text-white transition-transform hover:scale-101 hover:shadow-2xl flex flex-col md:flex-row items-center justify-between border border-white/30"
                    >
                      <h2 className="text-2xl font-semibold w-full text-center md:text-left">
                        {college}
                      </h2>
                      <a
                        href={`https://wa.me/918281060462?text=${encodeURIComponent(
                          `I need to Know about ${selectedAddon} in ${college}`
                        )}`}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="md:mt-0 text-sm text-white bg-blue-600 px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                      >
                        Fees Details & More Info
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
