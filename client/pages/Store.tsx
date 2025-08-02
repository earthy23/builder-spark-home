import { Crown, Star, Zap, Shield, Gift } from "lucide-react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";

export default function Store() {
  const { user, isAuthenticated } = useAuth();

  const packages = [
    {
      id: "vip",
      name: "VIP",
      price: "$4.99",
      period: "/month",
      features: [
        "Priority server access",
        "VIP chat badge",
        "Access to VIP-only servers",
        "Custom game settings",
        "2x XP boost",
      ],
      color: "yellow",
      icon: Star,
    },
    {
      id: "vip_plus",
      name: "VIP+",
      price: "$9.99",
      period: "/month",
      features: [
        "All VIP features",
        "VIP+ exclusive servers",
        "Custom username colors",
        "Priority support",
        "5x XP boost",
        "Exclusive cosmetics",
      ],
      color: "purple",
      icon: Crown,
      popular: true,
    },
    {
      id: "boost",
      name: "Server Boost",
      price: "$2.99",
      period: "/week",
      features: [
        "Boost server performance",
        "Increased player slots",
        "Enhanced features",
        "Community recognition",
      ],
      color: "blue",
      icon: Zap,
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-16 z-40 bg-black/90 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Gift className="w-6 h-6 text-uec-accent" />
                  UEC Store
                </h1>
                <p className="text-gray-400 text-sm">
                  Premium packages and server boosts
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Current Status */}
          {isAuthenticated && (
            <div className="card mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold mb-2">
                    Your Current Status
                  </h2>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-400 font-medium capitalize">
                      {user?.role}
                    </span>
                    {user?.role === "member" && (
                      <span className="text-gray-400">
                        • Consider upgrading for exclusive features!
                      </span>
                    )}
                  </div>
                </div>
                {user?.role !== "member" && (
                  <div className="text-green-400 font-medium">
                    ✓ Premium Active
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`
                  card relative overflow-hidden transition-all duration-300 hover:scale-105
                  ${pkg.popular ? "border-purple-500/50 shadow-purple-500/20 shadow-lg" : ""}
                `}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className={`text-center ${pkg.popular ? "pt-8" : ""}`}>
                  <div
                    className={`
                    w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center
                    ${pkg.color === "yellow" ? "bg-yellow-400/20 text-yellow-400" : ""}
                    ${pkg.color === "purple" ? "bg-purple-400/20 text-purple-400" : ""}
                    ${pkg.color === "blue" ? "bg-blue-400/20 text-blue-400" : ""}
                  `}
                  >
                    <pkg.icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{pkg.price}</span>
                    <span className="text-gray-400">{pkg.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8 text-left">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div
                          className={`
                          w-2 h-2 rounded-full
                          ${pkg.color === "yellow" ? "bg-yellow-400" : ""}
                          ${pkg.color === "purple" ? "bg-purple-400" : ""}
                          ${pkg.color === "blue" ? "bg-blue-400" : ""}
                        `}
                        ></div>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`
                      w-full py-3 rounded-lg font-semibold transition-colors
                      ${
                        pkg.popular
                          ? "bg-purple-600 hover:bg-purple-700 text-white"
                          : "button-primary"
                      }
                    `}
                    disabled={!isAuthenticated}
                  >
                    {isAuthenticated ? "Purchase" : "Login to Purchase"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Features Comparison */}
          <div className="card">
            <h2 className="text-xl font-bold mb-6 text-center">
              Feature Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4">Feature</th>
                    <th className="text-center py-3 px-4">Member</th>
                    <th className="text-center py-3 px-4">VIP</th>
                    <th className="text-center py-3 px-4">VIP+</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {[
                    {
                      feature: "Basic Server Access",
                      member: "✓",
                      vip: "✓",
                      vipPlus: "✓",
                    },
                    {
                      feature: "Priority Queue",
                      member: "✗",
                      vip: "✓",
                      vipPlus: "✓",
                    },
                    {
                      feature: "Custom Colors",
                      member: "✗",
                      vip: "✗",
                      vipPlus: "✓",
                    },
                    {
                      feature: "Exclusive Servers",
                      member: "✗",
                      vip: "✓",
                      vipPlus: "✓",
                    },
                    {
                      feature: "Priority Support",
                      member: "✗",
                      vip: "✗",
                      vipPlus: "✓",
                    },
                    {
                      feature: "XP Multiplier",
                      member: "1x",
                      vip: "2x",
                      vipPlus: "5x",
                    },
                  ].map((row, index) => (
                    <tr key={index}>
                      <td className="py-3 px-4 font-medium">{row.feature}</td>
                      <td className="py-3 px-4 text-center">{row.member}</td>
                      <td className="py-3 px-4 text-center text-yellow-400">
                        {row.vip}
                      </td>
                      <td className="py-3 px-4 text-center text-purple-400">
                        {row.vipPlus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {!isAuthenticated && (
            <div className="card bg-blue-600/10 border-blue-600/30 text-center mt-8">
              <h3 className="text-lg font-semibold mb-2">Ready to Upgrade?</h3>
              <p className="text-gray-300 mb-4">
                Create an account or log in to purchase premium packages
              </p>
              <div className="flex gap-4 justify-center">
                <button className="button-secondary px-6 py-3">Login</button>
                <button className="button-primary px-6 py-3">Register</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
