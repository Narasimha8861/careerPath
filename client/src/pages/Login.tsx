import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const { login, register, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        await login(formData.username, formData.password);
        toast({
          title: "Login successful",
          description: "Welcome back to CareerAI!",
        });
      } else {
        await register(formData.username, formData.email, formData.password);
        toast({
          title: "Registration successful",
          description: "Your account has been created!",
        });
      }
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">{isLogin ? 'Sign In' : 'Create Account'}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {isLogin 
            ? 'Sign in to your account to continue' 
            : 'Create a new account to get started'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        
        {!isLogin && (
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required={!isLogin}
            />
          </div>
        )}
        
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 text-white"
          disabled={loading}
        >
          {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
        </Button>
      </form>
      
      <div className="text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-primary hover:underline text-sm"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
};

export default Login;