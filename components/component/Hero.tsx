import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserCheck, Zap, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";
const Hero = () => {
  const router = useRouter();
  const handleClick = (e: any) => {
    router.push("/sign-in");
    // console.log("Button clicked");
  };
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-4 font-serif">
            Master Your Interviews with AI
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Get real-time feedback from AI avatars and improve your interview
            skills
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-white font-serif">
                <UserCheck className="mr-2 h-6 w-6" />
                Realistic Simulations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Practice with AI avatars that mimic real interviewers across
                various industries.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-white font-serif">
                <Zap className="mr-2 h-6 w-6" />
                Instant Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Receive immediate, detailed feedback on your performance to
                identify areas for improvement.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-white font-serif">
                <MessageSquare className="mr-2 h-6 w-6" />
                Personalized Coaching
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Get tailored advice and tips to enhance your interview skills
                based on your unique strengths and weaknesses.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4 font-serif">
            Ready to ace your next interview?
          </h3>
          <Button
            size="lg"
            className="bg-black text-white border-2 border-white hover:bg-white hover:text-black"
            onClick={handleClick}
          >
            Try Qualifai Now
          </Button>
        </div>
      </main>

      <footer className="bg-gray-900 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 Qualifai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Hero;
