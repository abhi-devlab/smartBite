import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ChatBot from "./ChatBot";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaAppleAlt, FaLeaf, FaUtensils, FaChartPie, FaHeartbeat, FaGlassWhiskey } from "react-icons/fa";
import { HiShieldCheck } from "react-icons/hi";
import { MdAnalytics, MdEco } from "react-icons/md";

import "../styles/LandingPage.css";

function LandingPage() {
    const navigate = useNavigate();

    const featuresGrid = [
        { icon: <FaAppleAlt size={32} />, label: "Fresh & Seasonal" },
        { icon: <FaUtensils size={32} />, label: "4 Daily Meals" },
        { icon: <FaChartPie size={32} />, label: "Calorie Breakdown" },
        { icon: <FaLeaf size={32} />, label: "Organic Options" },
        { icon: <FaHeartbeat size={32} />, label: "Nutritionist-Approved" },
        { icon: <FaGlassWhiskey size={32} />, label: "Hydration Plans" },
    ];

  const uniqueFeatures = [
  {
    icon: <HiShieldCheck size={40} />,
    heading: "Balanced Indian Meal Plans",
    detail: "We provide traditional Indian meals designed by certified nutritionists, ensuring your body gets the right mix of proteins, carbs, and healthy fats with every dish.",
    image: "/images/idli.jpg",
  },
  {
    icon: <MdAnalytics size={40} />,
    heading: "Calorie & Portion Control",
    detail: "Each meal includes calorie information and is portioned according to your dietary goals — whether you're managing weight, building muscle, or simply eating clean.",
    image: "/images/fish.jpg",
  },
  {
    icon: <MdEco size={40} />,
    heading: "Seasonal & Local Ingredients",
    detail: "Our plans include locally sourced and seasonal fruits and vegetables, ensuring freshness, taste, and better nutritional value in every bite.",
    image: "/images/thali.jpg",
  },
];


    const featureIntroRef = useRef(null);
    const [featureVisible, setFeatureVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setFeatureVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (featureIntroRef.current) {
            observer.observe(featureIntroRef.current);
        }
        return () => observer.disconnect();
    }, []);

    return (
        <div className="container">
            <Navbar />

            {/* Hero Section */}
            <header className="hero-section">
                <div className="hero-text">
                    <motion.h1
                        initial={{ y: "2rem", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 2, type: "ease-in" }}
                    >
                        SmartBite <br />
                        AI-Powered personalized meal planner
                    </motion.h1>
                    <p>"Nourish your body, fuel your mind, and make every bite count with SmartBite."</p>
                </div>
                <div className="hero-button">
                    <button className="cta-button" onClick={() => navigate("/signup")}>
                        Get Your Plan
                    </button>
                </div>
            </header>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stats-hero-container">
                    <div className="flexCenter stats">
                        <div className="flexColCenter stat">
                            <span>
                                <CountUp start={0} end={1000} duration={4} /> <span className="plus-sign">+</span>
                            </span>
                            <span className="plus">Meal options</span>
                        </div>
                        <div className="flexColCenter stat">
                            <span>
                                <CountUp start={0} end={1000} duration={4} /> <span className="plus-sign">+</span>
                            </span>
                            <span className="plus">Happy Patients</span>
                        </div>
                        <div className="flexColCenter stat">
                            <span>
                                <CountUp end={28} /> <span className="plus-sign">+</span>
                            </span>
                            <span className="plus">Personalized health factors</span>
                        </div>
                    </div>
                    <div className="flexCenter hero-right">
                        <motion.div
                            initial={{ x: "7rem", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 2, type: "ease-in" }}
                            className="image-container"
                        >
                            <img src="/images/d1.jpg" alt="Meal plan example" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Custom Icon Features Grid Section */}
            <section className="c-wrapper">
                <div className="paddings innerWidth flexCenter c-container modern-grid">
                    {featuresGrid.map((item, index) => (
                        <div className="feature-card-icon" key={index}>
                            <div className="feature-icon">{item.icon}</div>
                            <span className="feature-label">{item.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* What We Offer Heading */}
            <section className="feature-intro" ref={featureIntroRef}>
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={featureVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 1 }}
                >
                    ✨ What We Offer
                </motion.h2>
            </section>

            {/* Original Features Section */}
            <section className="features" id="features">
                <div className="feature-card">
                    <img src="/images/customdietplan.jpg" alt="Customized Diet" className="feature-img" />
                    <h2>Customized Diet Plans</h2>
                    <p>Personalized meals based on country, age, taste, health, and dietary restrictions.</p>
                </div>
                <div className="feature-card">
                    <img src="/images/seasonplan.jpg" alt="Seasonal Food" className="feature-img" />
                    <h2>Regional & Seasonal Food</h2>
                    <p>Get food recommendations based on local seasons and availability.</p>
                </div>
                <div className="feature-card">
                    <img src="/images/dietplan7days.jpg" alt="7 Day Meal Plan" className="feature-img" />
                    <h2>7-Day Meal Plan</h2>
                    <p>Get a complete week-long meal guide for better consistency.</p>
                </div>
                <div className="feature-card">
                    <img src="/images/virtualdocplan.jpg" alt="Virtual Doctor" className="feature-img" />
                    <h2>🩺 Virtual Doctor Chatbot</h2>
                    <p>AI-powered doctor to guide your dietary choices based on your health conditions.</p>
                </div>
            </section>
              {/* Roadmap */}
            <section className="future">
                <h2>🚀 Coming Soon...</h2>
                <div className="feature-card future-style">
                    <img src="/images/stayfit.jpg" alt="Workout Plan" className="feature-img" />
                    <h2>🏋️ Stay Fit with SmartBite</h2>
                    <p>Get AI-generated workout plans tailored to your fitness level and diet.</p>
                </div>
                <div className="feature-card future-style">
                    <img src="/images/petplan.jpg" alt="Pet Diet Plan" className="feature-img" />
                    <h2>🐶 Pet Diet Section</h2>
                    <p>Personalized meal plans for your pets to keep them healthy.</p>
                </div>
            </section>

 <section className="unique-features">
  <h2 className="section-title">💡 What Makes Us Unique</h2>
  <div className="unique-feature-container">
    {uniqueFeatures.map((item, index) => (
      <motion.div
        key={index}
        className={`unique-feature-card row-${index % 2 === 0 ? "normal" : "reverse"}`}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.3 }}
        viewport={{ once: true }}
      >
        {/* Image Motion - Slides from outside-in */}
        <motion.div
          className="unique-feature-img"
          initial={{
            opacity: 0,
            x: index % 2 === 0 ? 150 : -150, // Slides in from image side
          }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: index * 0.3 + 0.2 }}
          viewport={{ once: true }}
        >
          <img src={item.image} alt={item.heading} className="circle-img" />
        </motion.div>

        {/* Text block */}
        <div className="unique-feature-text">
          <div className="unique-feature-icon">{item.icon}</div>
          <h3>{item.heading}</h3>
          <p>{item.detail}</p>
        </div>
      </motion.div>
    ))}
  </div>
</section>


          

            
            <ChatBot />

            <footer>
                <p>&copy; 2025 SmartBite | Designed for a Healthier Tomorrow</p>
            </footer>
        </div>
    );
}

export default LandingPage;
