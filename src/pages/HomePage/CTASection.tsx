
import React from 'react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="hero-glow w-[600px] h-[600px] top-[-100px] left-[-200px]"></div>
      
      <div className="container-custom relative z-10">
        <div className="bg-gradient-to-r from-ebonix-purple-dark to-ebonix-purple rounded-3xl overflow-hidden">
          <div className="px-6 py-16 md:p-16 relative">
            {/* Abstract shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-white/80 text-lg max-w-xl">
                  Join thousands of businesses that have already elevated their digital experience with our platform.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-ebonix-purple hover:bg-white/90 text-base px-8">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-base px-8">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
