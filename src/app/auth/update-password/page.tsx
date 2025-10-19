import UpdatePasswordForm from "@/app/components/UpdatePasswordForm";

export default function Page() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10"
             style={{
                 backgroundImage: "url('/flames.jpg')",
                 backgroundSize: "cover",
                 backgroundRepeat: "no-repeat",
                 backgroundPosition: "center",
                 backgroundAttachment: "fixed"
             }}
        >
            <div className="w-full max-w-sm">
                <UpdatePasswordForm/>
            </div>
        </div>
    );
}