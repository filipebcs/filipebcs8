import { Briefcase, Calendar, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const experiences = [
  {
    title: "Offensive Cybersecurity Auditor (Pentester)",
    company: "Sicoob",
    location: "Distrito Federal, Brazil",
    period: "May 2022 - Present",
    description: [
      "Conducted intrusion tests on web applications, networks, and infrastructure using tools such as Gobuster, Feroxbuster, Nmap, Rustscan, Burpsuite Pro, identifying and mitigating over 30 vulnerabilities",
      "Utilized methodologies such as PTES, OWASP Top 10, MITRE ATT&CK, and MSTG for security assessments",
      "Analyzed corporate networks using SharpHound, BloodHound, Responder, and Impacket for infrastructure mapping and exploitation",
      "Created simulated phishing campaigns using GoPhish, measuring compromise rates and developing security awareness",
      "Evaluated cybersecurity in AWS, identifying insecure configurations and applying hardening best practices",
      "Developed scripts in Python and PowerShell for test automation, including Command and Control (C2) applications",
      "Produced pentest reports with proof-of-concepts and technical recommendations based on MITRE ATT&CK, PTES, NIST, CIS, and ISO27001",
    ],
  },
  {
    title: "Judicial Expert (Electrical Engineering)",
    company: "Court of Justice of the Federal District",
    location: "Brasilia, DF, Brazil",
    period: "November 2021 - Present",
    description: [
      "Appointed by the court to conduct technical evaluation of residential and commercial energy consumption in legal disputes",
      "Performed onsite inspections, analyzed historical consumption data, meter logs, and technical documentation",
      "Identified inconsistencies in billing and evaluated the application of energy tariffs",
      "Prepared comprehensive expert reports with technical findings, supporting legal proceedings with clear conclusions",
    ],
  },
  {
    title: "Network Analyst",
    company: "ATC Systems",
    location: "Rio de Janeiro, RJ, Brazil",
    period: "September 2019 - January 2022",
    description: [
      "Administered networks and databases for the Brazilian Air Force, working daily with TCP/IP, DNS, OSPF, SNMP protocols",
      "Configured firewall rules and VPNs for secure communications",
      "Managed VCX-IP system database with PostgreSQL for national air traffic management",
      "Configured and troubleshot Cisco routers, switches, Dell and HP servers",
      "Administered security policies in Cisco and Fujitsu firewalls",
    ],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-12">
          <Briefcase className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Professional Experience</h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 md:pl-24">
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <CardTitle className="text-xl text-foreground">{exp.title}</CardTitle>
                        <CardDescription className="text-primary font-medium mt-1">
                          {exp.company}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col md:items-end gap-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          <span className="text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
