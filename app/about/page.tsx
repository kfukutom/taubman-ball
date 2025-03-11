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
        className="absolute inset-0 z-0" 
        starDensity={0.001} 
        allStarsTwinkle={false} 
        twinkleProbability={1} 
        minTwinkleSpeed={0.5} 
        maxTwinkleSpeed={0.8} 
      />
      <ShootingStars 
        className="absolute inset-0 z-0" 
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
          <hr className="border-gray-600 my-10" />
          {/* Animated testimonials: should go below */}
          <h2 className="text-3xl sm:text-4xl pt-3 font-bold mb-4 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">
            Get Involved in Future Events
          </h2>
          <AnimatedTestimonials
            autoplay={false}
            testimonials={[
              {
                quote: "As a student-organized initiative, many plans executed on the night of the event were created by our wonderful students. We are proud to have such a talented and creative community, organizing this event once more.",
                name: "",
                designation: "A Student-Led Initiative",
                src: event1.src,
              },
              {
                quote: "The Taubman Architecture Ball invites students, faculty, and staff to come together and celebrate the creativity and innovation that is at the heart of our community. We are beyond excited to have you here today with us, and there will be many exciting events coming up!",
                name: "",
                designation: "United as a Community",
                src: event3.src,
              },
              {
                quote: "The event was previously a great success! We plan on continuing the tradition as the years go on! For now, join us for the night and let's celebrate together. And of course, there will be complimentary drinks as well as free food ;)",
                name: "",
                designation: "Past Event and Future Plans",
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