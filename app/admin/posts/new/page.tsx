import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PostForm } from "@/components/post-form"

export default async function NewPostPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <main className="min-h-screen bg-background">
      <PostForm userId={user.id} />
    </main>
  )
}
