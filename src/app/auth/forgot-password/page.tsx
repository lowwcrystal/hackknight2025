import ForgotPasswordForm from "@/app/components/ForgotPasswordForm";

export default function Page() {
  return (
      <div
          className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-white via-orange-50 to-white p-6 md:p-10"
          style={{
              backgroundImage: "url('/flames.jpg')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundAttachment: "fixed"
          }}
      >
      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
