import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

export async function logout(){
    const router = useRouter();
    const cookieStore = await cookies();
    cookieStore.delete("user_cookie");
    router.refresh();
  }