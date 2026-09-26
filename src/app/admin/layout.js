import AdminLayout from '@/components/admin/AdminLayout';

export const metadata = {
  title: "Admin Panel | Dr. Siulik's Dental Care",
  description: "Internal administrative dashboard for Dr. Siulik's Dental Care.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }) {
  return <AdminLayout>{children}</AdminLayout>;
}
