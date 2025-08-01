import { Link } from "react-router-dom";
import { Play, Download, Users, Zap, Shield, Gamepad2, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

export default function Index() {
  return (
    <Layout showSidebar={false}>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="section min-h-[80vh] flex items-center justify-center text-center" data-ui-section="hero">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <img 
                src="/assets/logo.png" 
                alt="UEC Launcher" 
                className="w-24 h-24 mx-auto mb-6"
                onError={(e) => {
                  // Fallback to styled div if image doesn't load
                  e.currentTarget.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'w-24 h-24 mx-auto mb-6 bg-white rounded-full flex items-center justify-center text-black text-3xl font-bold';
                  fallback.textContent = 'UEC';
                  e.currentTarget.parentElement!.appendChild(fallback);
                }}
              />
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                UEC Launcher
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
                The ultimate Eaglercraft HTML5 client launcher. Play, connect, and explore with friends in a seamless browser experience.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link 
                to="/auth/register" 
                className="button-primary px-8 py-4 text-lg font-semibold flex items-center gap-2 min-w-[200px] justify-center"
                data-cta="get-started"
              >
                <Play className="w-5 h-5" />
                Get Started
              </Link>
              <Link 
                to="/dashboard" 
                className="button-secondary px-8 py-4 text-lg font-semibold flex items-center gap-2 min-w-[200px] justify-center"
                data-cta="launch-now"
              >
                <Gamepad2 className="w-5 h-5" />
                Launch Now
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16" data-ui-section="stats">
              <div className="card text-center">
                <div className="text-3xl font-bold text-uec-accent mb-2">500+</div>
                <div className="text-gray-300">Active Players</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-uec-accent mb-2">15+</div>
                <div className="text-gray-300">Game Clients</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-uec-accent mb-2">99.9%</div>
                <div className="text-gray-300">Uptime</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section py-20 bg-black/30" data-ui-section="features">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose UEC?</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience Eaglercraft like never before with our comprehensive platform featuring social features, premium ranks, and seamless gameplay.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="card hover:scale-105 transition-transform duration-200" data-feature="instant-play">
                <div className="text-uec-accent mb-4">
                  <Play className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Instant Browser Play</h3>
                <p className="text-gray-300">
                  No downloads required. Launch any Eaglercraft client directly in your browser with one click.
                </p>
              </div>

              <div className="card hover:scale-105 transition-transform duration-200" data-feature="social">
                <div className="text-uec-accent mb-4">
                  <Users className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Social Features</h3>
                <p className="text-gray-300">
                  Chat with friends, make voice calls, join groups, and build your gaming community.
                </p>
              </div>

              <div className="card hover:scale-105 transition-transform duration-200" data-feature="performance">
                <div className="text-uec-accent mb-4">
                  <Zap className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-semibold mb-3">High Performance</h3>
                <p className="text-gray-300">
                  Optimized servers and CDN ensure smooth gameplay with minimal lag and maximum uptime.
                </p>
              </div>

              <div className="card hover:scale-105 transition-transform duration-200" data-feature="security">
                <div className="text-uec-accent mb-4">
                  <Shield className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Secure & Safe</h3>
                <p className="text-gray-300">
                  Advanced moderation tools and secure infrastructure keep your gaming experience safe.
                </p>
              </div>

              <div className="card hover:scale-105 transition-transform duration-200" data-feature="downloads">
                <div className="text-uec-accent mb-4">
                  <Download className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Client Downloads</h3>
                <p className="text-gray-300">
                  Access a library of downloadable clients for offline play and enhanced features.
                </p>
              </div>

              <div className="card hover:scale-105 transition-transform duration-200" data-feature="premium">
                <div className="text-uec-accent mb-4">
                  <ArrowRight className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Premium Ranks</h3>
                <p className="text-gray-300">
                  Unlock exclusive features and perks with VIP, VIP++, and Chatter ranks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section py-20 text-center" data-ui-section="cta">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Playing?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of players in the UEC community. Create your account today and start your Eaglercraft journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/auth/register" 
                className="button-primary px-8 py-4 text-lg font-semibold flex items-center gap-2"
                data-cta="register-bottom"
              >
                Create Account
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/about" 
                className="button-secondary px-8 py-4 text-lg font-semibold"
                data-cta="learn-more"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/50 border-t border-gray-800 py-12" data-ui-section="footer">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <img 
                    src="/assets/logo.png" 
                    alt="UEC Launcher" 
                    className="w-8 h-8"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span className="text-xl font-bold">UEC Launcher</span>
                </div>
                <p className="text-gray-400 text-sm">
                  The premier Eaglercraft client launcher platform.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Game</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link to="/dashboard" className="hover:text-white">Launcher</Link></li>
                  <li><Link to="/downloads" className="hover:text-white">Downloads</Link></li>
                  <li><Link to="/store" className="hover:text-white">Store</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Community</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link to="/forums" className="hover:text-white">Forums</Link></li>
                  <li><Link to="/news" className="hover:text-white">News</Link></li>
                  <li><Link to="/events" className="hover:text-white">Events</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link to="/support" className="hover:text-white">Help Center</Link></li>
                  <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
                  <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2024 UEC Launcher. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
}
