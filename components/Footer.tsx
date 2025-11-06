'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative z-10 bg-gray-900 dark:bg-black text-white py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Electrocom</h3>
            <p className="text-gray-400 dark:text-gray-500">
              Your Trusted Partner for IT, Software & Manpower Solutions.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 dark:text-gray-500">
              <li>
                <Link href="#home" className="hover:text-white dark:hover:text-gray-300 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white dark:hover:text-gray-300 transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="#expertise" className="hover:text-white dark:hover:text-gray-300 transition-colors duration-300">
                  Expertise
                </Link>
              </li>
              <li>
                <Link href="#technologies" className="hover:text-white dark:hover:text-gray-300 transition-colors duration-300">
                  Technologies
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white dark:hover:text-gray-300 transition-colors duration-300">
                  Projects
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400 dark:text-gray-500">
              <li>Hardware Maintenance</li>
              <li>Software Solutions</li>
              <li>Network Solutions</li>
              <li>Manpower Supply</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 dark:text-gray-500">
              <li>Email: info@electrocom.in</li>
              <li>Phone: +91-XXXXXXXXXX</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 dark:border-gray-900 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
          <p>&copy; {new Date().getFullYear()} Electrocom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
