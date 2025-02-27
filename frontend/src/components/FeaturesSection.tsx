import { FiShield, FiBarChart2, FiZap } from "react-icons/fi";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 relative">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary-600 rounded-full filter blur-[120px] opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">
            Why Choose <span className="gold-gradient">GoShorty</span>?
          </h2>
          <p className="mt-4 text-xl text-gray-300">
            Our platform offers everything you need for efficient link
            management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Lightning Fast",
              description:
                "Generate short URLs in milliseconds with our optimized infrastructure.",
              icon: <FiZap className="h-6 w-6 text-gold-500" />,
              delay: 0,
            },
            {
              title: "Secure & Reliable",
              description:
                "Your links are safe with us. We use HTTPS and ensure 99.9% uptime.",
              icon: <FiShield className="h-6 w-6 text-primary-500" />,
              delay: 0.1,
            },
            {
              title: "Analytics Included",
              description:
                "Track clicks, geographic data, and referrers with our built-in analytics.",
              icon: <FiBarChart2 className="h-6 w-6 text-gold-500" />,
              delay: 0.2,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="glass p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="mb-4 inline-flex p-3 rounded-full bg-dark-800">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
