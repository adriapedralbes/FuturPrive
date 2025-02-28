import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavBarCommunity } from "@/components/navbar-community";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* NavBar con posición fixed (mantener como está) */}
      <NavBarCommunity />
    </div>
  );
}