import { useEffect, useRef, useState } from "react";
import { TopicCard } from "./topic";

export const CarouselTopics = (props: any) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction: "prev" | "next") => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="top left absolute flex h-full w-full justify-between">
        <button
          onClick={movePrev}
          className="z-10 m-0 h-full w-10 p-0 text-center text-white opacity-75 transition-all duration-300 ease-in-out hover:bg-blue-900/75 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25"
          disabled={isDisabled("prev")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="-ml-5 h-12 w-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="sr-only">Prev</span>
        </button>
        <button
          onClick={moveNext}
          className="z-10 m-0 h-full w-10 p-0 text-center text-white opacity-75 transition-all duration-300 ease-in-out hover:bg-blue-900/75 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25"
          disabled={isDisabled("next")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="-ml-5 h-12 w-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="sr-only">Next</span>
        </button>
      </div>
      <div
        ref={carousel}
        className="carousel-container relative z-0 flex touch-pan-x snap-x snap-mandatory gap-4 overflow-hidden scroll-smooth py-2"
      >
        <TopicCard
          variant="yellow"
          blob="/images/blob.svg"
          image="/images/categories/art.svg"
          courses={100}
          students={1250}
          topicName="Digital Design"
          topicDescription={
            "Graphic design is an applied art and profession that uses text and graphics to communicate visually."
          }
        />

        <TopicCard
          variant="blue"
          blob="/images/blob-2.svg"
          image="/images/categories/code.svg"
          courses={100}
          students={1250}
          topicName="Web Development"
          topicDescription={
            "Web development is the work involved in developing a website for the Internet or an intranet. Web development can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services"
          }
        />

        <TopicCard
          variant="purple"
          blob="/images/blob-3.svg"
          image="/images/categories/language.svg"
          courses={100}
          students={1250}
          topicName="English Speaking"
          topicDescription={
            "Make real progress in learning a language. Get your study plan for 2022 and become fluent."
          }
        />
        <TopicCard
          variant="purple"
          blob="/images/blob-3.svg"
          image="/images/categories/language.svg"
          courses={100}
          students={1250}
          topicName="English Speaking"
          topicDescription={
            "Make real progress in learning a language. Get your study plan for 2022 and become fluent."
          }
        />
      </div>
    </div>
  );
};
