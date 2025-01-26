import Link from "next/link";
import {
  Mail,
  MessageCircle,
  Globe,
  Linkedin,
  ExternalLink,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#5d795d] text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-sm">
            <Mail className="h-5 w-5" /> support@foodmart.com
          </p>
          <Link
            href="https://wa.me/1234567890"
            target="_blank"
            className="flex items-center gap-2 text-primary hover:underline"
          >
            <MessageCircle className="h-5 w-5" /> Chat with us on WhatsApp
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="https://facebook.com/foodmart"
              target="_blank"
              aria-label="Facebook"
              className="text-white hover:text-gray-200"
            >
              <Globe className="h-6 w-6" />
            </Link>
            <Link
              href="https://instagram.com/foodmart"
              target="_blank"
              aria-label="Instagram"
              className="text-white hover:text-gray-200"
            >
              <ExternalLink className="h-6 w-6" />
            </Link>
            <Link
              href="https://linkedin.com/company/foodmart"
              target="_blank"
              aria-label="LinkedIn"
              className="text-white hover:text-gray-200"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-600 mt-8 pt-4">
        <p className="text-center text-xs text-gray-300">
          © {new Date().getFullYear()} FoodMart. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
