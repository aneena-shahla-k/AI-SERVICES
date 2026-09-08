import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  /*
   * VIDEO PLAY / PAUSE BASED ON HERO VISIBILITY
   */
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    video.muted = false;
    video.volume = 1;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.log("Autoplay with sound blocked by browser.");
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playVideo();
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(section);

    // Initial attempt
    playVideo();

    /*
     * If browser blocks autoplay,
     * first user interaction will start it.
     */
    const unlockVideo = () => {
      if (video.paused) {
        video.muted = false;
        video.volume = 1;

        video.play().catch(() => {});
      }
    };

    window.addEventListener("pointerdown", unlockVideo, {
      once: true,
    });

    window.addEventListener("touchstart", unlockVideo, {
      once: true,
    });

    window.addEventListener("wheel", unlockVideo, {
      once: true,
    });

    return () => {
      observer.disconnect();

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

  /*
   * GSAP HERO ANIMATION
   */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    const ctx = gsap.context(() => {
      /*
       * Cinematic entrance
       */
      gsap.fromTo(
        video,
        {
          opacity: 0,
          scale: 1.08,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.8,
          ease: "power2.out",
        }
      );

      /*
       * Hero → GPS Route
       */
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      })
        .to(
          video,
          {
            scale: 1.12,
            yPercent: -5,
            ease: "none",
          },
          0
        )
        .to(
          section,
          {
            opacity: 0,
            ease: "none",
          },
          0.7
        );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      id="hero"
    >
      <div className="hero-video-wrap">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          playsInline
          loop
          preload="auto"
          controls={false}
        >
          <source
            src="/hero-video.mp4"
            type="video/mp4"
          />
        </video>

        <div className="hero-overlay" />
      </div>
    </section>
  );
}