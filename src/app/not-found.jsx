import Link from "next/link";
import { FaHouse } from "react-icons/fa6";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="mb-4">
        <h1 className="text-9xl font-extrabold text-blue-600 tracking-tight"> 404</h1>
      </div>
      <div className="max-w-md mx-auto space-y-2">
        <h2 className="text-2xl font-bold text-gray-800"> Page Not Found</h2>
        <p className="text-gray-500 text-sm"> The link you followed might be broken, or the page has been moved. </p>
      </div>

      <div className="mt-8">
        <Link href="/" 
          className="inline-flex items-center justify-center gap-2 h-11 px-6 font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors" >
          <FaHouse className="text-xs" /> Back To Home </Link>
      </div>

    </div>
  );
}