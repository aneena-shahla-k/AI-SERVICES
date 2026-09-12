import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    // ബ്രൗസർ ബ്ലോക്ക് ചെയ്യാതിരിക്കാൻ ആദ്യം muted ആയി സ്റ്റാർട്ട് ചെയ്യുക
    video.muted = true;
    video.defaultMuted = true;
    video.loop = false;
    video.autoplay = false;

    const playVideo = () => {
      video.currentTime = 0;
      video.loop = false;

      const promise = video.play();
      if (promise) {
        promise.catch(() => {
          // Autoplay fallback
        });
      }
    };

    const stopVideo = () => {
      video.pause();
      try {
        video.currentTime = 0;
      } catch (error) {}
    };

    const handleVideoEnded = () => {
      video.pause();
      try {
        video.currentTime = video.duration;
      } catch (error) {}
    };

    video.addEventListener("ended", handleVideoEnded);

    /*
     * HERO SCROLL CONTROL
     */
    const heroTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      onEnter: () => playVideo(),
      onEnterBack: () => playVideo(),
      onLeave: () => stopVideo(),
      onLeaveBack: () => stopVideo(),
    });

    // പേജ് ലോഡിൽ വീഡിയോ പ്ലേ ആകുന്നു (muted ആയി)
    playVideo();

    /*
     * ബട്ടൺ ഇല്ലാതെ യൂസറുടെ ആദ്യത്തെ ക്ലിക്കിലോ ടച്ചിലോ സൗണ്ട് ഓൺ ആക്കാനുള്ള ഫംഗ്ഷൻ
     */
    const enableSoundOnFirstInteraction = () => {
      video.muted = false;

      // വീഡിയോ ഒരുപക്ഷേ പോസ് ആയിട്ടുണ്ടെങ്കിൽ വീണ്ടും പ്ലേ ചെയ്യുന്നു
      if (video.paused) {
        video.play().catch(() => {});
      }

      // ഒരു തവണ സൗണ്ട് ഓൺ ആയാൽ ഈ ഇവന്റുകൾ റിമൂവ് ചെയ്യുക
      window.removeEventListener("pointerdown", enableSoundOnFirstInteraction);
      window.removeEventListener("touchstart", enableSoundOnFirstInteraction);
      window.removeEventListener("keydown", enableSoundOnFirstInteraction);
    };

    // യൂസറുടെ ആദ്യത്തെ ക്ലിക്ക് അല്ലെങ്കിൽ ടച്ച് ഡിറ്റക്റ്റ് ചെയ്യുന്നു
    window.addEventListener("pointerdown", enableSoundOnFirstInteraction);
    window.addEventListener("touchstart", enableSoundOnFirstInteraction);
    window.addEventListener("keydown", enableSoundOnFirstInteraction);

    return () => {
      heroTrigger.kill();
      video.pause();
      video.removeEventListener("ended", handleVideoEnded);
      window.removeEventListener("pointerdown", enableSoundOnFirstInteraction);
      window.removeEventListener("touchstart", enableSoundOnFirstInteraction);
      window.removeEventListener("keydown", enableSoundOnFirstInteraction);
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero-section">
      <div className="hero-video-wrap">
        <video
          ref={videoRef}
          className="hero-video"
          src="/hero-video.mp4"
          muted
          playsInline
          preload="auto"
          loop={false}
        />
        <div className="hero-overlay" />
      </div>
    </section>
  );
}