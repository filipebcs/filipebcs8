"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react"
import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  cover_image: string | null
  published: boolean
  created_at: string
}

const fetcher = async (): Promise<Post[]> => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, cover_image, published, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching posts:", error)
    return []
  }

  return data || []
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function estimateReadTime(excerpt: string | null) {
  if (!excerpt) return "2 min read"
  const words = excerpt.split(" ").length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}

export default function BlogPage() {
  const { data: posts, isLoading, error } = useSWR("posts", fetcher)

  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-foreground mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Thoughts, tutorials, and insights about cybersecurity, penetration testing, 
              and offensive security techniques.
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-full bg-card border-border animate-pulse">
                  <div className="aspect-video bg-secondary rounded-t-lg" />
                  <CardHeader>
                    <div className="h-4 w-24 bg-secondary rounded mb-2" />
                    <div className="h-6 w-full bg-secondary rounded" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 w-full bg-secondary rounded mb-2" />
                    <div className="h-4 w-2/3 bg-secondary rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <p className="text-destructive mb-4">Failed to load posts. Please try again later.</p>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
                className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                Retry
              </Button>
            </div>
          )}

          {/* Posts Grid */}
          {!isLoading && !error && posts && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}/`}>
                  <Card className="h-full bg-card border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 group">
                    {post.cover_image && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={post.cover_image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.created_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {estimateReadTime(post.excerpt)}
                        </span>
                      </div>
                      <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {post.excerpt && (
                        <CardDescription className="line-clamp-3 text-muted-foreground">
                          {post.excerpt}
                        </CardDescription>
                      )}
                      <div className="mt-4 flex items-center gap-2 text-sm text-primary font-medium">
                        Read more
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && posts && posts.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">No posts yet</h2>
              <p className="text-muted-foreground mb-6">
                Check back soon for new content about cybersecurity and penetration testing.
              </p>
              <Link href="/">
                <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground bg-transparent">
                  Back to Home
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
