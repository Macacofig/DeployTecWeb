"use client";

import { AuthGuard } from "../../guards/AuthGuard";
import ProfileContent from "../../components/profile/ProfileContent";

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}