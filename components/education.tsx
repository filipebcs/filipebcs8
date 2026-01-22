import { GraduationCap, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const education = [
  {
    degree: "PhD Student in Electronic Systems and Automation Engineering",
    institution: "Universidade de Brasilia - UnB",
    location: "Distrito Federal, Brazil",
    period: "In Progress",
    description: "Pursuing advanced research in electronic systems and automation",
  },
  {
    degree: "Postgraduate Degree in Computer Forensics",
    institution: "Instituto de Graduacao e Pos-graduacao - IPOG",
    location: "Distrito Federal, Brazil",
    period: "Expected: September 2025",
    description: "Forensic analysis on storage devices, mobile devices, Linux, and Windows systems",
  },
  {
    degree: "Postgraduate Degree in Offensive Cybersecurity",
    institution: "Academia Inovadora de TI - ACADI-TI",
    location: "Sao Paulo, Brazil",
    period: "Expected: July 2025",
    description: "Performed over 12 pentest assessments on Active Directory, web, and network infrastructure",
  },
  {
    degree: "Postgraduate Degree in Networks and Telecommunications (CCNP)",
    institution: "Instituto de Estudos e Formacao Especializada",
    location: "Distrito Federal, Brazil",
    period: "May 2022 - May 2023",
    description: "Advanced networking concepts and Cisco professional certification track",
  },
  {
    degree: "Master's Degree in Electronic Systems and Automation Engineering",
    institution: "Universidade de Brasilia - UnB",
    location: "Distrito Federal, Brazil",
    period: "Graduated: December 2018",
    description: "Developed Python algorithms for data processing in antenna arrays",
  },
  {
    degree: "Bachelor's Degree in Electrical Engineering",
    institution: "Universidade de Brasilia - UnB",
    location: "Distrito Federal, Brazil",
    period: "Graduated: July 2016",
    description: "Developed Python algorithms to increase efficiency in H.265/HEVC video compressors",
  },
]

export function Education() {
  return (
    <section id="education" className="py-24 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-12">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Education</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">{edu.degree}</CardTitle>
                <CardDescription className="text-primary font-medium">
                  {edu.institution}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4" />
                  {edu.period}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {edu.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
