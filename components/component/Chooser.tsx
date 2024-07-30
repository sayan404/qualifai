"use client"

import { useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Interview from "../interview/page"

export function Chooser() {
  const [showInterview, setShowInterview] = useState(false);

  const handleButtonClick = () => {
    setShowInterview(true);
  }

  if (showInterview) {
    return <Interview />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="relative w-full max-w-4xl mx-auto">
        <Carousel className="rounded-lg overflow-hidden">
          <CarouselContent>
            <CarouselItem>
              <div className="grid grid-cols-2 gap-6 items-center">
                <img
                  src="images/1.png"
                  alt="The senior Indian tech lead"
                  className="rounded-lg object-cover aspect-square w-full"
                />
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">The senior Indian tech lead</h3>
                  <p className="text-muted-foreground">
                    A highly experienced tech lead from India, known for his expertise in leading large teams and complex projects.
                  </p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="grid grid-cols-2 gap-6 items-center">
                <img
                  src="images/2.png"
                  alt="The cool techy cofounder from San Francisco"
                  className="rounded-lg object-cover aspect-square w-full"
                />
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">The cool techy cofounder from San Francisco</h3>
                  <p className="text-muted-foreground">
                    A tech-savvy cofounder from San Francisco, known for his innovative ideas and dynamic leadership in the tech industry.
                  </p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="grid grid-cols-2 gap-6 items-center">
                <img
                  src="images/3.png"
                  alt="The meticulous software architect"
                  className="rounded-lg object-cover aspect-square w-full"
                />
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">The meticulous software architect</h3>
                  <p className="text-muted-foreground">
                    A software architect who pays meticulous attention to details, ensuring robust and scalable software designs.
                  </p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="grid grid-cols-2 gap-6 items-center">
                <img
                  src="images/4.png"
                  alt="The confident cybersecurity expert"
                  className="rounded-lg object-cover aspect-square w-full"
                />
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Helpful SDE-2</h3>
                  <p className="text-muted-foreground">
                    A senior expert who excels in Development and Devops.
                  </p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="grid grid-cols-2 gap-6 items-center">
                <img
                  src="images/5.png"
                  alt="A cute robo-interviewer"
                  className="rounded-lg object-cover aspect-square w-full"
                />
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">A cute robo-interviewer</h3>
                  <p className="text-muted-foreground">
                    This interviewer is an adorable robot designed to make your interview experience delightful and engaging.
                  </p>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
            <ChevronLeftIcon className="w-8 h-8" />
          </CarouselPrevious>
          <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
            <ChevronRightIcon className="w-8 h-8" />
          </CarouselNext>
        </Carousel>
        <div className="flex justify-center mt-8">
          <Button onClick={handleButtonClick}>Let's Start the Interview</Button>
        </div>
      </div>
    </div>
  )
}

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
