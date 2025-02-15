import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useCourse } from "../Context/courseData";

const AdmissionModal = ({ isOpen, closeModal }) => {
  const [studentData, setStudentData] = useState({});
  const [course, setCourse] = useState([]);
  const { coursesData } = useCourse();

  useEffect(() => {
    if (isOpen) {
      setStudentData({
        name: "",
        phone: "",
        stream: "",
        course: "",
        college_location: "",
        remarks: "",
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (studentData.stream == "Science") {
      console.log(coursesData.science);
      setCourse(coursesData.science);
    }
    if (studentData.stream == "Commerce") {
      console.log(coursesData.commerce);
      setCourse(coursesData.commerce);
    }
    if (studentData.stream == "Humanities") {
      console.log(coursesData.commerce);
      setCourse(coursesData.humanities);
    }
  }, [studentData]);

  const handleSave = () => {
    Swal.fire({
      title: "Confirm Admission?",
      text: "Are you sure you want to submit the admission request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Loading...",
          text: "Please wait while we fetch the data.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const formDataSend = new FormData();

        Object.entries(studentData).forEach(([key, value]) => {
          formDataSend.append(key, value);
        });

        fetch(
          "https://script.google.com/macros/s/AKfycbxsdxL0fooufrcqwW5VEGSAgVWtYexmV-CoUguotifyETrOZJbU6j4HQ7C8HOjF6Gs/exec",

          {
            method: "POST",
            body: formDataSend,
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to submit admission request");
            }
            return response.json();
          })
          .then((data) => {
            Swal.fire(
              "Submitted!",
              "The admission request has been sent successfully.",
              "success"
            );
            closeModal();
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire(
              "Error!",
              "Something went wrong while submitting the form. Please try again later.",
              "error"
            );
          });
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center px-4 items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-lg max-w-xl w-full shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Enquiry Form</h2>

        <div className="space-y-3">
          {/* Student Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              className="mt-1 w-full border rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={studentData.name}
              onChange={(e) =>
                setStudentData({ ...studentData, name: e.target.value })
              }
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              className="mt-1 w-full border rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={studentData.phone}
              onChange={(e) =>
                setStudentData({ ...studentData, phone: e.target.value })
              }
            />
          </div>

          {/* Stream Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stream
            </label>
            <select
              className="mt-1 w-full border rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={studentData.stream}
              onChange={(e) =>
                setStudentData({ ...studentData, stream: e.target.value })
              }
            >
              <option value="">Select Stream</option>
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Humanities">Humanities</option>
            </select>
          </div>

          {/* Course Selection */}
          {studentData.stream && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Course
              </label>
              <select
                className="mt-1 w-full border rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={studentData.course}
                onChange={(e) =>
                  setStudentData({ ...studentData, course: e.target.value })
                }
              >
                <option value="">Select Course</option>
                {course.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* College Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preferred College Location
            </label>
            <input
              className="mt-1 w-full border rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={studentData.college_location}
              onChange={(e) =>
                setStudentData({
                  ...studentData,
                  college_location: e.target.value,
                })
              }
            />
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Additional Remarks (optional)
            </label>
            <textarea
              className="mt-1 block w-full border rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows="3"
              value={studentData.remarks}
              onChange={(e) =>
                setStudentData({ ...studentData, remarks: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionModal;
