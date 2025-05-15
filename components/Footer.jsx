import { Heart } from "lucide-react";

function Footer() {
  return (
    <div className="flex items-center mt-8">
      <p className="text-sm text-gray-500">Created for Acsid Maad with</p>
      <Heart size={12} className="ml-1" color="red" />
    </div>
  );
}

export default Footer;
