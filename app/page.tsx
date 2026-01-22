"use client";
import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Volume2, VolumeX } from "lucide-react";

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Blur Challenge State
  const [isRevealed, setIsRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedImage, setSelectedImage] = useState("/16x9.jpg.jpeg");

  // Music State
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {

    // Initialize Audio
    audioRef.current = new Audio("/Pirates of the Caribbean - Hes a Pirate.mp3");
    if (audioRef.current) {
      audioRef.current.loop = true; // Loop if timer exceeds music length
      audioRef.current.volume = 0.5;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    }
  }, []);

  // Handle Music Playback
  useEffect(() => {
    if (!audioRef.current) return;

    if (isRevealed && !isMuted) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    } else {
      audioRef.current.pause();
      if (!isRevealed) {
        audioRef.current.currentTime = 0; // Reset when timer ends
      }
    }
  }, [isRevealed, isMuted]);

  // Timer countdown effect
  useEffect(() => {
    if (!isRevealed) return;

    const initialTime = 20;
    setTimeLeft(initialTime);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRevealed]);

  const handleReveal = () => {
    if (isRevealed) return; // Already revealed
    setIsRevealed(true);
    setTimeout(() => {
      setIsRevealed(false);
      setTimeLeft(0);
    }, 20000); // 20 seconds timer
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Logic: 
    // 0 - 0.4: White (Slide 1) -> Index 0
    // 0.4 - 0.9: Blue (Slide 2) -> Index 1
    // > 0.9: Red (Slide 3) -> Index 2

    if (latest < 0.4) {
      setActiveIndex(0);
    } else if (latest < 0.9) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2);
    }
  });

  // Transform scroll progress to horizontal movement (slides moving LEFT out of view)
  const whiteX = useTransform(scrollYProgress, [0, 0.5], ["0%", "-100%"]);
  const blueX = useTransform(scrollYProgress, [0.5, 1], ["0%", "-100%"]);

  const handleNavigate = (index: number) => {
    // Determine target scroll position based on index
    // 300vh total height.
    // Index 0 (Red Bull) -> 0
    // Index 1 (Image Challenge) -> 100vh (approx 1/2 of scrollable area, which is 200vh total scroll distance?)
    // Actually, calculate based on window height.
    const scrollHeight = document.body.scrollHeight - window.innerHeight; // Total scrollable distance
    let target = 0;

    if (index === 0) target = 0; // Top
    if (index === 1) target = window.innerHeight * 1.5; // Enough to clear white (0.5 progress) -> 100vh of scroll?
    // useScroll offset is 300vh - 100vh = 200vh scrollable
    // 0.5 progress = 100vh
    // so 100vh * 1.5 might be too far?
    // Let's rely on the progress logic.
    // 0.5 prog = blue visible

    const viewportHeight = window.innerHeight;
    // Total height = 300vh. Scrollable = 200vh.

    if (index === 0) {
      // 0 progress
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (index === 1) {
      // Target 0.5 progress exactly where White is gone (-100%) and Blue is centered (0%)
      // 0.5 * 200vh (scrollable) = 100vh scroll position.
      window.scrollTo({ top: viewportHeight, behavior: 'smooth' });
    } else if (index === 2) {
      // Bottom
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <main className="relative bg-black min-h-screen">
      {hasMounted && <Navbar activeIndex={activeIndex} onNavigate={handleNavigate} />}

      {/* Noise Overlay for texture/premium feel */}
      <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Tall Scroll Track: 300vh for 3 visual states */}
      <div ref={targetRef} className="h-[300vh] relative">

        {/* Fixed Viewport */}
        <div className="fixed top-0 left-0 h-screen w-full overflow-hidden">

          {/* LAYER 1 (BOTTOM): AiMSA Info (Red Background) */}
          <div className="absolute inset-0 w-full h-full bg-[#d52048] z-0 flex items-center justify-center">
            <div className="container mx-auto h-full flex flex-col md:flex-row items-center px-6 md:px-16 gap-8 md:gap-12 text-white">
              {/* Left: Artimas Logo */}
              <div className="flex-1 flex justify-center items-center h-[40%] md:h-full pt-24 md:pt-0">
                <a href="https://www.pccoeaimsa.in/" target="_blank" rel="noopener noreferrer" className="contents">
                  <img src="/aimsa_logo_new.png" alt="AiMSA" className="w-[60%] md:w-[80%] max-w-[300px] md:max-w-[400px] object-contain drop-shadow-2xl hover:scale-105 transition-transform cursor-pointer" />
                </a>
              </div>
              {/* Right: AiMSA Info */}
              <div className="flex-1 flex flex-col justify-center items-start text-left pl-2 md:pl-16 h-[60%] md:h-full pb-10 md:pb-0">
                <h5 className="font-bold text-red-200 uppercase tracking-widest text-[10px] md:text-sm mb-2 md:mb-4">Student Association</h5>
                <h1 className="text-4xl md:text-7xl font-sans font-extrabold text-white leading-[1.1] mb-4 md:mb-6">
                  AiMSA
                </h1>
                <div className="max-h-[200px] md:max-h-none overflow-y-auto md:overflow-visible pr-2">
                  <p className="text-white/90 text-xs md:text-base leading-relaxed max-w-xl text-justify">
                    AiMSA is a student association that has been established for the benefit of students in the CSE AIML branch at PCCOE. Our mission is to provide a platform for students to engage in meaningful academic, social, and professional activities that will enhance their educational experience. We aim to create an environment that fosters learning and growth by organizing workshops, seminars, and guest lectures on various topics related to computer science, artificial intelligence, and machine learning. Additionally, we facilitate opportunities for students to connect with industry professionals and build networks that can lead to future career prospects. Our association is committed to promoting teamwork, leadership, and innovation among our members, and we strive to make a positive impact on the larger community.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 2 (MIDDLE): Blur Challenge (Blue) */}
          <motion.div
            style={{ x: blueX }}
            className="absolute top-0 left-0 h-full w-[92.5vw] bg-[#0098db] z-10 rounded-r-[40px] md:rounded-r-[60px] shadow-[10px_0_30px_rgba(0,0,0,0.2)] flex items-center justify-center origin-left"
          >
            <div className="container mx-auto h-full flex flex-col md:flex-row items-center px-6 md:px-16 gap-8 md:gap-12 text-white">
              {/* Left: Blurred Image */}
              <div className="flex-1 flex flex-col justify-center items-center h-[40%] md:h-full pt-20 md:pt-0 gap-6">
                <div className="relative w-auto h-auto mt-24 aspect-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-black/20">
                  <img
                    src={selectedImage}
                    alt="Hidden Challenge"
                    className={`max-w-[80vw] md:max-w-2xl max-h-[60vh] object-contain transition-all duration-700 ease-in-out ${isRevealed ? 'blur-0 scale-100' : 'blur-xl scale-110'}`}
                  />
                  {!isRevealed && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/50 text-6xl font-black tracking-tighter mix-blend-overlay">?</span>
                    </div>
                  )}
                </div>

                {/* Timer Display - Outside Image */}
              </div>

              {/* Right: Instructions & Timer */}
              <div className="flex-1 flex flex-col justify-center items-start text-left pl-2 md:pl-24 h-[60%] md:h-full pb-10 md:pb-0">
                <h5 className="font-bold text-blue-200 uppercase tracking-widest text-[10px] md:text-sm mb-2 md:mb-4">Interactive Challenge</h5>
                <h1 className="text-4xl md:text-7xl font-sans font-extrabold text-white leading-[1.1] mb-4 md:mb-6">
                  Focus <br />
                  Challenge
                </h1>
                <p className="text-blue-100 text-sm md:text-lg mb-6 md:mb-8 max-w-md">
                  Click the timer to reveal the hidden image. You have 20 seconds to memorize every detail before it blurs again! A countdown timer will guide you.
                </p>
                <button
                  onClick={handleReveal}
                  className="group flex items-center gap-3 md:gap-4 px-6 md:px-8 py-3 md:py-4 bg-white text-[#0098db] font-bold rounded-full hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl text-sm md:text-lg"
                >
                  <img src="/timer-icon.png" alt="Timer" className="w-6 h-6 md:w-8 md:h-8 object-contain group-hover:rotate-12 transition-transform" />
                  <span>
                    {isRevealed
                      ? `${timeLeft} seconds remaining`
                      : "Start Focus Challenge!"}
                  </span>
                </button>

                {/* Mute Toggle - Only Visible when Active or if user wants to toggle readiness */}
                {isRevealed && (
                  <button
                    onClick={() => setIsMuted(prev => !prev)}
                    className="mt-4 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-semibold"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    {isMuted ? "Unmute Music" : "Mute Music"}
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* LAYER 3 (TOP): The Original (White) */}
          <motion.div
            style={{ x: whiteX }}
            className="absolute top-0 left-0 h-full w-[85vw] bg-white z-20 rounded-r-[40px] md:rounded-r-[60px] shadow-[10px_0_30px_rgba(0,0,0,0.2)] flex items-center justify-center origin-left"
          >
            <div className="container mx-auto h-full flex flex-col md:flex-row items-center px-6 md:px-16 gap-8 md:gap-12">
              <div className="flex-1 flex justify-center items-center h-[40%] md:h-full pt-20 md:pt-0">
                {/* Can Image */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative w-[140px] md:w-[200px] h-auto flex justify-center items-center transform -rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-500 ease-out cursor-pointer z-50"
                >
                  <img src="/redbull-can.png" alt="Red Bull Can" className="w-full h-full object-contain drop-shadow-2xl" />
                </motion.div>
              </div>
              <div className="flex-1 flex flex-col justify-center items-start text-left z-10 pl-2 md:pl-0 h-[60%] md:h-full pb-10 md:pb-0">
                <h5 className="font-bold text-gray-500 uppercase tracking-widest text-[10px] md:text-sm mb-2 md:mb-4">Red Bull Energy Drinks</h5>
                <h1 className="text-4xl md:text-7xl font-sans font-extrabold text-[#001e3c] leading-[1.1] mb-4 md:mb-6">
                  The Original <br />
                  Red Bull
                </h1>
                <p className="text-gray-600 text-sm md:text-xl max-w-md leading-relaxed mb-6 md:mb-8">
                  Red Bull Energy Drink is appreciated worldwide by top athletes, busy professionals, college students and travelers on long journeys.
                </p>
                <a href="https://www.redbull.com/in-en" target="_blank" rel="noopener noreferrer">
                  <button className="px-6 md:px-8 py-3 bg-[#db0a40] text-white font-bold rounded-full hover:bg-red-700 transition-transform transform hover:scale-105 active:scale-95 shadow-lg text-sm md:text-base">
                    Visit Red Bull
                  </button>
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
