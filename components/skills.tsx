"use client"

import Image from "next/image"
import { Award, Code, Globe, Shield, Server, Terminal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { withBasePath } from "@/lib/utils/base-path"

const skillCategories = [
  {
    title: "Security Tools",
    icon: Shield,
    skills: [
      "Burp Suite Pro",
      "Metasploit",
      "Nmap",
      "Wireshark",
      "BloodHound",
      "SharpHound",
      "Responder",
      "Impacket",
      "GoPhish",
      "Pacu",
    ],
  },
  {
    title: "Operating Systems",
    icon: Server,
    skills: ["Linux", "Windows", "macOS", "Kali Linux"],
  },
  {
    title: "Programming & Scripting",
    icon: Code,
    skills: ["Python", "PowerShell", "Bash", "SQL"],
  },
  {
    title: "Methodologies & Frameworks",
    icon: Terminal,
    skills: [
      "PTES",
      "OWASP Top 10",
      "MITRE ATT&CK",
      "MSTG",
      "WSTG",
      "NIST",
      "ISO 27001",
      "CIS",
      "ITIL",
      "COBIT",
    ],
  },
  {
    title: "Cloud & Infrastructure",
    icon: Server,
    skills: ["AWS Security", "Docker", "VPN", "Firewalls", "Active Directory", "PostgreSQL"],
  },
  {
    title: "Languages",
    icon: Globe,
    skills: [
      "Portuguese (Native)",
      "English (Fluent)",
      "French (Advanced)",
      "German (Basic)",
    ],
  },
]

const certifications = [
  { 
    name: "OSCP+", 
    full: "OffSec Certified Professional Plus",
    badge: "/public/images/oscp-plus-badge.png"
  },
  { 
    name: "OSCP", 
    full: "OffSec Certified Professional",
    badge: "/public/images/oscp-badge.png"
  },
  { 
    name: "CEH", 
    full: "Certified Ethical Hacker",
    badge: null
  },
  { 
    name: "ITILv4", 
    full: "ITIL Foundation v4",
    badge: "/public/images/itil-badge.png"
  },
  { 
    name: "CISEF", 
    full: "Cyber & IT Security Foundation",
    badge: "/public/images/cisef-badge.png"
  },
  { 
    name: "CCNP", 
    full: "Cisco Certified Network Professional",
    badge: "/public/images/ccnp-badge.png"
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-12">
          <Terminal className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Skills & Certifications</h2>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Award className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Certifications</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="group relative flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/50 hover:bg-card/80 transition-all"
              >
                {cert.badge ? (
                  <div className="relative h-24 w-24 flex items-center justify-center">
                    <Image
                      src={withBasePath(cert.badge) || "/placeholder.svg"}
                      alt={`${cert.name} certification badge`}
                      width={96}
                      height={96}
                      className="object-contain drop-shadow-lg group-hover:scale-105 transition-transform"
                    />
                  </div>
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/30">
                    <span className="text-2xl font-bold text-primary font-mono">{cert.name}</span>
                  </div>
                )}
                <div className="text-center">
                  <p className="font-semibold text-foreground text-sm">{cert.name}</p>
                  <p className="text-xs text-muted-foreground leading-tight mt-1">{cert.full}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <Card key={category.title} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <category.icon className="h-5 w-5 text-primary" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-secondary text-secondary-foreground hover:bg-primary/20 hover:text-primary transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
