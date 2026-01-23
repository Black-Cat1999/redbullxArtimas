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

  // Riddle Challenge State
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const riddles = [
    "1. I wear a coat of silver and blue, and I promise to give 'wings' to you. I’m cold to the touch and tall in my stand, acting as the fuel for the thinkers across the land. What am I?",
    "2. I have a glowing bulb but no bright ideas of my own, until I’m paired with a human, then my true power is shown. I’m made of metal, sensors, and digital bits, helping you find where your genius fits. Who am I?",
    "3. I’m a famous orange path over a foggy bay, floating inside a thought bubble where I wait for the day. If your idea is the best, you’ll be flown to my street, where the world’s greatest tech minds are destined to meet. Where am I?",
    "4. I’m a square of black and white dots sitting on a stand, a portal to a contest that's famous and grand. Scan me with your phone to start your quest, and put your innovation to the ultimate test. What am I?",
    "5. I sit on the desk with a glowing white face, helping you keep up with the innovation pace. I have a keyboard to type and a screen to see, and I’m powered by the likes of Microsoft and AMD. What am I?"
  ];

  // Music State
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize Audio
    audioRef.current = new Audio("/Pirates of the Caribbean - Hes a Pirate.mp3");
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      audioRef.current.addEventListener('ended', () => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(e => console.log("Audio replay failed:", e));
        }
      });
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

    if (isStarted && !isMuted) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    } else {
      audioRef.current.pause();
      if (!isStarted) {
        audioRef.current.currentTime = 0;
      }
    }
  }, [isStarted, isMuted]);

  // Timer countdown effect
  useEffect(() => {
    if (!isStarted) return;

    const initialTime = 300; // 5 minutes
    setTimeLeft(initialTime);

    // Timer logic removed as per user request to "remove the timer"
    // However, if the user wants the 5 min limit but no clock, I'll keep the interval but hide the UI.
    // The user said "remove the timer", so I'll stop the countdown entirely.
  }, [isStarted]);

  const handleStart = () => {
    if (isStarted) return;
    setIsStarted(true);
  };

  const handleBack = () => {
    setIsStarted(false);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.4) {
      setActiveIndex(0);
    } else if (latest < 0.9) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2);
    }
  });

  // Transform scroll progress to horizontal movement
  const whiteX = useTransform(scrollYProgress, [0, 0.5], ["0%", "-100%"]);
  const blueX = useTransform(scrollYProgress, [0.5, 1], ["0%", "-100%"]);

  const handleNavigate = (index: number) => {
    const viewportHeight = window.innerHeight;
    if (index === 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (index === 1) {
      window.scrollTo({ top: viewportHeight, behavior: 'smooth' });
    } else if (index === 2) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <main className="relative bg-black min-h-screen">
      {hasMounted && <Navbar activeIndex={activeIndex} onNavigate={handleNavigate} />}

      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      <div ref={targetRef} className="h-[300vh] relative">
        <div className="fixed top-0 left-0 h-screen w-full overflow-hidden">
          {/* LAYER 1 (BOTTOM): AiMSA Info (Red Background) */}
          <div className="absolute inset-0 w-full h-full bg-[#d52048] z-0 flex items-center justify-center">
            <div className="container mx-auto h-full flex flex-col md:flex-row items-center px-6 md:px-16 gap-8 md:gap-12 text-white">
              <div className="flex-1 flex justify-center items-center h-[40%] md:h-full pt-24 md:pt-0">
                <a href="https://www.pccoeaimsa.in/" target="_blank" rel="noopener noreferrer" className="contents">
                  <img src="/aimsa_logo_new.png" alt="AiMSA" className="w-[60%] md:w-[80%] max-w-[300px] md:max-w-[400px] object-contain drop-shadow-2xl hover:scale-105 transition-transform cursor-pointer" />
                </a>
              </div>
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

          {/* LAYER 2 (MIDDLE): Riddle Challenge (Blue) */}
          <motion.div
            style={{ x: blueX }}
            className="absolute top-0 left-0 h-full w-[92.5vw] bg-[#0098db] z-10 rounded-r-[40px] md:rounded-r-[60px] shadow-[10px_0_30px_rgba(0,0,0,0.2)] flex items-center justify-center origin-left"
          >
            <div className="container mx-auto h-full flex flex-col items-center justify-center px-6 md:px-16 text-white text-center">
              {!isStarted ? (
                <div className="flex flex-col items-center justify-center max-w-2xl animate-in fade-in zoom-in duration-500">
                  <h5 className="font-bold text-blue-200 uppercase tracking-widest text-xs md:text-sm mb-4">Interactive Challenge</h5>
                  <h1 className="text-5xl md:text-8xl font-sans font-extrabold text-white leading-[1.1] mb-8">
                    Riddle <br />
                    Challenge
                  </h1>
                  <p className="text-blue-100 text-base md:text-xl mb-10 max-w-lg leading-relaxed">
                    Test your wits! Solve 5 challenging riddles within 5 minutes. Click the button below to start the timer and reveal the quest.
                  </p>
                  <button
                    onClick={handleStart}
                    className="group flex items-center gap-4 px-10 py-5 bg-white text-[#0098db] font-extrabold rounded-full hover:bg-blue-50 transition-all transform hover:scale-110 shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-xl md:text-2xl"
                  >
                    <img src="/timer-icon.png" alt="Timer" className="w-8 h-8 object-contain group-hover:rotate-12 transition-transform" />
                    <span>Start Riddle Quest!</span>
                  </button>
                </div>
              ) : (
                <div className="relative w-full max-w-4xl h-[80vh] flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700 bg-white/5 rounded-3xl p-8">
                  {/* Absolute Back Button */}
                  <button
                    onClick={handleBack}
                    className="absolute top-4 right-4 flex items-center gap-2 px-5 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-lg rounded-full border border-white/30 transition-all text-sm font-bold uppercase tracking-widest z-[110] cursor-pointer"
                  >
                    Back ✕
                  </button>

                  {/* Absolute Mute Button - Bottom Right */}
                  <button
                    onClick={() => setIsMuted(prev => !prev)}
                    className="absolute bottom-4 right-4 flex items-center gap-3 px-5 py-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full border border-white/20 transition-all text-[10px] font-bold uppercase tracking-widest z-[110] text-white/80 hover:text-white"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    <span>{isMuted ? "Unmute" : "Mute"} Theme</span>
                  </button>

                  {/* Riddles List */}
                  <div className="w-full flex-1 overflow-y-auto pr-4 no-scrollbar pt-12" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                    <div className="grid gap-6 text-left pb-16">
                      {riddles.map((riddle, idx) => (
                        <div key={idx} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all group">
                          <p className="text-lg md:text-xl font-medium leading-relaxed group-hover:text-blue-50 transition-colors">
                            {riddle}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Reference Image Section */}
                    <div className="w-full pb-8">
                      <div className="relative w-full rounded-xl overflow-hidden border-2 border-dashed border-orange-400/50 p-2 bg-orange-400/5">
                        <p className="text-orange-300 text-xs text-center mb-2 font-mono uppercase tracking-widest">Reference Position</p>
                        <img
                          src="/16x9.jpg.jpeg"
                          alt="Reference"
                          className="w-full h-auto rounded-lg blur-md opacity-50 hover:blur-none hover:opacity-90 transition-all duration-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
