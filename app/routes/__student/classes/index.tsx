import IconBook from "@ant-design/icons/BookFilled";
import IconUser from "@ant-design/icons/UserOutlined";
import { TitleSection } from "~/components/typos/section-title";

export default function Classes() {
  return (
    <>
      <div className="container">
        <TitleSection>Learning Topics</TitleSection>
        {/* Top categories */}
        <div className="grid grid-cols-4 gap-4">
          {/* Category */}
          <div className="relative flex flex-col overflow-hidden rounded-xl bg-[#f9af2b] p-4 md:p-5">
            <img
              className="self-center"
              draggable="false"
              src="/images/categories/art.svg"
              width={200}
              alt="Art"
            />
            <img
              className="z-1 absolute bottom-0 right-2"
              draggable="false"
              src="/images/blob.svg"
              alt="blob"
              width={150}
            />
            <div className="container z-10">
              <p className="text-left text-xl font-semibold capitalize text-white">
                Digital Design
              </p>
              <span className="text-sm font-thin leading-5 text-white line-clamp-2">
                Graphic design is an applied art and profession that uses text
                and graphics to communicate visually.
              </span>
              <div className="mt-2 flex justify-between">
                <div className="flex items-center gap-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white">
                    <IconBook className="text-[10px] text-[#f9af2b]" />
                  </div>
                  <span className="text-[12px] font-light text-white">
                    100 courses
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white">
                    <IconUser className="text-[10px] text-blue-300" />
                  </div>
                  <span className="text-[12px] font-light text-white">
                    +100 students
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col overflow-hidden rounded-xl bg-[#57b8eb] p-4 md:p-5">
            <img
              className="self-center"
              draggable="false"
              src="/images/categories/code.svg"
              width={200}
              alt="Art"
            />
            <img
              className="z-1 absolute bottom-0 right-2"
              draggable="false"
              src="/images/blob-2.svg"
              alt="blob"
              width={150}
            />
            <div className="container z-10">
              <p className="text-left text-xl font-semibold capitalize text-white">
                Web Development
              </p>
              <span className="text-sm font-thin leading-5 text-white line-clamp-2">
                Make real progress in learning a language. Get your study plan
                for 2022 and become fluent.
              </span>
              <div className="mt-2 flex justify-between">
                <div className="flex items-center gap-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white">
                    <IconBook className="text-[10px] text-[#f9af2b]" />
                  </div>
                  <span className="text-[12px] font-light text-white">
                    100 courses
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white">
                    <IconUser className="text-[10px] text-blue-300" />
                  </div>
                  <span className="text-[12px] font-light text-white">
                    +100 students
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col overflow-hidden rounded-xl bg-[#7383bf] p-4 md:p-5">
            <img
              className="self-center"
              draggable="false"
              src="/images/categories/language.svg"
              width={200}
              alt="Art"
            />
            <img
              className="z-1 absolute bottom-0 right-2"
              draggable="false"
              src="/images/blob-3.svg"
              alt="blob"
              width={150}
            />
            <div className="container z-10">
              <p className="text-left text-xl font-semibold capitalize text-white">
                English Speaking
              </p>
              <span className="text-sm font-thin leading-5 text-white line-clamp-2">
                Make real progress in learning a language. Get your study plan
                for 2022 and become fluent.
              </span>
              <div className="mt-2 flex justify-between">
                <div className="flex items-center gap-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white">
                    <IconBook className="text-[10px] text-[#f9af2b]" />
                  </div>
                  <span className="text-[12px] font-light text-white">
                    100 courses
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white">
                    <IconUser className="text-[10px] text-blue-300" />
                  </div>
                  <span className="text-[12px] font-light text-white">
                    +100 students
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
