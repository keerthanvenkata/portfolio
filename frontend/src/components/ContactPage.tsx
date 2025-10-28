import { Github, Linkedin, Mail, ExternalLink, MapPin, Calendar, MessageCircle } from 'lucide-react'

export default function ContactPage() {
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
             className="flex items-center gap-4 bg-gray-800 hover:bg-gray-700 p-6 rounded-xl border border-gray-700 transition-all duration-200 group">
            <div className="bg-cyan-600 p-3 rounded-lg group-hover:bg-cyan-500 transition-colors">
              <Mail className="text-white" size={24} />
            </div>
            <div>
              <div className="text-white font-semibold text-lg">Email</div>
              <div className="text-gray-400">keerthanvenkata@gmail.com</div>
              <div className="text-sm text-cyan-400 mt-1">Primary contact method</div>
            </div>
          </a>
          
          <a href="https://www.linkedin.com/in/venkata-keerthan/" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-4 bg-gray-800 hover:bg-gray-700 p-6 rounded-xl border border-gray-700 transition-all duration-200 group">
            <div className="bg-blue-600 p-3 rounded-lg group-hover:bg-blue-500 transition-colors">
              <Linkedin className="text-white" size={24} />
            </div>
            <div>
              <div className="text-white font-semibold text-lg">LinkedIn</div>
              <div className="text-gray-400">linkedin.com/in/venkata-keerthan</div>
              <div className="text-sm text-cyan-400 mt-1">Professional networking</div>
            </div>
          </a>
          
          <a href="https://github.com/keerthanvenkata" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-4 bg-gray-800 hover:bg-gray-700 p-6 rounded-xl border border-gray-700 transition-all duration-200 group">
            <div className="bg-gray-700 p-3 rounded-lg group-hover:bg-gray-600 transition-colors">
              <Github className="text-white" size={24} />
            </div>
            <div>
              <div className="text-white font-semibold text-lg">GitHub</div>
              <div className="text-gray-400">github.com/keerthanvenkata</div>
              <div className="text-sm text-cyan-400 mt-1">Code & projects</div>
            </div>
          </a>
        </div>

        {/* Quick Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Info</h2>
          
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 p-6 rounded-xl border border-cyan-500/30">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="text-cyan-400" size={20} />
              <span className="text-white font-semibold">Location</span>
            </div>
            <p className="text-gray-300">Hyderabad, India</p>
            <p className="text-sm text-gray-400 mt-1">Open to remote opportunities</p>
          </div>

          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-6 rounded-xl border border-green-500/30">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="text-green-400" size={20} />
              <span className="text-white font-semibold">Availability</span>
            </div>
            <p className="text-gray-300">Open to new opportunities</p>
            <p className="text-sm text-gray-400 mt-1">Ready for collaboration</p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-xl border border-purple-500/30">
            <div className="flex items-center gap-3 mb-3">
              <MessageCircle className="text-purple-400" size={20} />
              <span className="text-white font-semibold">Response Time</span>
            </div>
            <p className="text-gray-300">Usually within 24 hours</p>
            <p className="text-sm text-gray-400 mt-1">I check email regularly</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 p-8 rounded-xl border border-cyan-500/30 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Ready to work together?</h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Whether you have a project in mind, want to discuss opportunities, or just want to chat about technology and entrepreneurship, I'd love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:keerthanvenkata@gmail.com" 
             className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold">
            <Mail size={20} />
            Send Email
          </a>
          <a href="/resume" 
             className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors font-semibold">
            <ExternalLink size={20} />
            View Resume
          </a>
        </div>
      </div>
    </div>
  )
}
