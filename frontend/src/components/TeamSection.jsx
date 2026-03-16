// --- FILE: src/components/TeamSection.jsx ---
import { useState } from 'react'
import { Github, Twitter, Linkedin, Mail, MapPin, Award, BookOpen, Heart } from 'lucide-react'

export function TeamSection() {
  const [activeMember, setActiveMember] = useState(null)

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Mwangi",
      role: "CEO & Founder",
      bio: "Passionate about sustainable agriculture and technology integration. Sarah leads TELAX's vision with 10+ years in agricultural tech and community development.",
      image: "/api/placeholder/300/300",
      expertise: ["Strategic Leadership", "Agricultural Innovation", "Community Building"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@telax.com"
      },
      location: "Nairobi, Kenya"
    },
    {
      id: 2,
      name: "David Kimani",
      role: "CTO & Lead Developer",
      bio: "Full-stack architect with expertise in scalable web applications and agricultural data systems. David ensures TELAX's technology serves farmers effectively.",
      image: "/api/placeholder/300/300",
      expertise: ["Web Development", "System Architecture", "Data Analytics"],
      social: {
        linkedin: "#",
        github: "#",
        email: "david@telax.com"
      },
      location: "Nairobi, Kenya"
    },
    {
      id: 3,
      name: "Grace Wanjiru",
      role: "Head of Community Engagement",
      bio: "Dedicated to connecting farmers with markets and educational resources. Grace manages partnerships and community outreach programs.",
      image: "/api/placeholder/300/300",
      expertise: ["Community Development", "Partnership Management", "Farmer Training"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "grace@telax.com"
      },
      location: "Kiambu, Kenya"
    },
    {
      id: 4,
      name: "Michael Ochieng",
      role: "Agricultural Specialist",
      bio: "Expert in sustainable farming practices and urban agriculture. Michael provides technical guidance and training for partner farmers.",
      image: "/api/placeholder/300/300",
      expertise: ["Sustainable Farming", "Urban Agriculture", "Training Programs"],
      social: {
        linkedin: "#",
        email: "michael@telax.com"
      },
      location: "Nakuru, Kenya"
    },
    {
      id: 5,
      name: "Amina Hassan",
      role: "Operations Manager",
      bio: "Ensures smooth day-to-day operations and logistics coordination. Amina manages supply chain optimization and delivery systems.",
      image: "/api/placeholder/300/300",
      expertise: ["Operations Management", "Logistics", "Quality Control"],
      social: {
        linkedin: "#",
        email: "amina@telax.com"
      },
      location: "Mombasa, Kenya"
    },
    {
      id: 6,
      name: "James Kariuki",
      role: "Marketing & Communications",
      bio: "Creative storyteller focused on promoting sustainable agriculture and connecting communities. James leads our digital presence and outreach campaigns.",
      image: "/api/placeholder/300/300",
      expertise: ["Digital Marketing", "Content Strategy", "Brand Development"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "james@telax.com"
      },
      location: "Nairobi, Kenya"
    }
  ]

  return (
    <div className="py-16 px-6 bg-gradient-to-b from-transparent to-forest-50/30 dark:to-forest-900/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-forest-900 dark:text-forest-100 mb-4">
            Meet the Urban Crew
          </h2>
          <p className="text-xl text-forest-600 dark:text-forest-300 max-w-3xl mx-auto">
            The passionate team behind TELAX, dedicated to transforming urban agriculture and building sustainable food systems.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="glass-card p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => setActiveMember(activeMember?.id === member.id ? null : member)}
            >
              {/* Profile Image */}
              <div className="relative mb-4">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-forest-200 to-terracotta-200 dark:from-forest-700 dark:to-terracotta-700">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 w-8 h-8 bg-forest-600 dark:bg-forest-400 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Member Info */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-forest-900 dark:text-forest-100 mb-1">
                  {member.name}
                </h3>
                <p className="text-forest-600 dark:text-forest-300 font-medium mb-3">
                  {member.role}
                </p>
                
                {/* Bio */}
                <p className="text-sm text-forest-600 dark:text-forest-300 mb-4 line-clamp-3">
                  {member.bio}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {member.expertise.slice(0, 2).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-forest-100 dark:bg-forest-800 text-forest-700 dark:text-forest-300 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.expertise.length > 2 && (
                    <span className="px-2 py-1 bg-forest-100 dark:bg-forest-800 text-forest-700 dark:text-forest-300 text-xs rounded-full">
                      +{member.expertise.length - 2} more
                    </span>
                  )}
                </div>

                {/* Location */}
                <div className="flex items-center justify-center text-sm text-forest-500 dark:text-forest-400 mb-4">
                  <MapPin className="w-3 h-3 mr-1" />
                  {member.location}
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-3">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="p-2 text-forest-600 hover:text-forest-700 dark:text-forest-400 dark:hover:text-forest-300 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      className="p-2 text-forest-600 hover:text-forest-700 dark:text-forest-400 dark:hover:text-forest-300 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      className="p-2 text-forest-600 hover:text-forest-700 dark:text-forest-400 dark:hover:text-forest-300 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  <a
                    href={`mailto:${member.social.email}`}
                    className="p-2 text-forest-600 hover:text-forest-700 dark:text-forest-400 dark:hover:text-forest-300 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded Member Detail */}
        {activeMember && (
          <div className="glass-card p-8 mb-16 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Section */}
              <div className="text-center lg:text-left">
                <div className="w-40 h-40 mx-auto lg:mx-0 rounded-full overflow-hidden bg-gradient-to-br from-forest-200 to-terracotta-200 dark:from-forest-700 dark:to-terracotta-700 mb-4">
                  <img
                    src={activeMember.image}
                    alt={activeMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100 mb-2">
                  {activeMember.name}
                </h3>
                <p className="text-forest-600 dark:text-forest-300 font-medium mb-4">
                  {activeMember.role}
                </p>
                <div className="flex items-center justify-center lg:justify-start text-sm text-forest-500 dark:text-forest-400 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  {activeMember.location}
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  {activeMember.social.linkedin && (
                    <a href={activeMember.social.linkedin} className="p-2 text-forest-600 hover:text-forest-700 dark:text-forest-400 dark:hover:text-forest-300 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {activeMember.social.twitter && (
                    <a href={activeMember.social.twitter} className="p-2 text-forest-600 hover:text-forest-700 dark:text-forest-400 dark:hover:text-forest-300 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {activeMember.social.github && (
                    <a href={activeMember.social.github} className="p-2 text-forest-600 hover:text-forest-700 dark:text-forest-400 dark:hover:text-forest-300 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  <a href={`mailto:${activeMember.social.email}`} className="p-2 text-forest-600 hover:text-forest-700 dark:text-forest-400 dark:hover:text-forest-300 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Bio & Expertise */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-forest-900 dark:text-forest-100 mb-3 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-forest-600 dark:text-forest-400" />
                    About
                  </h4>
                  <p className="text-forest-600 dark:text-forest-300 leading-relaxed">
                    {activeMember.bio}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-forest-900 dark:text-forest-100 mb-3 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-forest-600 dark:text-forest-400" />
                    Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeMember.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-forest-100 dark:bg-forest-800 text-forest-700 dark:text-forest-300 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setActiveMember(null)}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                  <a
                    href={`mailto:${activeMember.social.email}`}
                    className="btn-primary"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-forest-900 dark:text-forest-100 mb-4">
              Join Our Team
            </h3>
            <p className="text-forest-600 dark:text-forest-300 mb-6">
              We're always looking for passionate individuals who want to make a difference in urban agriculture.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:careers@telax.com" className="btn-primary">
                <Mail className="w-5 h-5 mr-2" />
                Explore Opportunities
              </a>
              <a href="/about" className="btn-accent">
                Learn More About TELAX
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
