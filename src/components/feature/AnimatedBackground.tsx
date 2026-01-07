import { motion } from 'framer-motion';

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Main Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-teal-50">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/30 via-transparent to-amber-50/30"></div>
      </div>
      
      {/* Large Floating Orbs */}
      <motion.div
        animate={{
          x: [0, 150, -100, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-amber-300/50 via-orange-300/40 to-yellow-200/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 100, -60, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        className="absolute top-40 right-20 w-[500px] h-[500px] bg-gradient-to-br from-teal-300/50 via-emerald-300/40 to-cyan-200/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 80, -120, 0],
          y: [0, -40, 80, 0],
          scale: [1, 1.4, 0.7, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10
        }}
        className="absolute bottom-20 left-1/3 w-[450px] h-[450px] bg-gradient-to-br from-orange-300/40 via-amber-300/50 to-yellow-200/40 rounded-full blur-3xl"
      />
      
      {/* Medium Floating Elements */}
      <motion.div
        animate={{
          x: [0, 200, -150, 0],
          y: [0, -100, 120, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 15
        }}
        className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-purple-300/30 via-pink-300/30 to-rose-300/30 rounded-full blur-2xl"
      />
      <motion.div
        animate={{
          x: [0, -180, 140, 0],
          y: [0, 140, -100, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 20
        }}
        className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-br from-blue-300/30 via-indigo-300/30 to-purple-300/30 rounded-full blur-2xl"
      />
      
      {/* Small Fast-Moving Elements */}
      <motion.div
        animate={{
          x: [0, 300, -200, 0],
          y: [0, -150, 180, 0],
          scale: [0.5, 1.5, 0.8, 0.5],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8
        }}
        className="absolute top-1/2 left-10 w-48 h-48 bg-gradient-to-br from-red-300/40 to-pink-300/40 rounded-full blur-xl"
      />
      <motion.div
        animate={{
          x: [0, -250, 180, 0],
          y: [0, 180, -140, 0],
          scale: [0.8, 1.2, 0.6, 0.8],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 12
        }}
        className="absolute top-1/3 right-10 w-56 h-56 bg-gradient-to-br from-green-300/40 to-emerald-300/40 rounded-full blur-xl"
      />
      
      {/* Animated Gradient Overlays */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0"
      />
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full animate-pulse" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230F766E' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [Math.random() * 400 - 200, Math.random() * 400 - 200],
            y: [Math.random() * 400 - 200, Math.random() * 400 - 200],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
          className="absolute w-4 h-4 bg-gradient-to-br from-amber-400/60 to-orange-400/60 rounded-full blur-sm"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
        />
      ))}
    </div>
  );
};
