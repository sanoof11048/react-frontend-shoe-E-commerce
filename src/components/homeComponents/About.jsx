import React from "react";

function About() {
  return (
    <>
      {/* About Section */}
      <section
        id="about"
        className="p-8  md:p-16 flex flex-col md:flex-row items-center gap-8"
      >
        <div className="text-center md:flex md:text-left md:m-10 gap-7">
          <div className="">
            <div className="min-h-auto md:border-e-3 md:border-0 md:border-e-lightblue md:border-solid md:border-y-0 h-auto">
              <h1 className="text-5xl font-bold md:pe-8 md:text-right">
                <span className="text-primary">What </span> Is
              </h1>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-secondary mb-4">ADOTZEE</h3>
            <p className="text-gray-300">
              ADOTZEE is more than just a community; it's a dedicated partner in
              your academic journey. Our mission is to provide personalized
              guidance and support for students pursuing degrees across various
              fields, including Science, Commerce, and Humanities. With a
              commitment to excellence, we strive to create a supportive
              environment where students can navigate their academic challenges,
              access valuable resources, and achieve their educational goals.
              Connect ADOTZEE as we pave the way for your success in higher
              education and beyond.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
