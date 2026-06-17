"use client";

import { AdminGuard } from "../../../guards/AdminGuard";
import ProfileContent from "../../../components/profile/ProfileContent";

export default function AdminProfilePage() {
  return (
    <AdminGuard>
      <ProfileContent />
    </AdminGuard>
  );
}
