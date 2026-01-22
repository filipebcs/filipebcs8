"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Eye, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  cover_image: string | null
  published: boolean
}

interface PostFormProps {
  userId: string
  post?: Post
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function PostForm({ userId, post }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || "")
  const [slug, setSlug] = useState(post?.slug || "")
  const [content, setContent] = useState(post?.content || "")
  const [excerpt, setExcerpt] = useState(post?.excerpt || "")
  const [coverImage, setCoverImage] = useState(post?.cover_image || "")
  const [published, setPublished] = useState(post?.published || false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClient()
  const isEditing = !!post

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!isEditing || !post?.slug) {
      setSlug(generateSlug(value))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const postData = {
      title,
      slug,
      content,
      excerpt: excerpt || null,
      cover_image: coverImage || null,
      published,
      user_id: userId,
      updated_at: new Date().toISOString(),
    }

    if (isEditing) {
      const { error } = await supabase
        .from("posts")
        .update(postData)
        .eq("id", post.id)

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }
    } else {
      const { error } = await supabase.from("posts").insert([postData])

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }
    }

    router.push("/admin")
    router.refresh()
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link 
            href="/admin" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-foreground">
            {isEditing ? "Edit Post" : "Create New Post"}
          </h1>
        </div>
        {isEditing && published && (
          <Link href={`/blog/${slug}`} target="_blank">
            <Button variant="outline" className="border-border bg-transparent">
              <Eye className="h-4 w-4 mr-2" />
              View Post
            </Button>
          </Link>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
            <CardDescription>
              Fill in the details for your blog post
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter post title"
                required
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="post-url-slug"
                required
                className="bg-input border-border font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                URL: /blog/{slug || "your-post-slug"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief description of your post (shown in previews)"
                rows={3}
                className="bg-input border-border resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input
                id="coverImage"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here... (HTML is supported)"
                rows={20}
                required
                className="bg-input border-border resize-none font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                You can use HTML tags for formatting: &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;code&gt;, &lt;pre&gt;, &lt;blockquote&gt;, &lt;a&gt;
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Publishing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="published" className="text-base">Publish Post</Label>
                <p className="text-sm text-muted-foreground">
                  {published 
                    ? "Post will be visible to everyone" 
                    : "Post will be saved as a draft"}
                </p>
              </div>
              <Switch
                id="published"
                checked={published}
                onCheckedChange={setPublished}
              />
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="p-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive">
            {error}
          </div>
        )}

        <div className="flex items-center gap-4">
          <Button
            type="submit"
            disabled={loading}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? "Saving..." : "Creating..."}
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? "Save Changes" : "Create Post"}
              </>
            )}
          </Button>
          <Link href="/admin">
            <Button type="button" variant="outline" className="border-border bg-transparent">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
