"use client";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Main SVG Background */}
      <div className="absolute inset-0 bg-[url('/greek-bg.svg')] bg-cover bg-center opacity-50 mix-blend-screen" />

      {/* Dark overlay to blend into black */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Gold atmospheric glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18),transparent_45%)]" />

      {/* Top and bottom cinematic fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />

      {/* Side vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,black_100%)]" />
    </div>
  );
}
