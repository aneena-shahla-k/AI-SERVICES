import React from "react";
import { motion } from "framer-motion";
import "./AboutUs.css";
import img from "../../assets/images/about/about1.png";

const AboutUs = () => {
  return (
    <section className="about-us" id="about">
      <div className="about-us__glow about-us__glow--one" />
      <div className="about-us__glow about-us__glow--two" />

      <div className="about-us__container">

        {/* LEFT CONTENT */}
        <motion.div
          className="about-us__content"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Section label */}
          <div className="about-us__eyebrow">
            <i></i>
            <span>ABOUT US</span>
          </div>

          {/* Heading */}
          <h2 className="about-us__title">
            We turn business ideas
            <br />
            into{" "}
            <span>connected digital systems.</span>
          </h2>

          {/* Description */}
          <p className="about-us__description">
            AI concept combines business strategy, software development,
            artificial intelligence, automation, and digital growth planning
            to help businesses move from idea to execution.
          </p>

          {/* Quote card */}
          <motion.div
            className="about-us__quote"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: "easeOut",
            }}
          >
           

            <div className="about-us__quote-content">
              <p>
                We believe entrepreneurs shouldn't have to figure out
                the entire route alone.
              </p>

              <div className="about-us__quote-line"></div>

              <strong>
                We create the route. You drive the business.
              </strong>
            </div>

            
          </motion.div>
        </motion.div>


        {/* RIGHT VISUAL */}
        <motion.div
          className="about-us__visual"
          initial={{ opacity: 0, scale: 0.96, x: 30 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          {/* AI CONCEPT label */}
          <motion.div
            className="about-us__concept"
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <span className="about-us__concept-title">
              AI CONCEPT
            </span>

            <span className="about-us__concept-subtitle">
              Strategy&nbsp; · &nbsp;Technology&nbsp; · &nbsp;Growth
            </span>
          </motion.div>

          {/* Image */}
          <div className="about-us__image-wrapper">
            <img
              src={img}
              alt="Connected digital business route"
              className="about-us__image"
            />
          </div>

          {/* Ambient light */}
          <div className="about-us__visual-glow"></div>

        </motion.div>

      </div>
    </section>
  );
};

export default AboutUs;