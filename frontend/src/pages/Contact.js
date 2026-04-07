import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-100 to-blue-100 p-10">
      <div className="bg-white p-10 rounded-2xl w-full max-w-lg shadow-xl">
        <h1 className="text-2xl text-center text-gray-800 mb-6">
          Contact <b>Vijay Sports</b>
        </h1>

        <div className="text-gray-600 text-base space-y-2">
          <p><strong>Owner:</strong> Mr. Vijay Pandhare</p>
          <p><strong>Email:</strong> vijaysports@gmail.com</p>
          <p><strong>Mobile:</strong> +91 8554083358</p>
          <p><strong>Instagram:</strong> @vijaysports_official</p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl text-gray-900 mb-2">Shop Location</h2>
          <p>
            Vijay Sports, Main Market Road,  
            Near Bus Stand, Pune, Maharashtra – 411001
          </p>

          {/* Google Map */}
          <div className="mt-4 rounded-lg overflow-hidden">
            <iframe
              title="Shop Location"
              width="100%"
              height="300"
              className="border-0"
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps?q=Pune,Maharashtra&output=embed"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;