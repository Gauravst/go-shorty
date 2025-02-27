import React, { useState } from "react";
import { FiLink, FiCopy, FiCheck, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
import CopyToClipboard from "react-copy-to-clipboard";
import { cn } from "@/utils/cn";
import { GenerateShortUrl } from "@/services/urlServices";

const HeroSection = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    try {
      new URL(url);
      setError("");
      setIsLoading(true);

      try {
        const data = await GenerateShortUrl(url);
        setShortUrl(data.shortUrl);
      } catch (err) {
        console.error("Shorten URL Error:", err);
        setError("Failed to shorten URL. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } catch (err) {
      setError("Please enter a valid URL including http:// or https://");
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <main className="flex-grow">
      <section className="py-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-500 rounded-full filter blur-[100px] opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gold-500 rounded-full filter blur-[120px] opacity-10"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Shorten Your URLs with{" "}
            <span className="gold-gradient">Lightning Speed</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Create short, memorable links in seconds with our powerful URL
            shortener.
          </motion.p>

          <motion.div
            className="glass rounded-xl p-6 mb-8 relative glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLink className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter your long URL here"
                    className={cn(
                      "block w-full pl-10 pr-3 py-3 rounded-lg focus:ring-2 focus:outline-none",
                      "bg-dark-800 border-dark-700 text-gray-100",
                      error
                        ? "border-red-500 focus:ring-red-500"
                        : "border-dark-600 focus:ring-primary-500",
                    )}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "px-6 py-3 rounded-lg font-medium text-white transition-all",
                    "bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400",
                    "shadow-lg shadow-primary-500/20",
                    isLoading ? "opacity-70 cursor-not-allowed" : "",
                  )}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Shortening...
                    </span>
                  ) : (
                    "Shorten URL"
                  )}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>

            {shortUrl && (
              <div className="mt-6 p-4 glass-light rounded-lg">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex-grow">
                    <p className="text-sm text-gray-400 mb-1">
                      Your shortened URL:
                    </p>
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-400 font-medium flex items-center hover:text-primary-300"
                    >
                      {shortUrl}
                      <FiExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                  <CopyToClipboard text={shortUrl} onCopy={handleCopy}>
                    <button className="flex items-center space-x-1 px-4 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors">
                      {copied ? (
                        <>
                          <FiCheck className="h-4 w-4 text-green-500" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <FiCopy className="h-4 w-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
