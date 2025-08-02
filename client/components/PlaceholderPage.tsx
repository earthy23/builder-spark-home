import { Construction } from "lucide-react";
import Layout from "./Layout";

interface PlaceholderPageProps {
  title: string;
  description: string;
  showSidebar?: boolean;
}

export default function PlaceholderPage({
  title,
  description,
  showSidebar = true,
}: PlaceholderPageProps) {
  return (
    <Layout showSidebar={showSidebar}>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Construction className="w-8 h-8 text-uec-accent" />
          </div>
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <p className="text-gray-400 mb-6">{description}</p>
          <p className="text-sm text-gray-500">
            This page is under construction. Continue chatting with me to build
            out this section!
          </p>
        </div>
      </div>
    </Layout>
  );
}
