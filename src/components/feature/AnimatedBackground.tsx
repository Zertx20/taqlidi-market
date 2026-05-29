export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Main Gradient Background - static, no animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50/50 to-teal-50" />
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/20 via-transparent to-amber-50/20" />

      {/* Subtle decorative blobs - CSS only, no blur */}
      <div
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.2) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 70%)' }}
      />
    </div>
  );
};
