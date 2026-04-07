const AboutUs = () => {
  return (
    <div className="bg-[#e3e7e6] py-16">
      <div className="max-w-[1200px] mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* 🔹 LEFT IMAGE CARD */}
          <div className="flex justify-center md:justify-start">
            <div className="bg-white shadow-md p-5 rounded-2xl w-full max-w-[420px] text-center md:text-left">
              <img
                src={"owner.jpg"} // Replace with your image path
                alt="Owner"
                className="w-full h-[380px] object-cover rounded"
              />
              <h3 className="mt-5 text-[20px] font-bold text-gray-900 text-center md:text-left">
                Mr. Vijay Pandhare
              </h3>
              <p className="text-gray-600 italic mt-1 text-center md:text-left">
                Owner of <b>Vijay Sports</b>
              </p>
            </div>
          </div>

          {/* 🔹 RIGHT CONTENT */}
          <div className="md:px-10">
            <p className="text-[#0f766e] uppercase tracking-wide font-bold mb-5 text-sm">
              About Us
            </p>
            <h1 className="text-[34px] font-semibold text-gray-900 mb-6 leading-[1.3]">
              Built On Passion <br /> And Performance
            </h1>
            <p className="text-gray-700 mb-5 leading-7">
              Vijay Sports was established in 2015 with the vision of creating a
              trusted destination for athletes and sports enthusiasts. Our goal
              has always been to provide high-quality sports equipment and apparel
              that supports performance and dedication.
            </p>
            <p className="text-gray-700 mb-5 leading-7">
              From cricket gear to fitness essentials, we focus on delivering
              reliable and performance-driven products that inspire discipline,
              strength, and growth through sports.
            </p>

            <div className="text-gray-800 space-y-2 mt-6 text-sm">
              <p><span className="font-semibold">Owner:</span> Mr. Vijay Pandhare</p>
              <p><span className="font-semibold">Email:</span> vijaysports@gmail.com</p>
              <p><span className="font-semibold">Mobile:</span> +91 8554083358</p>
              <p><span className="font-semibold">Instagram:</span> @vijaysports_official</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AboutUs;