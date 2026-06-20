import AboutClient from "@/components/sections/AboutClient";
import { createMetadata } from "@/utils/seo";

export const metadata = createMetadata({
  title: "About Our Premium Indian Alcohol Brand | MADIRÆ & Co.",
  description: "Learn about MADIRÆ & Co., a luxury Indian spirits and craft alcohol brand. Discover our Goan reserve distillery, Sahyadri brewery & winery, and boutique store locations in India.",
  path: "/about"
});

export default function AboutPage() {
  return <AboutClient />;
}
