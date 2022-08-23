import { IconMacbook } from "../../../components/icons/macbook";
import { IconUniversity } from "../../../components/icons/university";
import { useComputedStudent } from "~/utils";
import { TitleSection } from "~/components/typos/section-title";
import { UpcomingClass } from "~/page-components/dashboard/upcoming-class";
import { MyClassTab } from "~/page-components/dashboard/my-class-tab";

export default function DashboardPage() {
  const student = useComputedStudent();
  return (
    <>
      <div className="container flex bg-white px-8 py-8">
        <div className="mt-3 flex w-1/3 flex-col">
          <div className="flex flex-col space-y-6">
            <span className="text-3xl">
              <span className="font-semibold">Hello,</span>&nbsp;
              <span className="font-light">{student.fullName}</span>
              <span className="">&nbsp; 👋</span>
            </span>
            <span className="text-sm font-light text-gray-600">
              Nice to have you back, what an exciting day! Get ready and
              continue your lesson today.
            </span>
          </div>
          <TitleSection className="mt-5" icon={IconMacbook}>
            Today's course
          </TitleSection>
          <div className="flex flex-col space-y-4">
            <UpcomingClass
              minutes={120}
              assignment={3}
              students={1250}
              lesson={20}
              percent={65}
              category="coding"
              title="Java: up and running"
            />
            <UpcomingClass
              variant={"blue"}
              minutes={55}
              assignment={5}
              students={990}
              lesson={20}
              percent={50}
              category="design"
              title="Digital: Design Fundamental"
            />
          </div>
          <TitleSection className="mt-5" icon={IconUniversity}>
            Your class
          </TitleSection>
          <MyClassTab />
        </div>
        <div className="flex w-2/3 p-4">
          <div className="w-full rounded-xl bg-[#f7f8fd] p-4">hello</div>
        </div>
      </div>
    </>
  );
}
