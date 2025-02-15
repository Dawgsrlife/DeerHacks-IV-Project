"use client";
import { motion } from "framer-motion";

const Navbar = () => {
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-gray-900 text-white py-4 shadow-md"
        >
            <div className="container mx-auto flex justify-between items-center px-4">
                <h1 className="text-2xl font-bold">MyDocs</h1>
                <ul className="flex space-x-6">
                    {["Docs", "Components", "Blog"].map((item, index) => (
                        <motion.li
                            key={index}
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <a href="#" className="hover:text-gray-400">{item}</a>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.nav>
    );
};

export default Navbar;
