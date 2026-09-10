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

    // Absolutely prevent looping
    video.loop = false;
    video.autoplay = false;

    const playVideo = () => {
      // Always start from beginning
      video.currentTime = 0;
      video.loop = false;

      const promise = video.play();

      if (promise) {
        promise.catch(() => {
          // Browser autoplay restriction
        });
      }
    };

    const stopVideo = () => {
      video.pause();

      // Reset to beginning so it never continues in background
      try {
        video.currentTime = 0;
      } catch (error) {
        // Ignore
      }
    };

    const handleVideoEnded = () => {
      // Video finished — stay stopped
      video.pause();

      try {
        video.currentTime = video.duration;
      } catch (error) {
        // Ignore
      }
    };

    video.addEventListener("ended", handleVideoEnded);

    /*
     * HERO SCROLL CONTROL
     */
    const heroTrigger = ScrollTrigger.create({
      trigger: section,

      start: "top top",
      end: "bottom top",

      /*
       * First time entering Hero
       */
      onEnter: () => {
        playVideo();
      },

      /*
       * Returning to Hero from below
       */
      onEnterBack: () => {
        playVideo();
      },

      /*
       * Scrolling down OUT of Hero
       */
      onLeave: () => {
        stopVideo();
      },

      /*
       * Scrolling above Hero
       */
      onLeaveBack: () => {
        stopVideo();
      },
    });

    /*
     * Try to start when page loads.
     * No autoplay attribute is used.
     */
    playVideo();

    /*
     * If browser blocks autoplay with sound,
     * retry on first user interaction.
     */
    const unlockVideo = () => {
      const rect = section.getBoundingClientRect();

      const heroVisible =
        rect.top < window.innerHeight &&
        rect.bottom > 0;

      if (heroVisible && video.paused) {
        playVideo();
      }
    };

    window.addEventListener("pointerdown", unlockVideo);
    window.addEventListener("touchstart", unlockVideo);
    window.addEventListener("wheel", unlockVideo);

    /*
     * Cleanup
     */
    return () => {
      heroTrigger.kill();

      video.pause();

      video.removeEventListener(
        "ended",
        handleVideoEnded
      );

      window.removeEventListener(
        "pointerdown",
        unlockVideo
      );

      window.removeEventListener(
        "touchstart",
        unlockVideo
      );

      window.removeEventListener(
        "wheel",
        unlockVideo
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section"
    >
      <div className="hero-video-wrap">
        <video
          ref={videoRef}
          className="hero-video"
          src="/hero-video.mp4"
          playsInline
          preload="auto"
          loop={false}
        />

        <div className="hero-overlay" />
      </div>
    </section>
  );
}