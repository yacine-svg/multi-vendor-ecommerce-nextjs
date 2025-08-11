import { SignInView } from "@/modules/auth/ui/views/sign-in-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const Page = async () => {
    const session = await caller.auth.session();
    if(session.user){
        redirect("/"); // Redirect to home if user is already logged in
    }
    return (
        <SignInView />
    );
}
export default Page;