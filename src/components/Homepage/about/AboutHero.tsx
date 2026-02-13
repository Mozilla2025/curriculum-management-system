import { Building } from 'lucide-react'
import { Badge } from '@/components/ui'

export function AboutHero() {
  return (
    <section className="bg-must-green py-24 md:py-32 text-center text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <Badge variant="outline" className="mb-8">
          <Building className="w-4 h-4" />
          About CurricFlow
        </Badge>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Revolutionizing Curriculum Management
        </h1>
        
        <p className="text-base md:text-lg max-w-3xl mx-auto opacity-95 leading-relaxed">
          Our comprehensive digital platform transforms how Meru University of Science & Technology 
          manages curriculum development, approval processes, and academic excellence through 
          innovative technology solutions.
        </p>
      </div>
    </section>
  )
}