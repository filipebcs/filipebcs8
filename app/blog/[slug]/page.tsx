"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  cover_image: string | null
  published: boolean
  created_at: string
  updated_at: string
}

const fetcher = async (slug: string): Promise<Post | null> => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function estimateReadTime(content: string) {
  const words = content.split(" ").length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const { data: post, isLoading, error } = useSWR(slug ? `post-${slug}` : null, () => fetcher(slug))

  return (
    <main className="min-h-screen">
      <Header />
      
      <article className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {/* Back link */}
          <Link 
            href="/blog/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Loading State */}
          {isLoading && (
            <div className="animate-pulse">
              <div className="aspect-video bg-secondary rounded-lg mb-8" />
              <div className="h-10 w-3/4 bg-secondary rounded mb-4" />
              <div className="flex gap-4 mb-8">
                <div className="h-4 w-24 bg-secondary rounded" />
                <div className="h-4 w-24 bg-secondary rounded" />
              </div>
              <div className="space-y-4">
                <div className="h-4 w-full bg-secondary rounded" />
                <div className="h-4 w-full bg-secondary rounded" />
                <div className="h-4 w-2/3 bg-secondary rounded" />
              </div>
            </div>
          )}

          {/* Error State */}
          {(error || (!isLoading && !post)) && (
            <div className="text-center py-16">
              <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The post you are looking for does not exist or has been removed.
              </p>
              <Link href="/blog/">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Back to Blog
                </Button>
              </Link>
            </div>
          )}

          {/* Post Content */}
          {!isLoading && post && (
            <>
              {/* Cover image */}
              {post.cover_image && (
                <div className="aspect-video overflow-hidden rounded-lg mb-8">
                  <img
                    src={post.cover_image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Post header */}
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Filipe Silveira
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.created_at)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {estimateReadTime(post.content)}
                  </span>
                </div>
              </header>

              {/* Post content */}
              <div className="prose prose-invert prose-lg max-w-none">
                <div 
                  className="text-muted-foreground leading-relaxed space-y-4 [&>p]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-foreground [&>h3]:mt-6 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>code]:bg-secondary [&>code]:px-2 [&>code]:py-0.5 [&>code]:rounded [&>code]:font-mono [&>code]:text-sm [&>pre]:bg-secondary [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:italic [&>a]:text-primary [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary/80"
                  dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }}
                />
              </div>

              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-border">
                <Link 
                  href="/blog/" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to all posts
                </Link>
              </div>
            </>
          )}
        </div>
      </article>

      <Footer />
    </main>
  )
}
