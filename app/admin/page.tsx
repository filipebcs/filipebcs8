import { redirect } from "next/navigation"
import Link from "next/link"
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DeletePostButton, LogoutButton } from "@/components/admin-actions"

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  published: boolean
  created_at: string
  updated_at: string
}

async function getPosts(): Promise<Post[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, published, created_at, updated_at")
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
    month: "short",
    day: "numeric",
  })
}

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const posts = await getPosts()

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Site
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your blog posts</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/posts/new">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardDescription>Total Posts</CardDescription>
              <CardTitle className="text-3xl">{posts.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardDescription>Published</CardDescription>
              <CardTitle className="text-3xl text-primary">
                {posts.filter((p) => p.published).length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardDescription>Drafts</CardDescription>
              <CardTitle className="text-3xl text-muted-foreground">
                {posts.filter((p) => !p.published).length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Posts List */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>All Posts</CardTitle>
            <CardDescription>
              Click on a post to edit it, or use the actions to manage visibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            {posts.length > 0 ? (
              <div className="divide-y divide-border">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground truncate">
                          {post.title}
                        </h3>
                        <Badge
                          variant={post.published ? "default" : "secondary"}
                          className={post.published ? "bg-primary/20 text-primary" : ""}
                        >
                          {post.published ? (
                            <>
                              <Eye className="h-3 w-3 mr-1" />
                              Published
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-3 w-3 mr-1" />
                              Draft
                            </>
                          )}
                        </Badge>
                      </div>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {post.excerpt}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Created {formatDate(post.created_at)} | Updated {formatDate(post.updated_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {post.published && (
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        </Link>
                      )}
                      <Link href={`/admin/posts/${post.id}`}>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </Link>
                      <DeletePostButton postId={post.id} postTitle={post.title} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No posts yet</p>
                <Link href="/admin/posts/new">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Post
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
