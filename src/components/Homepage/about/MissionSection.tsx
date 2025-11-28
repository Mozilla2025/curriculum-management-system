import { Target } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MissionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              To provide Meru University of Science & Technology with a cutting-edge curriculum 
              tracking system that streamlines academic processes, enhances transparency, and 
              ensures compliance with educational standards.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We believe that efficient curriculum management is fundamental to academic excellence. 
              Our system eliminates bureaucratic bottlenecks, reduces processing time, and provides 
              real-time visibility into the approval workflow.
            </p>
          </div>
          
          <div className={cn(
            'bg-gradient-green rounded-2xl p-10 text-white text-center',
            'relative overflow-hidden shadow-strong',
            'before:absolute before:-top-1/2 before:-left-1/2 before:w-[200%] before:h-[200%]',
            'before:bg-gradient-to-tr before:from-transparent before:via-white/10 before:to-transparent',
            'before:animate-shimmer'
          )}>
            <div className={cn(
              'w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center',
              'mx-auto mb-6 backdrop-blur-sm'
            )}>
              <Target className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Excellence in Education</h3>
            <p className="opacity-95">
              Empowering academic institutions with tools that foster innovation, 
              collaboration, and continuous improvement in curriculum development.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}