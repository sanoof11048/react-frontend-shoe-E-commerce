import { createContext, useContext } from "react";

const CourseContext = createContext();

export const useCourse = () => {
  return useContext(CourseContext);
};

export const CourseProvider = ({ children }) => {
  const scienceCourses = [
    {
      category: "BSc Physics",
      addons: [
        {
          name: "BSc Physics (Hons)",
          colleges: ["Quantum Physics Institute", "Astro Physics University"],
        },
        {
          name: "BSc Applied Physics",
          colleges: ["Applied Sciences Academy", "Tech Physics College"],
        },
        {
          name: "BSc Nuclear Physics",
          colleges: ["Nuclear Research Institute", "Energy Physics University"],
        },
      ],
    },
    {
      category: "BSc Chemistry",
      addons: [
        {
          name: "BSc Chemistry (Hons)",
          colleges: [
            "Chemical Sciences Institute",
            "Organic Chemistry University",
          ],
        },
        {
          name: "BSc Analytical Chemistry",
          colleges: ["Analytical Research Academy", "Chemistry Tech College"],
        },
        {
          name: "BSc Industrial Chemistry",
          colleges: [
            "Industrial Chemistry Institute",
            "Applied Chemistry University",
          ],
        },
      ],
    },
    {
      category: "BSc Biology",
      addons: [
        {
          name: "BSc Biology (Hons)",
          colleges: ["Life Sciences Institute", "Bio Research University"],
        },
        {
          name: "BSc Microbiology",
          colleges: ["Microbiology Academy", "BioTech University"],
        },
        {
          name: "BSc Biotechnology",
          colleges: ["Biotech Research Institute", "Genetics University"],
        },
      ],
    },
    {
      category: "BSc Mathematics",
      addons: [
        {
          name: "BSc Mathematics (Hons)",
          colleges: ["Pure Mathematics Institute", "Advanced Math University"],
        },
        {
          name: "BSc Applied Mathematics",
          colleges: ["Applied Math Academy", "Math Tech College"],
        },
        {
          name: "BSc Statistics",
          colleges: [
            "Statistical Research Institute",
            "Data Science University",
          ],
        },
      ],
    },
    {
      category: "BSc Computer Science",
      addons: [
        {
          name: "BSc CS (AI & ML)",
          colleges: ["AI Research Institute", "Machine Learning University"],
        },
        {
          name: "BSc CS (Data Science)",
          colleges: ["Data Analytics Academy", "Big Data University"],
        },
        {
          name: "BSc CS (Cyber Security)",
          colleges: ["Cyber Security Institute", "SecureNet University"],
        },
      ],
    },
  ];
  const commerceCourses = [
    {
      category: "BBA",
      addons: [
        {
          name: "BBA",
          colleges: [
            "ACHARYA COLLEGE BANGALORE",
            "SRINIVAS UNIVERSITY MANGALORE",
            "BRINDAVAN COLLEGE BANGALORE",
            "CMR COLLEGE BANGALORE",
            "SEA COLLEGE BANGALORE",
            "KRUPANIDHI COLLEGE BANGALORE",
            "PRESIDENCY UNIVERSITY BANGALORE",
            "S-VYASA BANGALORE",
            "HKBK COLLEGE BANGALORE",
            "RR COLLEGE BANGALORE",
          ],
        },
        {
          name: "BBA + LOGISTICS",
          colleges: ["PRESIDENCY UNIVERSITY BANGALORE"],
        },
        {
          name: "BBA + BUSINESS ANALYST",
          colleges: [
            "PRESIDENCY UNIVERSITY BANGALORE",
            "BRINDAVAN COLLEGE BANGALORE",
            "CMR UNIVERSITY BANGALORE",
            "ACHARYA COLLEGE BANGALORE",
          ],
        },
        {
          name: "BBA + HOSPITAL ADMINISTRATION",
          colleges: [
            "SRINIVAS COLLEGE MANGALORE",
            "BRINDAVAN COLLEGE BANGALORE",
          ],
        },
        {
          name: "BBA + SPORTS MANAGEMENT",
          colleges: ["S-VYASA COLLEGE BANGALORE"],
        },
        {
          name: "BBA + DIGITAL MARKETING",
          colleges: [
            "CMR COLLEGE BANGALORE",
            "PRESIDENCY UNIVERSITY BANGALORE",
            "ACHARYA COLLEGE BANGALORE",
          ],
        },
        {
          name: "BBA + HOSPITAL ADMINISTRATION WITH MINOR IN MEDICAL TOURISM",
          colleges: [
            "YENEPOYA UNIVERSITY MANGALORE",
            "YENEPOYA UNIVERSITY BANGALORE",
          ],
        },
        {
          name: "BBA + LOGISTICS AND DIGITAL MARKETING",
          colleges: ["BRINDAVAN COLLEGE BANGALORE"],
        },
        {
          name: "BBA + LOGISTICS AND AVIATION",
          colleges: [
            "YENEPOYA COLLEGE BANGALORE",
            "BRINDAVAN COLLEGE BANGALORE",
            "YENEPOYA COLLEGE MANGALORE",
          ],
        },
        {
          name: "BBA + HR",
          colleges: ["PRESIDENCY UNIVERSITY BANGALORE"],
        },
        {
          name: "BBA + AVIATION",
          colleges: [
            "KRUPANIDHI COLLEGE BANGALORE",
            "PRESIDENCY UNIVERSITY BANGALORE",
            "SRINIVAS UNIVERSITY MANGALORE",
            "ACHARYA COLLEGE BANGALORE",
            "EAST WEST COLLEGE BANGALORE",
            "IZEE BUSINESS SCHOOL BANGALORE",
            "BRINDAVAN COLLEGE BANGALORE",
            "RR COLLEGE BANGALORE",
          ],
        },
        {
          name: "BBA + AVIATION AND LOGISTICS",
          colleges: [
            "KRUPANIDHI COLLEGE BANGALORE",
            "S-VYASA COLLEGE BANGALORE",
            "SRINIVAS COLLEGE MANGALORE",
            "BRINDAVAN COLLEGE BANGALORE",
          ],
        },
        {
          name: "BBA + LOGISTICS, SUPPLY CHAIN MANAGEMENT AND PORT MANAGEMENT",
          colleges: [
            "YENEPOYA UNIVERSITY BANGALORE",
            "YENEPOYA UNIVERSITY MANGALORE",
            "S-VYASA COLLEGE BANGALORE",
          ],
        },
        {
          name: "BBA + BUSINESS MANAGEMENT, DIGITAL MARKETING AND BUSINESS ANALYTICS",
          colleges: [
            "S-VYASA COLLEGE BANGALORE",
            "KRUPANIDHI COLLEGE BANGALORE",
            "YENEPOYA COLLEGE MANGALORE",
          ],
        },
        {
          name: "BBA + ENTREPRENEURSHIP, INNOVATION AND BUSINESS ANALYTICS",
          colleges: [
            "S-VYASA COLLEGE BANGALORE",
            "YENEPOYA UNIVERSITY MANGALORE",
            "YENEPOYA UNIVERSITY BANGALORE",
          ],
        },
        {
          name: "BBA + PORT AND SHIPPING MANAGEMENT INCLUDE LOGISTICS",
          colleges: ["SRINIVAS COLLEGE MANGALORE"],
        },
        {
          name: "BBA + STARTUP, ENTREPRENEURSHIP & FINTECH (WITH INTERNATIONAL BUSINESS & BUSINESS ANALYTICS)",
          colleges: ["SRINIVAS COLLEGE MANGALORE"],
        },
        {
          name: "BBA + ENTREPRENEURSHIP, DEVELOPMENT AND SMALL BUSINESS MANAGEMENT",
          colleges: ["KRUPANIDHI COLLEGE BANGALORE"],
        },
        {
          name: "BBA + AVIATION IN LOGISTICS & SUPPLY CHAIN MANAGEMENT",
          colleges: ["IZEE BUSINESS SCHOOL BANGALORE"],
        },
        {
          name: "BBA + AVIATION IN LOGISTICS & SUPPLY CHAIN MANAGEMENT GLOBAL",
          colleges: ["IZEE BUSINESS SCHOOL BANGALORE"],
        },
      ],
    },
    {
      category: "BCA",
      addons: [
        {
          name: "BCA + AI",
          colleges: ["PRESIDENCY UNIVERSITY BANGALORE"],
        },
      ],
    },
  ];
  const humanitiesCourses = [
    {
      category: "BA English",
      addons: [
        {
          name: "BA English (Hons)",
          colleges: ["Literature Institute", "Creative Writing University"],
        },
        {
          name: "BA English Literature",
          colleges: ["Classic Literature Academy", "Modern English University"],
        },
        {
          name: "BA Linguistics",
          colleges: [
            "Language Studies Institute",
            "Linguistics Research University",
          ],
        },
      ],
    },
    {
      category: "BA History",
      addons: [
        {
          name: "BA History (Hons)",
          colleges: ["Ancient History Institute", "World History University"],
        },
        {
          name: "BA Archaeology",
          colleges: [
            "Archaeological Research Academy",
            "Heritage Studies University",
          ],
        },
        {
          name: "BA Art History",
          colleges: ["Art History Institute", "Cultural Studies University"],
        },
      ],
    },
    {
      category: "BA Psychology",
      addons: [
        {
          name: "BA Psychology (Hons)",
          colleges: [
            "Behavioral Sciences Institute",
            "Cognitive Psychology University",
          ],
        },
        {
          name: "BA Clinical Psychology",
          colleges: ["Mental Health Academy", "Therapeutic Studies University"],
        },
        {
          name: "BA Counseling Psychology",
          colleges: ["Counseling Institute", "Human Behavior University"],
        },
      ],
    },
    {
      category: "BA Sociology",
      addons: [
        {
          name: "BA Sociology (Hons)",
          colleges: [
            "Social Sciences Institute",
            "Sociology Research University",
          ],
        },
        {
          name: "BA Anthropology",
          colleges: [
            "Cultural Anthropology Academy",
            "Human Studies University",
          ],
        },
        {
          name: "BA Social Work",
          colleges: [
            "Community Development Institute",
            "Social Welfare University",
          ],
        },
      ],
    },
    {
      category: "BA Political Science",
      addons: [
        {
          name: "BA Political Science (Hons)",
          colleges: [
            "Political Theory Institute",
            "Global Politics University",
          ],
        },
        {
          name: "BA International Relations",
          colleges: ["Diplomacy Academy", "Global Affairs University"],
        },
        {
          name: "BA Public Administration",
          colleges: ["Governance Institute", "Public Policy University"],
        },
      ],
    },
  ];
  const coursesData = {
    science: [
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Mathematics",
      "B.Sc Biology",
      "B.Sc Computer Science",
      "B.Sc Biotechnology",
      "BCA (Bachelor of Computer Applications)",
      "B.Sc Nursing",
      "M.Sc Physics",
      "M.Sc Chemistry",
      "M.Sc Mathematics",
      "M.Sc Computer Science",
      "M.Sc Data Science",
      "MCA (Master of Computer Applications)",
      "Diploma in Medical Laboratory Technology (DMLT)",
      "Diploma in Radiology",
    ],

    humanities: [
      "B.A History",
      "B.A Political Science",
      "B.A Psychology",
      "B.A Sociology",
      "B.A English Literature",
      "B.A Economics",
      "M.A History",
      "M.A Political Science",
      "M.A Sociology",
      "M.A English Literature",
      "Diploma in Journalism",
      "Diploma in Psychology",
    ],

    commerce: [
      "B.Com (Bachelor of Commerce)",
      "BBA (Bachelor of Business Administration)",
      "BMS (Bachelor of Management Studies)",
      "B.Com Banking & Finance",
      "M.Com (Master of Commerce)",
      "MBA (Master of Business Administration)",
      "Diploma in Financial Accounting",
      "Diploma in Business Management",
    ],
  };

  return (
    <CourseContext.Provider
      value={{
        coursesData,
        scienceCourses,
        commerceCourses,
        humanitiesCourses,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
