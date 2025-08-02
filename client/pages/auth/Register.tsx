import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, UserCheck } from "lucide-react";
import Layout from "@/components/Layout";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
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
    
    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the Terms of Service";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate successful registration
    navigate('/dashboard');
  };

  return (
    <Layout showSidebar={false}>
      <div className="min-h-screen flex items-center justify-center py-12">
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
            <h1 className="text-3xl font-bold mb-2">Join UEC Launcher</h1>
            <p className="text-gray-400">Create your account and start playing today</p>
          </div>

          {/* Register Form */}
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`
                      w-full pl-12 pr-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
                      ${errors.username ? 'border-red-500' : 'border-gray-700'}
                    `}
                    placeholder="Choose a username"
                    data-input="username"
                  />
                </div>
                {errors.username && (
                  <p className="text-red-400 text-sm mt-2">{errors.username}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`
                      w-full pl-12 pr-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
                      ${errors.email ? 'border-red-500' : 'border-gray-700'}
                    `}
                    placeholder="Enter your email"
                    data-input="email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-2">{errors.email}</p>
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
                    placeholder="Create a strong password"
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

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`
                      w-full pl-12 pr-12 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
                      ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'}
                    `}
                    placeholder="Confirm your password"
                    data-input="confirmPassword"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    data-action="toggle-confirm-password"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-2">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms Agreement */}
              <div>
                <div className="flex items-start">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded bg-gray-800 mt-1"
                    data-input="terms"
                  />
                  <label htmlFor="terms" className="ml-3 block text-sm text-gray-300">
                    I agree to the{" "}
                    <Link to="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-red-400 text-sm mt-2">{errors.terms}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full button-primary py-3 text-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                data-action="register"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserCheck className="w-5 h-5" />
                    Create Account
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
                <span className="px-2 bg-gray-900 text-gray-400">Already have an account?</span>
              </div>
            </div>

            {/* Login Link */}
            <Link
              to="/auth/login"
              className="w-full button-secondary py-3 text-lg font-semibold flex items-center justify-center gap-2"
              data-action="login"
            >
              Sign In Instead
              <ArrowRight className="w-5 h-5" />
            </Link>
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
