export default function LandingFooter() {
  return (
    <footer className="h-auto bg-[#3D3D3D] text-white py-4 px-5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm">
          © 2025 BIT. All Rights Reserved.
          <br />
          Developed by Gajendra Sahu.
        </p>
        <div className="space-x-4 text-sm mt-2 sm:mt-0">
          <a href="#privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
