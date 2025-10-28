import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Users } from 'lucide-react';
import { Hero } from '../components/layout/Hero';

const features = [
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with reliable ticket tracking and data protection.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Quick response times and smooth performance for efficient support management.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Seamless collaboration between team members with real-time updates.',
  },
];

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-bg-primary">
  <div className="container">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
            >
              Why Choose TicketFlow?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-text-secondary max-w-2xl mx-auto"
            >
              Built with modern technology and user experience in mind, 
              TicketFlow helps teams deliver exceptional support.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-bg-card rounded-xl p-6 shadow-md border border-color-border hover:shadow-lg transition-all duration-200"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bg-card">
  <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Ready to Streamline Your Support?
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              Join thousands of teams using TicketFlow to manage their support tickets efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/auth/signup"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-md bg-accent text-white hover:bg-accent-dark shadow-md hover:shadow-lg transition-all duration-200"
              >
                Get Started Free
              </motion.a>
              <motion.a
                href="/auth/login"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-md border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-200"
              >
                Login to Dashboard
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};