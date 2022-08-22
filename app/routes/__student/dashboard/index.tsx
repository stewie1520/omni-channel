import { IconMacbook } from "../../../components/icons/macbook";
import { IconUniversity } from "../../../components/icons/university";
import { useComputedUser } from "~/utils";
import { TitleSection } from "~/components/typos/section-title";
import { UpcomingClass } from "~/page-components/dashboard/upcoming-class";
import { MyClass } from "~/page-components/dashboard/my-class";


export default function DashboardPage () {
  const user = useComputedUser();
  return (
    <>
      <div className="flex container bg-white px-8 py-8">
        <div className="flex flex-col w-1/3 mt-3">
          <div className="flex flex-col space-y-6">
            <span className="text-3xl">
              <span className="font-semibold">Hello,</span>&nbsp;<span className="font-light">{ user.fullName }</span>
              <span className="">&nbsp; 👋</span>
            </span>
            <span className="text-sm font-light text-gray-600">
              Nice to have you back, what an exciting day! Get ready and continue your lesson today.
            </span>
          </div>
          <TitleSection className="mt-5" icon={IconMacbook}>Today's course</TitleSection>
          <div className="flex flex-col space-y-4">
            <UpcomingClass minutes={120} assignment={3} students={1250} lesson={20} percent={65} category="coding" title="Java: up and running" />
            <UpcomingClass variant={"blue"} minutes={55} assignment={5} students={990} lesson={20} percent={50} category="design" title="Digital: Design Fundamental" />
          </div>
          <TitleSection className="mt-5" icon={IconUniversity}>Your class</TitleSection>
          <MyClass/>
        </div>
        <div className="flex w-2/3 p-4">
          <div className="w-full p-4 rounded-xl bg-[#f7f8fd]">
            hello
          </div>
        </div>
      </div>
    </>
  );
}
