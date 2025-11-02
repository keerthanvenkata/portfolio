import { Github, Linkedin, Mail, ExternalLink, MapPin, Calendar, MessageCircle } from 'lucide-react'
import { useEffect } from 'react'

export default function ContactPage() {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    // Load Calendly CSS
    const link = document.createElement('link')
    link.href = 'https://assets.calendly.com/assets/external/widget.css'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    // Initialize Calendly widget after script loads
    script.onload = () => {
      if ((window as any).Calendly && (window as any).Calendly.initInlineWidget) {
        const calendlyDiv = document.querySelector('.calendly-inline-widget') as HTMLElement
        if (calendlyDiv) {
          (window as any).Calendly.initInlineWidget({
            url: 'https://calendly.com/keerthanvenkata/30min',
            parentElement: calendlyDiv
          })
        }
      }
    }

    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Let's Connect</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          I'm always interested in discussing new opportunities, collaborations, or just connecting with fellow developers and entrepreneurs.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Contact Methods */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
          
          <a href="mailto:keerthanvenkata@gmail.com" 
             className="flex items-center gap-4 glass hover:border-electric-pink p-6 rounded-xl transition-all duration-300 group">
            <div className="bg-gradient-to-r from-violet to-magenta p-3 rounded-lg group-hover:scale-110 transition-transform">
              <Mail className="text-white" size={24} />
            </div>
            <div>
              <div className="text-white font-semibold text-lg">Email</div>
              <div className="text-gray-400">keerthanvenkata@gmail.com</div>
              <div className="text-sm text-electric-pink mt-1">Primary contact method</div>
            </div>
          </a>
          
          <a href="https://www.linkedin.com/in/venkata-keerthan/" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-4 glass hover:border-electric-pink p-6 rounded-xl transition-all duration-300 group">
            <div className="bg-gradient-to-r from-violet to-magenta p-3 rounded-lg group-hover:scale-110 transition-transform">
              <Linkedin className="text-white" size={24} />
            </div>
            <div>
              <div className="text-white font-semibold text-lg">LinkedIn</div>
              <div className="text-gray-400">linkedin.com/in/venkata-keerthan</div>
              <div className="text-sm text-electric-pink mt-1">Professional networking</div>
            </div>
          </a>
          
          <a href="https://github.com/keerthanvenkata" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-4 glass hover:border-electric-pink p-6 rounded-xl transition-all duration-300 group">
            <div className="bg-gradient-to-r from-violet to-magenta p-3 rounded-lg group-hover:scale-110 transition-transform">
              <Github className="text-white" size={24} />
            </div>
            <div>
              <div className="text-white font-semibold text-lg">GitHub</div>
              <div className="text-gray-400">github.com/keerthanvenkata</div>
              <div className="text-sm text-electric-pink mt-1">Code & projects</div>
            </div>
          </a>
        </div>

        {/* Quick Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Info</h2>
          
          <div className="glass p-6 rounded-xl neon-border">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="text-violet" size={20} />
              <span className="text-white font-semibold">Location</span>
            </div>
            <p className="text-gray-300">Hyderabad, India</p>
            <p className="text-sm text-gray-400 mt-1">Open to remote opportunities</p>
          </div>

          <div className="glass p-6 rounded-xl neon-border">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="text-electric-pink" size={20} />
              <span className="text-white font-semibold">Availability</span>
            </div>
            <p className="text-gray-300">Open to new opportunities</p>
            <p className="text-sm text-gray-400 mt-1">Ready for collaboration</p>
          </div>

          <div className="glass p-6 rounded-xl neon-border">
            <div className="flex items-center gap-3 mb-3">
              <MessageCircle className="text-magenta" size={20} />
              <span className="text-white font-semibold">Response Time</span>
            </div>
            <p className="text-gray-300">Usually within 24 hours</p>
            <p className="text-sm text-gray-400 mt-1">I check email regularly</p>
          </div>
        </div>
      </div>

      {/* Calendly Integration */}
      <div className="glass rounded-xl p-6 neon-border mb-12">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-heading font-bold gradient-text-purple mb-4">Schedule a Meeting</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Book a time slot that works for you. Let's discuss opportunities, collaborations, or just have a chat!
          </p>
        </div>
        <div 
          className="calendly-inline-widget" 
          data-url="https://calendly.com/keerthanvenkata/30min"
          style={{ minWidth: '320px', height: '700px' }}
        />
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-violet/20 to-magenta/20 p-8 rounded-xl border border-violet/30 text-center">
        <h3 className="text-2xl font-heading font-bold text-white mb-4">Ready to work together?</h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Whether you have a project in mind, want to discuss opportunities, or just want to chat about technology and entrepreneurship, I'd love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:keerthanvenkata@gmail.com" 
             className="inline-flex items-center gap-2 bg-gradient-to-r from-violet to-magenta hover:from-electric-pink hover:to-magenta text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(127,0,255,0.5)] transform hover:scale-105 font-semibold">
            <Mail size={20} />
            Send Email
          </a>
          <a href="/resume" 
             className="inline-flex items-center gap-2 border-2 border-electric-pink hover:bg-electric-pink hover:text-black text-electric-pink px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,0,128,0.5)] transform hover:scale-105 font-semibold">
            <ExternalLink size={20} />
            View Resume
          </a>
        </div>
      </div>
    </div>
  )
}
