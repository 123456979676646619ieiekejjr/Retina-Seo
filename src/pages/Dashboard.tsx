import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Copy,
  Download,
  Trash2,
  ExternalLink,
  Search,
  Filter,
  SortDesc
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';

// Mock data for demonstration
const mockGenerations = [
  {
    id: 'gen-1',
    topic: 'iPhone Photography Tips for Beginners',
    timestamp: '2023-04-12T10:30:00Z',
    type: 'Full',
    titles: [
      'iPhone Photography: 10 Pro Tips for Stunning Photos (Beginners Guide)',
      '10 iPhone Camera Tricks for AMAZING Photos (Beginner Friendly!)',
      'Master iPhone Photography TODAY - Essential Tips for Beginners',
      'From Amateur to Pro: iPhone Photography Basics You NEED to Know',
      'Transform Your iPhone Photos with These Simple Beginner Tips'
    ],
    tags: ['iphone photography', 'smartphone photography', 'photography tips', 'mobile photography', 'iphone camera', 'beginner photography', 'iphone 13 camera', 'iphone 12 camera', 'photo tips', 'how to take good photos', 'photography for beginners']
  },
  {
    id: 'gen-2',
    topic: 'Best Passive Income Ideas 2023',
    timestamp: '2023-04-10T15:45:00Z',
    type: 'Titles Only',
    titles: [
      '10 Passive Income Ideas That ACTUALLY Work in 2023 (With Proof)',
      'Passive Income: 7 Ways I Make $10,000/Month in 2023',
      'Passive Income for Beginners: Start with $100 in 2023',
      'The TRUTH About Passive Income in 2023 (What No One Tells You)',
      'Passive Income: From $0 to $5,000/Month Step by Step (2023 Guide)'
    ]
  },
  {
    id: 'gen-3',
    topic: 'How to Start a Podcast',
    timestamp: '2023-04-08T09:15:00Z',
    type: 'Full',
    titles: [
      'How to Start a Podcast in 2023 (Complete Step-by-Step Tutorial)',
      'Podcasting for Beginners: Equipment, Software & Marketing Guide',
      'Start Your First Podcast TODAY: The Ultimate Beginner\'s Guide',
      'Podcast 101: From IDEA to LAUNCH in 7 Days (Complete Walkthrough)',
      'How I Started a Successful Podcast with ZERO Experience (Step-by-Step)'
    ],
    tags: ['podcast', 'how to podcast', 'start a podcast', 'podcasting', 'podcast equipment', 'podcast tutorial', 'podcast tips', 'podcast setup', 'podcast microphone', 'podcast software', 'podcast hosting']
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGenerations, setFilteredGenerations] = useState(mockGenerations);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredGenerations(mockGenerations);
      return;
    }
    
    const filtered = mockGenerations.filter(gen => 
      gen.topic.toLowerCase().includes(query.toLowerCase()) ||
      gen.titles.some(title => title.toLowerCase().includes(query.toLowerCase()))
    );
    
    setFilteredGenerations(filtered);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Welcome back, {user?.name}!
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/generator">
            <Button className="flex items-center gap-2">
              <Sparkles size={16} />
              Create New SEO Content
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Available Credits
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {user?.credits}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                  <Sparkles size={24} className="text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <div className="mt-4">
                <Link to="/plans" className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                  Upgrade for more credits →
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Generated Content
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {mockGenerations.length}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-secondary-50 dark:bg-secondary-900/20 rounded-full flex items-center justify-center">
                  <BarChart3 size={24} className="text-secondary-600 dark:text-secondary-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp size={16} className="text-success-500 mr-1" />
                <span className="text-sm font-medium text-success-600 dark:text-success-400">
                  12% increase
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                  this week
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Current Plan
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {user?.plan.charAt(0).toUpperCase() + user?.plan.slice(1)}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-accent-50 dark:bg-accent-900/20 rounded-full flex items-center justify-center">
                  <Clock size={24} className="text-accent-600 dark:text-accent-400" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Renews on <span className="font-medium">May 12, 2023</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Generations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <CardTitle>Recent Generations</CardTitle>
              <div className="mt-4 md:mt-0 w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    placeholder="Search generations..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Filter size={16} className="mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <SortDesc size={16} className="mr-1" />
                    Sort
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-300">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Topic
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Titles
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-300">
                  {filteredGenerations.length > 0 ? (
                    filteredGenerations.map((generation, index) => (
                      <tr 
                        key={generation.id}
                        className="hover:bg-gray-50 dark:hover:bg-dark-300/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {generation.topic}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(generation.timestamp).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            generation.type === 'Full'
                              ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                          }`}>
                            {generation.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {generation.titles.length} titles
                          {generation.tags && `, ${generation.tags.length} tags`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                              title="Copy"
                            >
                              <Copy size={16} />
                            </button>
                            <button
                              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                              title="Download"
                            >
                              <Download size={16} />
                            </button>
                            <button
                              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                              title="View"
                            >
                              <ExternalLink size={16} />
                            </button>
                            <button
                              className="text-error-500 hover:text-error-700 dark:text-error-400 dark:hover:text-error-300"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                        {searchQuery ? (
                          <>
                            <Search className="h-10 w-10 mx-auto text-gray-400 dark:text-gray-500 mb-2" />
                            <p>No generations found matching "{searchQuery}"</p>
                            <button 
                              onClick={() => setSearchQuery('')}
                              className="text-primary-600 dark:text-primary-400 font-medium mt-1"
                            >
                              Clear search
                            </button>
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-10 w-10 mx-auto text-gray-400 dark:text-gray-500 mb-2" />
                            <p>You haven't generated any SEO content yet</p>
                            <Link 
                              to="/generator"
                              className="text-primary-600 dark:text-primary-400 font-medium mt-1 inline-block"
                            >
                              Create your first generation
                            </Link>
                          </>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;