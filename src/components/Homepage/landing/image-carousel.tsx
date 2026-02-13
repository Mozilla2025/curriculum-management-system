'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useCarousel } from '@/hooks'
import { carouselImages } from '@/config/landing'

export function ImageCarousel() {
  const { 
    currentIndex, 
    progress, 
    goToSlide, 
    pause, 
    resume 
  } = useCarousel(carouselImages.length, 4000)

  const currentImage = carouselImages[currentIndex]

  return (
    <div 
      className={cn(
        'w-full h-[400px] md:h-[650px] lg:h-[740px]',
        'bg-gradient-to-br from-white/10 to-white/5',
        'rounded-2xl overflow-hidden shadow-strong backdrop-blur-xl',
        'border-2 border-white/30 relative',
        'transition-all duration-400 hover:scale-[1.02] hover:-translate-y-1',
        'group'
      )}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Gradient overlay */}
      <div className={cn(
        'absolute inset-0 z-10',
        'bg-gradient-to-br from-must-green/10 to-must-teal/10',
        'backdrop-blur-sm transition-all duration-400',
        'group-hover:from-must-green/5 group-hover:to-must-teal/5'
      )} />

      {/* Main Image */}
      <div className="relative w-full h-[80%] z-20">
        <Image
          src={currentImage.src}
          alt={currentImage.title}
          fill
          className="object-cover transition-opacity duration-300"
          priority
        />
      </div>

      {/* Controls */}
      <div className={cn(
        'absolute bottom-0 left-0 right-0 z-30',
        'bg-white/95 backdrop-blur-sm p-4',
        'rounded-b-2xl flex flex-col md:flex-row justify-between items-center gap-4'
      )}>
        {/* Progress bar */}
        <div 
          className="absolute bottom-0 left-0 h-0.5 bg-must-gold rounded-bl-2xl transition-all duration-100"
          style={{ width: `${progress}%` }}
        />

        {/* Image info */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">
            {currentImage.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {currentImage.description}
          </p>
        </div>

        {/* Navigation dots */}
        <div className="flex gap-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'w-3 h-3 rounded-full border-2 transition-all duration-300',
                index === currentIndex
                  ? 'bg-must-gold border-must-gold scale-125'
                  : 'bg-black/30 border-transparent hover:bg-must-green hover:scale-110'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Decorative element */}
      <div className={cn(
        'absolute -top-5 -right-5 w-24 h-24',
        'bg-gradient-gold rounded-full opacity-10',
        'animate-float-reverse z-0'
      )} />
    </div>
  )
}