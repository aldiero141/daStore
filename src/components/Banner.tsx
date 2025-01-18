"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import "@/assets/css/Banner.css";

export default function Banner() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  useEffect(() => {
    if (!carouselApi) return;

    const updateCarouselState = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
      setTotalItems(carouselApi.scrollSnapList().length);
    };

    updateCarouselState();

    carouselApi.on("select", updateCarouselState);

    return () => {
      carouselApi.off("select", updateCarouselState); // Clean up on unmount
    };
  }, [carouselApi]);

  const scrollToIndex = (index: number) => {
    carouselApi?.scrollTo(index);
  };

  return (
    <div className="banner-container">
      <Carousel
        setApi={setCarouselApi}
        plugins={[plugin.current]}
        // onMouseEnter={plugin.current.stop}
        // onMouseLeave={plugin.current.reset}
        opts={{ loop: false }}
        className="w-full max-w-7xl h-96 max-h-[500px] z-10"
      >
        <CarouselContent>
          <CarouselItem>
            <Card>
              <CardContent className="banner-card-content bg-[url('/images/cashier-banner.jpg')] bg-cover bg-center text-white">
                <div className="flex flex-col text-left justify-center w-full h-full bg-black bg-opacity-30 p-10">
                  <h1 className="font-bold text-5xl">Limitless Selections.</h1>
                  <a className="flex items-center h-[40px] gap-2 text-2xl font-semibold w-full">
                    Browse our product
                    <ArrowRight className="w-5 h-5 font-bold" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <CardContent className="banner-card-content bg-[url('/images/electronics-banner.jpg')] bg-stone-700 bg-[length:320px] bg-left bg-no-repeat">
                <div className="flex flex-col text-right items-end justify-center w-full h-full p-10 text-white">
                  <h1 className="font-bold text-5xl">
                    Smart Tech, Simplified Life
                  </h1>
                  <h2 className="font-semibold text-2xl">
                    Upgrade Your World Today!
                  </h2>
                  <Button
                    variant={"outline"}
                    className="mt-4 w-20 bg-stone-600"
                  >
                    Shop Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <CardContent className="banner-card-content bg-[url('/images/clothings-banner.jpg')] bg-stone-800 bg-[length:400px] bg-right-top bg-no-repeat">
                <div className="flex flex-col items-start justify-center w-full h-full p-10 text-white">
                  <h1 className="font-bold text-5xl">Style You Love</h1>
                  <h2 className="font-semibold text-2xl">
                    Confidence You Deserve!
                  </h2>
                  <Button
                    variant={"outline"}
                    className="mt-4 w-20 bg-stone-600"
                  >
                    Shop Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 z-20 flex items-center justify-between px-3 pointer-events-none">
        <Button
          onClick={() => scrollToIndex(currentIndex - 1)}
          className="pointer-events-auto rounded-full w-32 h-32 p-0 bg-transparent shadow-none hover:bg-transparent"
        >
          <ChevronLeft color="black" className="size-32" strokeWidth={0.5} />
        </Button>
        <Button
          onClick={() => scrollToIndex(currentIndex + 1)}
          className="pointer-events-auto rounded-full w-32 h-32 p-0 bg-transparent shadow-none hover:bg-transparent"
        >
          <ChevronRight color="black" className="size-32" strokeWidth={0.5} />
        </Button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
