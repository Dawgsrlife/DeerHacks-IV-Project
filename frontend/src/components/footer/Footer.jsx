const Footer = () => {
  return (
      <div className="flex w-full flex-col items-center justify-between px-1 pb-8 pt-3 lg:px-8 xl:flex-row bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-700 text-white">
        <h5 className="mb-4 text-center text-sm font-medium sm:!mb-0 md:text-lg">
          <p className="mb-4 text-center text-sm sm:!mb-0 md:text-base">
            ©{new Date().getFullYear()} Eterna AI. All Rights Reserved.
          </p>
        </h5>
        <div>
          <ul className="flex flex-wrap items-center gap-3 sm:flex-nowrap md:gap-10">
            <li>
              <a
                  target="blank"
                  href="mailto:support@eterna.ai"
                  className="text-base font-medium hover:text-gray-300"
              >
                Support
              </a>
            </li>
            <li>
              <a
                  target="blank"
                  href="/privacy-policy"
                  className="text-base font-medium hover:text-gray-300"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                  target="blank"
                  href="/terms-of-service"
                  className="text-base font-medium hover:text-gray-300"
              >
                Terms of Use
              </a>
            </li>
            <li>
              <a
                  target="blank"
                  href="/ai-blog"
                  className="text-base font-medium hover:text-gray-300"
              >
                AI Insights
              </a>
            </li>
          </ul>
        </div>
      </div>
  );
};

export default Footer;
