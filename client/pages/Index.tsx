import { Link } from "react-router-dom";
import {
  Play,
  Download,
  Users,
  Zap,
  Shield,
  Gamepad2,
  ArrowRight,
  Globe,
  Star,
} from "lucide-react";
import Layout from "@/components/Layout";

export default function Index() {
  return (
    <Layout showSidebar={false}>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section
          className="section min-h-[90vh] flex items-center justify-center text-center"
          data-ui-section="hero"
        >
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <img
                src="/assets/logo.png"
                alt="UEC Launcher"
                className="w-32 h-32 mx-auto mb-8"
                onError={(e) => {
                  // Fallback to styled div if image doesn't load
                  e.currentTarget.style.display = "none";
                  const fallback = document.createElement("div");
                  fallback.className =
                    "w-32 h-32 mx-auto mb-8 bg-white rounded-full flex items-center justify-center text-black text-4xl font-bold border-4 border-gray-300";
                  fallback.textContent = "UEC";
                  e.currentTarget.parentElement!.appendChild(fallback);
                }}
              />
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                UEC Launcher
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                The premier platform for Eaglercraft HTML5 gaming. Join
                thousands of players in an immersive Minecraft experience, right
                in your browser.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link
                to="/auth/register"
                className="button-primary px-12 py-4 text-xl font-semibold flex items-center gap-3 min-w-[220px] justify-center hover:scale-105 transition-transform duration-200"
                data-cta="register"
              >
                <Play className="w-6 h-6" />
                Start Playing
              </Link>
              <Link
                to="/auth/login"
                className="button-secondary px-12 py-4 text-xl font-semibold flex items-center gap-3 min-w-[220px] justify-center hover:scale-105 transition-transform duration-200"
                data-cta="login"
              >
                <Users className="w-6 h-6" />
                Sign In
              </Link>
            </div>

            {/* Teaser Features */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
              data-ui-section="features-preview"
            >
              <div className="card text-center backdrop-blur-sm bg-gray-900/40 border-gray-700 hover:bg-gray-900/60 transition-all duration-300">
                <Globe className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Browser-Based</h3>
                <p className="text-gray-300">
                  Play instantly without downloads. Access your games from
                  anywhere.
                </p>
              </div>
              <div className="card text-center backdrop-blur-sm bg-gray-900/40 border-gray-700 hover:bg-gray-900/60 transition-all duration-300">
                <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Social Gaming</h3>
                <p className="text-gray-300">
                  Connect with friends, chat, and build together in multiplayer
                  worlds.
                </p>
              </div>
              <div className="card text-center backdrop-blur-sm bg-gray-900/40 border-gray-700 hover:bg-gray-900/60 transition-all duration-300">
                <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">High Performance</h3>
                <p className="text-gray-300">
                  Optimized servers ensure smooth gameplay with minimal lag.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose UEC Section */}
        <section
          className="section py-20 bg-black/50 backdrop-blur-sm"
          data-ui-section="why-choose"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose UEC Launcher?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Built by gamers, for gamers. Experience Eaglercraft like never
                before with our cutting-edge platform.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Instant Access
                    </h3>
                    <p className="text-gray-300">
                      Jump into any Eaglercraft client with a single click. No
                      complex setups or installations required.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Secure & Reliable
                    </h3>
                    <p className="text-gray-300">
                      Enterprise-grade security and 99.9% uptime ensure your
                      gaming experience is always protected.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Thriving Community
                    </h3>
                    <p className="text-gray-300">
                      Join thousands of active players, make friends, and
                      participate in community events.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 backdrop-blur-sm border-gray-700">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Ready to Get Started?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <span>Create your free account</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <span>Choose your preferred Eaglercraft client</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <span>Start building and exploring!</span>
                  </div>
                </div>
                <Link
                  to="/auth/register"
                  className="button-primary w-full mt-8 py-4 text-lg font-semibold flex items-center justify-center gap-2"
                  data-cta="register-box"
                >
                  Create Free Account
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="section py-16" data-ui-section="trust">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Trusted by the Community
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  5,000+
                </div>
                <div className="text-gray-400 text-sm">Registered Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  50,000+
                </div>
                <div className="text-gray-400 text-sm">Games Played</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  99.9%
                </div>
                <div className="text-gray-400 text-sm">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  24/7
                </div>
                <div className="text-gray-400 text-sm">Support</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
            <p className="text-gray-300 text-lg">
              "The best Eaglercraft platform I've ever used. Fast, reliable, and
              packed with features."
            </p>
            <p className="text-gray-500 text-sm mt-2">- Community Member</p>
          </div>
        </section>

        {/* Final CTA */}
        <section
          className="section py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20"
          data-ui-section="final-cta"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Adventure Awaits
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join UEC Launcher today and discover why we're the preferred
              choice for Eaglercraft enthusiasts worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/auth/register"
                className="button-primary px-10 py-4 text-lg font-semibold flex items-center gap-2 hover:scale-105 transition-transform duration-200"
                data-cta="register-final"
              >
                Get Started Free
                <Play className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="button-secondary px-10 py-4 text-lg font-semibold hover:scale-105 transition-transform duration-200"
                data-cta="learn-more"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="bg-black/80 border-t border-gray-800 py-12"
          data-ui-section="footer"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <img
                    src="/assets/logo.png"
                    alt="UEC Launcher"
                    className="w-8 h-8"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="text-xl font-bold">UEC Launcher</span>
                </div>
                <p className="text-gray-400 text-sm">
                  The premier Eaglercraft HTML5 gaming platform.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Platform</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <Link
                      to="/auth/register"
                      className="hover:text-white transition-colors"
                    >
                      Get Started
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/downloads"
                      className="hover:text-white transition-colors"
                    >
                      Downloads
                    </Link>
                  </li>
                  <li>
                    <span className="opacity-50">Game Clients</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Community</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <span className="opacity-50">Forums</span>
                  </li>
                  <li>
                    <span className="opacity-50">Discord</span>
                  </li>
                  <li>
                    <span className="opacity-50">Events</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <Link
                      to="/about"
                      className="hover:text-white transition-colors"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms"
                      className="hover:text-white transition-colors"
                    >
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy"
                      className="hover:text-white transition-colors"
                    >
                      Privacy
                    </Link>
                  </li>
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
