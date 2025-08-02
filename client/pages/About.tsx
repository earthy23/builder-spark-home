import { Info, Users, Zap, Shield, Globe, Heart, Code, Gamepad2 } from "lucide-react";
import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-16 z-40 bg-black/90 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Info className="w-6 h-6 text-uec-accent" />
                  About UEC Launcher
                </h1>
                <p className="text-gray-400 text-sm">Learn about our platform and mission</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Premier <span className="text-uec-accent">Eaglercraft</span> Platform
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              UEC Launcher is a comprehensive HTML5 Minecraft gaming platform designed to provide 
              the best Eaglercraft experience with modern features, social connectivity, and 
              seamless gameplay.
            </p>
          </div>

          {/* Mission */}
          <div className="card mb-12">
            <div className="text-center">
              <Heart className="w-16 h-16 text-red-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                To create the most comprehensive, user-friendly, and feature-rich platform for 
                Eaglercraft gaming, fostering a vibrant community where players can connect, 
                compete, and create lasting memories.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="card text-center">
              <Gamepad2 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Multiple Clients</h3>
              <p className="text-gray-400">
                Access various Eaglercraft clients including 1.5.2, 1.8.8, and specialized versions 
                with OptiFine support.
              </p>
            </div>

            <div className="card text-center">
              <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Social Features</h3>
              <p className="text-gray-400">
                Connect with friends, chat in real-time, join groups, and participate in 
                community events and competitions.
              </p>
            </div>

            <div className="card text-center">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">High Performance</h3>
              <p className="text-gray-400">
                Optimized servers with 99.9% uptime, low latency, and smooth gameplay 
                experience across all devices.
              </p>
            </div>

            <div className="card text-center">
              <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Secure Platform</h3>
              <p className="text-gray-400">
                Enterprise-grade security with moderation tools, content filtering, 
                and user safety features.
              </p>
            </div>

            <div className="card text-center">
              <Globe className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Global Community</h3>
              <p className="text-gray-400">
                Join thousands of players worldwide in a diverse, inclusive gaming 
                community with 24/7 support.
              </p>
            </div>

            <div className="card text-center">
              <Code className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Modern Tech</h3>
              <p className="text-gray-400">
                Built with cutting-edge web technologies for a responsive, fast, 
                and reliable gaming experience.
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="card mb-12">
            <h3 className="text-2xl font-bold text-center mb-8">Platform Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">5,000+</div>
                <div className="text-gray-400">Registered Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">50,000+</div>
                <div className="text-gray-400">Games Played</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">99.9%</div>
                <div className="text-gray-400">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-gray-400">Support</div>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="card mb-12">
            <h3 className="text-2xl font-bold text-center mb-8">Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-blue-400">Innovation</h4>
                <p className="text-gray-400">
                  Continuously improving and adding new features to enhance the gaming experience.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-green-400">Community</h4>
                <p className="text-gray-400">
                  Building a welcoming, inclusive environment where all players feel at home.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-purple-400">Quality</h4>
                <p className="text-gray-400">
                  Maintaining high standards in performance, security, and user experience.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="card bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-600/30 text-center">
            <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
            <p className="text-gray-300 mb-6">
              Have questions, suggestions, or want to get involved? We'd love to hear from you!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="button-primary px-6 py-3">Contact Support</button>
              <button className="button-secondary px-6 py-3">Join Discord</button>
              <button className="button-secondary px-6 py-3">GitHub</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
