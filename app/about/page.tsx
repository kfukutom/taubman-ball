"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

// image components:
import taubmanlogo from "@/assets/umich-taubman.png";
import tab from "@/assets/tab.png";
import event1 from "@/assets/slider-photos/events-1.jpeg";
import event from "@/assets/slider-photos/events-2.jpg";
import event3 from "@/assets/slider-photos/events-3.png";
import moon from "@/assets/moon.png"; // add?
// .. add more photos later, swasti  {DONE}

// Animated Modals;
import { AnimatedTestimonials } from "@/components/ui/animated-testimonial";
import Footer from "@/components/ui/Footer";
import NavigationLinks from "@/components/ui/NavigationLinks";

// Background components:
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";

const emailID = "taubmanarchball@umich.edu";
let descriptionEvent = (`TAB (Taubman Architecture Ball) is a celebration of architecture, design, and creativity, 
hosted by the students of the Taubman College of Architecture and Urban Planning. 
Join us for a night of inspiration, collaboration, and bonding.`);

export default function About() {
  const [currentTime, setCurrentTime] = useState("");
  const router = useRouter();

  const updateTime = () => {
    const currentTime = new Date();
    return currentTime.toLocaleTimeString();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(updateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-screen relative bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden">
      <StarsBackground 
        className="absolute inset-0 z-0 pointer-events-none" 
        starDensity={0.001} 
        allStarsTwinkle={false} 
        twinkleProbability={1} 
        minTwinkleSpeed={0.5} 
        maxTwinkleSpeed={0.8} 
      />
      <ShootingStars 
        className="absolute inset-0 z-0 pointer-events-none" 
        minSpeed={5} 
        maxSpeed={30} 
        minDelay={3000} 
        maxDelay={6000} 
        starColor="#FFFFFF" 
        trailColor="#9E00FF" 
        starWidth={30} 
        starHeight={2.25} 
      />
      
      <img 
        src={moon.src} 
        alt="Glowing Moon" 
        className="absolute top-4 right-4 w-20 h-20 drop-shadow-[0_0_12px_rgba(255,255,255,0.425)]" 
      />

      {/* Main content goeshere */}
      <div className="relative z-10 flex flex-col items-center p-6 max-w-7xl mx-auto">
        <div className="max-w-3xl text-center">
          <h1 className="text-5xl font-mono mt-12 mb-6 text-amber-300 drop-shadow-glow animate-none">
            About <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">TAB</span>
          </h1>
  
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed pb-3">
            2000 Boinsteel Blvd, 7:00pm - 10:00pm
          </p>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-5">
            {descriptionEvent}
          </p>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10">
            xoxo, the <span className="font-mono">e</span>board :)
          </p>
          
          {/* Theme Section */}
          <div className="bg-gradient-to-r from-gray-900/70 via-gray-800/70 to-gray-900/70 p-6 rounded-lg backdrop-blur-sm border border-gray-700/50 shadow-xl mb-10">
            <h2 className="text-2xl font-mono mb-4 text-amber-300">This Year's Theme: Renaissance</h2>
            
            <div className="bg-black/40 p-5 rounded-lg border border-gray-700/30">
              <p className="text-gray-300 leading-relaxed">
                The Renaissance was a cultural shift that the world of creators, inventors and thinkers had been eagerly waiting for. This year, the Taubman Architectural Ball invites you to consider what it means to reinvent something and look into the future: be it in your career, your academic pursuits, existing systems in the world, or artistic vision.
              </p>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-300 italic">Come dressed in your Renaissance best! <span className="not-italic">😉</span></p>
            </div>
          </div>
      

          <hr className="border-gray-600 my-10" />
          {/* Animated testimonials: should go below */}
          <h2 className="text-3xl sm:text-4xl pt-3 font-bold mb-4 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">
            Get Involved in Future Events
          </h2>
          <AnimatedTestimonials
            autoplay={false}
            testimonials={[
              {
                quote: "From the detailed installations throughout the Commons, to each invitation, this event was entirely executed by Taubman students! For the last 2 months, students throughout Taubman College have been designing, collaborating, and bringing their ideas to life so that you can experience their work and enjoy an unforgettable night!",
                name: "",
                designation: "A Student-Led Initiative",
                src: event1.src,
              },
              {
                quote: "At the heart of the Taubman community is a drive to innovate. This event was created to honor not just the innovative thinking that takes place within these walls, but how that thinking has made problem solvers out of every member of this community. Furthermore, it creates a new environment within the walls of academia that allow for opportunities of free expression outside of the studio and to party in the same location students spend so much time in.",
                name: "",
                designation: "A Community of Innovators",
                src: event3.src,
              },
              {
                quote: "The Ball is a tradition that keeps the Taubman community inspired, and is one that students plan to continue in the years to come. More about our past event can be read down below under `Past Event`",
                name: "",
                designation: "Future Events",
                src: event.src,
              },
            ]}
          />
          <p className="text-md sm:text-md text-gray-300 leading-relaxed my-3">
            We're always looking for new installation projects and would love new ideas to come on board with us!&nbsp;
          </p>
          <span className="text-gray-400">
            If you're interested in joining our team, please reach out to us at{" "}
          </span>
          <a 
            href="mailto:taubmanarchball@umich.edu" 
            className="text-center text-blue-400 hover:text-blue-300 underline transition duration-200"
          >
            {emailID}
          </a>
          <hr className="border-gray-600 my-10" />
        </div>
      </div>
      <Footer/>
    </div>
  );
} //About() class