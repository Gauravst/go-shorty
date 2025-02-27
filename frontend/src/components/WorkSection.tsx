import { motion } from "framer-motion";

const WorkSection = () => {
  return (
    <section id="how-it-works" className="py-16 relative">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-600 rounded-full filter blur-[150px] opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">
            How It <span className="blue-gradient">Works</span>
          </h2>
          <p className="mt-4 text-xl text-gray-300">
            Three simple steps to create and share your shortened URLs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Paste Your URL",
              description:
                "Enter your long URL in the input field at the top of the page.",
            },
            {
              step: "2",
              title: "Get Your Short Link",
              description:
                "Click the 'Shorten URL' button and instantly receive your shortened link.",
            },
            {
              step: "3",
              title: "Share Anywhere",
              description:
                "Copy your new short URL and share it on social media, emails, or messages.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="glass p-6 rounded-xl relative z-10">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-gold-500 text-white flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 mt-4 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-0">
                  <svg
                    width="40"
                    height="12"
                    viewBox="0 0 40 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M39.5303 6.53033C39.8232 6.23744 39.8232 5.76256 39.5303 5.46967L34.7574 0.696699C34.4645 0.403806 33.9896 0.403806 33.6967 0.696699C33.4038 0.989593 33.4038 1.46447 33.6967 1.75736L37.9393 6L33.6967 10.2426C33.4038 10.5355 33.4038 11.0104 33.6967 11.3033C33.9896 11.5962 34.4645 11.5962 34.7574 11.3033L39.5303 6.53033ZM0 6.75H39V5.25H0V6.75Z"
                      fill="#475569"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
