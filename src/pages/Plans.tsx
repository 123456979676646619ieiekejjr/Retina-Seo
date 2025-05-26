import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, CreditCard, Info } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';

const pricingPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: {
      monthly: 9.99,
      annual: 99.99
    },
    description: 'Perfect for new YouTube creators',
    features: [
      { name: '50 SEO generations per month', included: true },
      { name: 'Title optimization', included: true },
      { name: 'Description generation', included: true },
      { name: 'Tag suggestions', included: true },
      { name: 'Basic analytics', included: true },
      { name: 'Email support', included: true },
      { name: 'Advanced keyword research', included: false },
      { name: 'Performance tracking', included: false },
      { name: 'Priority support', included: false },
      { name: 'API access', included: false }
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: {
      monthly: 19.99,
      annual: 199.99
    },
    description: 'Ideal for growing channels',
    features: [
      { name: '200 SEO generations per month', included: true },
      { name: 'Advanced title optimization', included: true },
      { name: 'Keyword-rich descriptions', included: true },
      { name: 'Trending tag analysis', included: true },
      { name: 'Performance tracking', included: true },
      { name: 'Priority support', included: true },
      { name: 'Content export (CSV, PDF)', included: true },
      { name: 'Keyword research', included: true },
      { name: 'Multiple video formats', included: false },
      { name: 'API access', included: false }
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: {
      monthly: 49.99,
      annual: 499.99
    },
    description: 'For professional content creators',
    features: [
      { name: 'Unlimited SEO generations', included: true },
      { name: 'Premium title variations', included: true },
      { name: 'Advanced descriptions with CTA', included: true },
      { name: 'Competitor tag analysis', included: true },
      { name: 'Advanced analytics dashboard', included: true },
      { name: 'Dedicated account manager', included: true },
      { name: 'API access', included: true },
      { name: 'Team collaboration', included: true },
      { name: 'Custom training sessions', included: true },
      { name: 'White-label exports', included: true }
    ]
  }
];

const Plans = () => {
  const { user } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [isChanging, setIsChanging] = useState(false);

  const currentPlan = user?.plan || 'free';

  const handleChangePlan = async (planId: string) => {
    setIsChanging(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Success message would go here
    
    setIsChanging(false);
  };

  const annualDiscount = 16.7; // 16.7% discount for annual billing

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Subscription Plans</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Choose the plan that's right for your YouTube channel
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-10"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Current Plan: <span className="text-primary-600 dark:text-primary-400">{currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {currentPlan === 'free' 
                    ? 'You are currently on the Free plan with limited features.' 
                    : 'Your subscription renews on May 12, 2023'}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Info size={16} className="text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Need help choosing? <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">Contact us</a>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex justify-center mb-10">
        <div className="bg-white dark:bg-dark-200 rounded-lg border border-gray-200 dark:border-dark-300 p-1 flex items-center">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              billingPeriod === 'monthly'
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingPeriod('annual')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              billingPeriod === 'annual'
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300'
            }`}
          >
            Annual Billing
            <span className="ml-1 bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300 text-xs py-0.5 px-1 rounded">
              Save {annualDiscount}%
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`relative ${
              plan.popular ? 'md:-mt-4 md:mb-4' : ''
            }`}
          >
            <Card className={`h-full ${
              plan.popular
                ? 'border-primary-500 shadow-md'
                : ''
            }`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <CardHeader className={`${plan.popular ? 'pt-10' : 'pt-6'} pb-6`}>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${billingPeriod === 'monthly' ? plan.price.monthly : (plan.price.annual / 12).toFixed(2)}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">/ month</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {plan.description}
                </p>
                {billingPeriod === 'annual' && (
                  <div className="mt-2 text-sm text-success-700 dark:text-success-300">
                    Billed annually (${plan.price.annual.toFixed(2)})
                  </div>
                )}
              </CardHeader>
              <CardContent className="pb-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      {feature.included ? (
                        <Check size={18} className="text-success-500 mr-2 mt-0.5 shrink-0" />
                      ) : (
                        <X size={18} className="text-gray-400 dark:text-gray-500 mr-2 mt-0.5 shrink-0" />
                      )}
                      <span className={`text-sm ${
                        feature.included
                          ? 'text-gray-600 dark:text-gray-300'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-2 pb-6">
                <Button
                  fullWidth={true}
                  variant={currentPlan === plan.id ? 'outline' : 'default'}
                  isLoading={isChanging}
                  onClick={() => handleChangePlan(plan.id)}
                  disabled={currentPlan === plan.id}
                >
                  {currentPlan === plan.id ? (
                    <span className="flex items-center">
                      <Check size={16} className="mr-1" />
                      Current Plan
                    </span>
                  ) : (
                    <>
                      {billingPeriod === 'monthly' ? 'Subscribe' : 'Subscribe Annually'}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 dark:bg-dark-300/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Can I change my plan later?
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Yes, you can upgrade or downgrade your plan at any time. Changes will take effect on your next billing cycle.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              How do credits work?
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Each generation costs a specific number of credits depending on the type. Credits reset at the beginning of each billing cycle.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              What payment methods do you accept?
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. We also support PayPal.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Is there a refund policy?
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              We offer a 14-day money-back guarantee. If you're not satisfied with our service, contact support within 14 days of your purchase.
            </p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center">
          <Button variant="link">
            View All FAQs
          </Button>
        </div>
      </div>

      <div className="mt-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold text-primary-700 dark:text-primary-300 mb-3">
          Need a custom plan for your team?
        </h3>
        <p className="text-primary-600/80 dark:text-primary-400/80 mb-6 max-w-2xl mx-auto">
          If you have specific requirements or need a tailored solution for your organization, our team is ready to help.
        </p>
        <Button
          className="bg-primary-600 text-white hover:bg-primary-700"
        >
          <CreditCard size={16} className="mr-2" />
          Contact Sales
        </Button>
      </div>
    </div>
  );
};

export default Plans;