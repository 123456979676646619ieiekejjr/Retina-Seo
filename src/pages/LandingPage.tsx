import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Youtube, 
  LineChart, 
  Search, 
  Tags, 
  FileText, 
  Rocket,
  Check,
  Eye
} from 'lucide-react';
import { Button } from '../components/ui/Button';

const LandingPage = () => {
  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="text-primary-600 dark:text-primary-400">Boost Your YouTube</span> Rankings with AI-Powered SEO
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Generate SEO-optimized titles, descriptions, and tags that help your videos rank higher and attract more viewers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="px-8">
                Get Started For Free
              </Button>
            </Link>
            <Link to="#how-it-works">
              <Button size="lg" variant="outline">
                See How It Works
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 max-w-5xl mx-auto bg-white dark:bg-dark-200 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-dark-300"
        >
          <div className="relative">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium flex items-center">
              <Sparkles size={16} className="mr-2" />
              AI-Powered YouTube SEO Tool
            </div>
            <img 
              src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Retina SEO Dashboard" 
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features for YouTube Creators
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to optimize your YouTube content and grow your channel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-8 w-8 text-primary-600" />,
                title: 'SEO-Optimized Titles',
                description: 'Generate attention-grabbing titles with perfect keyword placement to boost your rankings.'
              },
              {
                icon: <FileText className="h-8 w-8 text-primary-600" />,
                title: 'Detailed Descriptions',
                description: 'Create compelling 300-word descriptions with strategic keyword placement for maximum SEO impact.'
              },
              {
                icon: <Tags className="h-8 w-8 text-primary-600" />,
                title: 'Trending Tags Generator',
                description: 'Generate 15-20 highly relevant tags that help your videos get discovered by the right audience.'
              },
              {
                icon: <Youtube className="h-8 w-8 text-primary-600" />,
                title: 'YouTube Algorithm Expertise',
                description: 'Our AI is trained on what works for top creators and updated with YouTube\'s latest algorithm changes.'
              },
              {
                icon: <LineChart className="h-8 w-8 text-primary-600" />,
                title: 'Performance Analytics',
                description: 'Track your content performance and see improvements in rankings over time.'
              },
              {
                icon: <Rocket className="h-8 w-8 text-primary-600" />,
                title: 'One-Click Export',
                description: 'Export your optimized content in multiple formats ready to use directly on YouTube.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-dark-200 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-dark-300 hover:shadow-md transition-shadow"
              >
                <div className="rounded-full bg-primary-50 dark:bg-primary-900/20 p-3 w-14 h-14 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50 dark:bg-dark-300/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How Retina SEO Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get optimized YouTube content in just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Enter Your Topic',
                description: 'Simply enter your video topic or concept into our AI generator.'
              },
              {
                step: '02',
                title: 'Generate Content',
                description: 'Our AI instantly creates SEO-optimized titles, descriptions, and tags.'
              },
              {
                step: '03',
                title: 'Copy & Publish',
                description: 'Copy the results directly to YouTube or export them for later use.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white dark:bg-dark-200 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-dark-300 h-full">
                  <div className="absolute -top-4 left-8 bg-primary-600 text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-primary-300 dark:text-primary-800">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the plan that's right for your channel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Basic',
                price: '$9.99',
                period: 'per month',
                description: 'Perfect for new YouTube creators',
                features: [
                  '50 SEO generations per month',
                  'Title optimization',
                  'Description generation',
                  'Tag suggestions',
                  'Basic analytics',
                  'Email support'
                ],
                cta: 'Get Started',
                popular: false
              },
              {
                name: 'Pro',
                price: '$19.99',
                period: 'per month',
                description: 'Ideal for growing channels',
                features: [
                  '200 SEO generations per month',
                  'Advanced title optimization',
                  'Keyword-rich descriptions',
                  'Trending tag analysis',
                  'Performance tracking',
                  'Priority support',
                  'Content export (CSV, PDF)'
                ],
                cta: 'Get Started',
                popular: true
              },
              {
                name: 'Enterprise',
                price: '$49.99',
                period: 'per month',
                description: 'For professional content creators',
                features: [
                  'Unlimited SEO generations',
                  'Premium title variations',
                  'Advanced descriptions with CTA',
                  'Competitor tag analysis',
                  'Advanced analytics dashboard',
                  'Dedicated account manager',
                  'API access',
                  'Team collaboration'
                ],
                cta: 'Contact Sales',
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white dark:bg-dark-200 rounded-lg shadow-sm border ${
                  plan.popular
                    ? 'border-primary-500 shadow-md'
                    : 'border-gray-200 dark:border-dark-300'
                } overflow-hidden`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {plan.description}
                  </p>
                  <Button 
                    variant={plan.popular ? 'default' : 'outline'} 
                    fullWidth={true}
                    className="mb-6"
                  >
                    {plan.cta}
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check size={18} className="text-success-500 mr-2 mt-0.5 shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 dark:bg-primary-900">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Boost Your YouTube Rankings?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of content creators already using Retina SEO to grow their channels
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 px-8">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-dark-200 py-12 border-t border-gray-200 dark:border-dark-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Product
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">Features</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">Pricing</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">Testimonials</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">About</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">Blog</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">Careers</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Resources
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">Documentation</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">Guides</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">API</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">YouTube Tips</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-300 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <div className="flex items-center justify-center bg-primary-600 rounded-md h-8 w-8 mr-2">
                <Eye className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-primary-600 dark:text-primary-400">Retina SEO</span>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                © {new Date().getFullYear()} Retina SEO. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;