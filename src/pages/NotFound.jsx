import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-grad-radial">
      <p className="font-display text-8xl md:text-9xl font-bold text-gradient">
        404
      </p>
      <p className="text-white/50 mt-4 mb-8">
        This page drifted out of orbit.
      </p>
      <Link
        to="/"
        className="btn-magnetic bg-grad-primary shadow-glow hover:scale-105"
      >
        Back to Home
      </Link>
    </div>
  );
}
