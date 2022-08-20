import IconBook from "@ant-design/icons/BookFilled";
import IconUser from "@ant-design/icons/UserOutlined";
import { TitleSection } from "~/components/typos/section-title";
import { CarouselTopics } from "~/page-components/student/classes/carousel";

export default function Classes() {
  return (
    <>
      <div className="container">
        <TitleSection>Learning Topics</TitleSection>
        {/* Top categories */}
        <CarouselTopics />
        <TitleSection>Top Experts</TitleSection>
      </div>
    </>
  );
}
