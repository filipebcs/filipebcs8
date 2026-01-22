import { ArrowDown, Github, Linkedin, Mail, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.28_0.01_240)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.28_0.01_240)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Terminal-style intro */}
          <div className="mb-8 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-mono text-sm text-muted-foreground">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="text-primary">$</span> whoami
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
            Filipe de Castro Borges
            <span className="block text-primary mt-2">da Silveira</span>
          </h1>

          <p className="mt-6 text-xl text-muted-foreground max-w-2xl text-pretty">
            Offensive Security Expert | OSCP+ | Pentester | Cloud Security Specialist
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 font-mono text-sm">
            <span className="rounded-md bg-primary/10 px-3 py-1 text-primary border border-primary/20">
              Red Team
            </span>
            <span className="rounded-md bg-primary/10 px-3 py-1 text-primary border border-primary/20">
              Penetration Testing
            </span>
            <span className="rounded-md bg-primary/10 px-3 py-1 text-primary border border-primary/20">
              AWS Security
            </span>
            <span className="rounded-md bg-primary/10 px-3 py-1 text-primary border border-primary/20">
              PhD Student @ UnB
            </span>
          </div>

          <p className="mt-8 text-base text-muted-foreground max-w-3xl leading-relaxed">
            Information security professional with solid experience in pentesting, network security, 
            and vulnerability analysis. OSCP+ certified with practical skills in exploitation, 
            intrusion testing, and risk mitigation in real-world environments.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link href="#experience">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                View Experience
              </Button>
            </Link>
            <Link href="/blog">
              <Button size="lg" variant="outline" className="border-border hover:bg-secondary bg-transparent">
                Read My Blog
              </Button>
            </Link>
          </div>

          {/* Social links */}
          <div className="mt-12 flex items-center gap-6">
            <Link
              href="https://linkedin.com/in/filipebcs8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link
              href="https://github.com/filipebcs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </Link>
            <Link
              href="mailto:filipebcs8@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  )
}
