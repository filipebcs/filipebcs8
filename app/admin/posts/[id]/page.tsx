import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PostForm } from "@/components/post-form"

interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  cover_image: string | null
  published: boolean
  user_id: string
}

async function getPost(id: string): Promise<Post | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const post = await getPost(id)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <PostForm userId={user.id} post={post} />
    </main>
  )
}
