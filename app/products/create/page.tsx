import RoleGuard from "@/app/components/RoleGuard";

export default function ProfilePage() {
  return (
    <RoleGuard role="USER">
      <div>
        <h1>User Profile</h1>
        <p>Welcome to your profile page!</p>
      </div>
    </RoleGuard>
  );
}
