import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Lock, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.usernameOrEmail) {
      newErrors.usernameOrEmail = "Username or email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const success = await login(formData.usernameOrEmail, formData.password);
      if (success) {
        navigate('/dashboard');
      } else {
        setErrors({
          usernameOrEmail: "Invalid username/email or password",
          password: "Invalid username/email or password"
        });
      }
    } catch (error) {
      setErrors({
        usernameOrEmail: "Login failed. Please try again.",
        password: "Login failed. Please try again."
      });
    }
  };

  return (
    <Layout showSidebar={false}>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <img 
              src="/assets/logo.png" 
              alt="UEC Launcher" 
              className="w-16 h-16 mx-auto mb-4"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center text-black text-xl font-bold';
                fallback.textContent = 'UEC';
                e.currentTarget.parentElement!.appendChild(fallback);
              }}
            />
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your UEC Launcher account</p>
          </div>

          {/* Login Form */}
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username/Email Field */}
              <div>
                <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-300 mb-2">
                  Username or Email
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="usernameOrEmail"
                    name="usernameOrEmail"
                    value={formData.usernameOrEmail}
                    onChange={handleInputChange}
                    className={`
                      w-full pl-12 pr-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
                      ${errors.usernameOrEmail ? 'border-red-500' : 'border-gray-700'}
                    `}
                    placeholder="Enter your username or email"
                    data-input="usernameOrEmail"
                  />
                </div>
                {errors.usernameOrEmail && (
                  <p className="text-red-400 text-sm mt-2">{errors.usernameOrEmail}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`
                      w-full pl-12 pr-12 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
                      ${errors.password ? 'border-red-500' : 'border-gray-700'}
                    `}
                    placeholder="Enter your password"
                    data-input="password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    data-action="toggle-password"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-2">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded bg-gray-800"
                    data-input="remember"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                <Link 
                  to="/auth/reset-password" 
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full button-primary py-3 text-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                data-action="login"
              >
                {loading ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">Don't have an account?</span>
              </div>
            </div>

            {/* Register Link */}
            <Link
              to="/auth/register"
              className="w-full button-secondary py-3 text-lg font-semibold flex items-center justify-center gap-2"
              data-action="register"
            >
              Create Account
            </Link>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-600/10 border border-blue-600/30 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">Demo Access</h3>
            <p className="text-xs text-gray-400 mb-2">For demonstration purposes:</p>
            <div className="text-xs text-gray-500 space-y-1">
              <div><strong>Admin Account:</strong></div>
              <div>Username: admin</div>
              <div>Password: admin123</div>
              <div className="mt-2"><strong>Regular User:</strong></div>
              <div>Username: steve_builder</div>
              <div>Password: demo123</div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link 
              to="/" 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
