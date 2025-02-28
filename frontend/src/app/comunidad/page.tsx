import { NavBarCommunity } from "@/components/navbar-community";
import { WritePostComponent } from "@/components/WritePostComponent";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <NavBarCommunity />
      <div className="max-w-5xl mx-auto pt-20">
        <WritePostComponent />
        <section>
          {/* Rest of community content */}
        </section>
      </div>
    </div>
  );
}