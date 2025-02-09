"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

// image components:
import taubmanlogo from "@/assets/umich-taubman.png";
import tab from "@/assets/tab.png";
import event from "@/assets/events.jpg";
import students from "@/assets/events.jpeg";
import community from "@/assets/community.jpg";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonial";
import Footer from "@/components/ui/Footer";

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
    <div className="min-h-screen bg-black text-white font-[family-name:var(--font-geist-sans)] flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-10">
        <div className="max-w-3xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                About <span className="text-blue-300">TAB</span>
            </h1>
            <p className="text-sm sm:text-xs text-gray-400 leading-relaxed pb-3">2000 Boinsteel Blvd, 700pm - 1000pm</p>
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10">
                    "TAB (Taubman Architecture Ball) is a celebration of architecture,
                    design, and creativity, hosted by the students of the Taubman
                    College of Architecture and Urban Planning. Join us for a night of
                    inspiration, collaboration, and bonding."
                </p>
                
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10">- sincerely, the <span className="font-mono">e</span>board :)</p>
        <hr className="border-gray-600 my-10" />
        {/* Animated Testimonal should go below */}
        <AnimatedTestimonials
          autoplay = {false}
          testimonials={[
            {
              quote: "As a student-organized initiative, many plans executed on the night of the event were created by our wonderful students. We are proud to have such a talented and creative community, organizing this event once more.",
              name: "",
              designation: "A Student-Led Initiative",
              src: students.src,
            },
            {
              quote: "The Taubman Architecture Ball invites students, faculty, and staff to come together and celebrate the creativity and innovation that is at the heart of our community. We are beyond excited to have you here today with us, and there will be many exciting events coming up!",
              name: "",
              designation: "United as a Community",
              src: community.src,
            },
            {
              quote: "The event was previously a great success! We plan on continuing the tradition as the years go on! For now, join us for the night and let's celebrate together. And of course, there will be complimentary drinks as well as free food ;)",
              name: "",
              designation: "Past Event and Future Plans",
              src: event.src,
            }
          ]}
        />
        </div>
      </main>
      <Footer />
    </div>
  );
}