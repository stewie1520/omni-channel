import { TitleSection } from "~/components/typos/section-title";
import { CarouselTopics } from "~/page-components/student/classes/carousel";

export default function Classes() {
  return (
    <>
      <div className="container px-4 sm:px-6 md:px-8">
        <TitleSection>Learning Topics</TitleSection>
        {/* Top categories */}
        <CarouselTopics />
        <TitleSection>Top Experts</TitleSection>
        <div className="flex flex-col rounded-xl border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-slate-700/[.7] md:p-5">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            Card title
          </h3>
          <p className="mt-1 text-xs font-medium uppercase text-gray-500 dark:text-gray-500">
            Card subtitle
          </p>
          <p className="mt-2 text-gray-800 dark:text-gray-400">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a
            className="mt-3 mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-700"
            href="#"
          >
            Card link
            <svg
              className="h-auto w-2.5"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
