import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Sparkles, 
  PenLine, 
  FileText, 
  Tags, 
  AlertCircle, 
  Check,
  Copy,
  Download,
  Clipboard,
  InfoIcon
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';

type GeneratorFormData = {
  topic: string;
  keywords: string;
  contentType: 'full' | 'titles' | 'description' | 'tags';
  style: string;
};

// Mock data for demonstration
const mockTitles = [
  'iPhone Photography: 10 Pro Tips for Stunning Photos (Beginners Guide)',
  '10 iPhone Camera Tricks for AMAZING Photos (Beginner Friendly!)',
  'Master iPhone Photography TODAY - Essential Tips for Beginners',
  'From Amateur to Pro: iPhone Photography Basics You NEED to Know',
  'Transform Your iPhone Photos with These Simple Beginner Tips'
];

const mockDescription = `Looking to take better photos with your iPhone? This comprehensive guide will show you exactly how to master iPhone photography as a beginner! 

In this video, I'm sharing 10 professional iPhone photography tips that will instantly transform your mobile photography skills. Whether you're using the latest iPhone 13 Pro or an older model, these techniques will help you capture stunning images that look professional.

You'll learn:
✅ How to properly use iPhone's Portrait Mode for DSLR-quality shots
✅ The perfect lighting techniques for any situation
✅ How to compose your shots like a professional photographer
✅ Essential iPhone camera settings you NEED to change
✅ Simple editing tricks using only the built-in Photos app

I'll also show you common mistakes beginners make and how to avoid them. These tips work for all skill levels and don't require any expensive equipment or complex editing software.

If you've been frustrated with your iPhone photos and want to start taking images you're proud to share, this tutorial is for you! By the end of this video, you'll have all the knowledge you need to take incredible photos with the device that's always in your pocket.

Don't forget to SUBSCRIBE for more photography tutorials and hit the notification bell so you never miss an upload!

#iPhonePhotography #PhotographyTips #BeginnerPhotography #MobilePhotography #iPhoneCameraTips`;

const mockTags = [
  'iphone photography',
  'smartphone photography',
  'photography tips',
  'mobile photography',
  'iphone camera',
  'beginner photography',
  'iphone 13 camera',
  'iphone 12 camera',
  'photo tips',
  'how to take good photos',
  'photography for beginners',
  'iphone camera settings',
  'iphone photo editing',
  'portrait mode iphone',
  'iphone camera tricks'
];

const Generator = () => {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<{
    titles?: string[];
    description?: string;
    tags?: string[];
  } | null>(null);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<GeneratorFormData>({
    defaultValues: {
      contentType: 'full',
    }
  });
  
  const contentType = watch('contentType');

  const onSubmit = async (data: GeneratorFormData) => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response based on content type
    let content: any = {};
    
    if (data.contentType === 'full' || data.contentType === 'titles') {
      content.titles = mockTitles;
    }
    
    if (data.contentType === 'full' || data.contentType === 'description') {
      content.description = mockDescription;
    }
    
    if (data.contentType === 'full' || data.contentType === 'tags') {
      content.tags = mockTags;
    }
    
    setGeneratedContent(content);
    setIsGenerating(false);
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    
    // Reset the copied state after 2 seconds
    setTimeout(() => setCopied(null), 2000);
  };

  const creditCost = () => {
    switch (contentType) {
      case 'full':
        return 10;
      case 'titles':
        return 3;
      case 'description':
        return 5;
      case 'tags':
        return 2;
      default:
        return 0;
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">YouTube SEO Generator</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Create optimized content for your YouTube videos
            </p>
          </div>
          <div className="mt-4 md:mt-0 bg-primary-50 dark:bg-primary-900/20 px-4 py-2 rounded-md flex items-center">
            <Sparkles size={18} className="text-primary-600 dark:text-primary-400 mr-2" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              {user?.credits} credits available
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader>
                <CardTitle>Generate SEO Content</CardTitle>
                <CardDescription>
                  Enter your video topic to generate optimized content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-4">
                    <Textarea
                      label="Video Topic or Concept"
                      placeholder="Enter your video topic or concept here. Be as specific as possible for better results."
                      error={errors.topic?.message}
                      {...register('topic', { 
                        required: 'Topic is required',
                        minLength: {
                          value: 10,
                          message: 'Topic should be at least 10 characters'
                        }
                      })}
                    />

                    <Input
                      label="Target Keywords (Optional)"
                      placeholder="Separate keywords with commas"
                      {...register('keywords')}
                      description="Add specific keywords you want to include"
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Content Type
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <label className={`flex items-center p-3 rounded-md border ${
                          contentType === 'full' 
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                            : 'border-gray-300 dark:border-dark-400 hover:bg-gray-50 dark:hover:bg-dark-300/50'
                        } cursor-pointer transition-colors`}>
                          <input
                            type="radio"
                            value="full"
                            className="sr-only"
                            {...register('contentType')}
                          />
                          <Sparkles size={16} className={`mr-2 ${
                            contentType === 'full' 
                              ? 'text-primary-600 dark:text-primary-400' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`} />
                          <span className={`text-sm font-medium ${
                            contentType === 'full' 
                              ? 'text-primary-700 dark:text-primary-300' 
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            Full Pack
                          </span>
                        </label>
                        
                        <label className={`flex items-center p-3 rounded-md border ${
                          contentType === 'titles' 
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                            : 'border-gray-300 dark:border-dark-400 hover:bg-gray-50 dark:hover:bg-dark-300/50'
                        } cursor-pointer transition-colors`}>
                          <input
                            type="radio"
                            value="titles"
                            className="sr-only"
                            {...register('contentType')}
                          />
                          <PenLine size={16} className={`mr-2 ${
                            contentType === 'titles' 
                              ? 'text-primary-600 dark:text-primary-400' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`} />
                          <span className={`text-sm font-medium ${
                            contentType === 'titles' 
                              ? 'text-primary-700 dark:text-primary-300' 
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            Titles Only
                          </span>
                        </label>
                        
                        <label className={`flex items-center p-3 rounded-md border ${
                          contentType === 'description' 
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                            : 'border-gray-300 dark:border-dark-400 hover:bg-gray-50 dark:hover:bg-dark-300/50'
                        } cursor-pointer transition-colors`}>
                          <input
                            type="radio"
                            value="description"
                            className="sr-only"
                            {...register('contentType')}
                          />
                          <FileText size={16} className={`mr-2 ${
                            contentType === 'description' 
                              ? 'text-primary-600 dark:text-primary-400' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`} />
                          <span className={`text-sm font-medium ${
                            contentType === 'description' 
                              ? 'text-primary-700 dark:text-primary-300' 
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            Description
                          </span>
                        </label>
                        
                        <label className={`flex items-center p-3 rounded-md border ${
                          contentType === 'tags' 
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                            : 'border-gray-300 dark:border-dark-400 hover:bg-gray-50 dark:hover:bg-dark-300/50'
                        } cursor-pointer transition-colors`}>
                          <input
                            type="radio"
                            value="tags"
                            className="sr-only"
                            {...register('contentType')}
                          />
                          <Tags size={16} className={`mr-2 ${
                            contentType === 'tags' 
                              ? 'text-primary-600 dark:text-primary-400' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`} />
                          <span className={`text-sm font-medium ${
                            contentType === 'tags' 
                              ? 'text-primary-700 dark:text-primary-300' 
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            Tags Only
                          </span>
                        </label>
                      </div>
                    </div>

                    <Input
                      label="Content Style (Optional)"
                      placeholder="e.g., Professional, Casual, Enthusiastic"
                      {...register('style')}
                      description="Customize the tone of your content"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <InfoIcon size={14} className="mr-1" />
                      Cost: <span className="font-medium ml-1">{creditCost()} credits</span>
                    </div>
                    
                    <Button 
                      type="submit" 
                      isLoading={isGenerating}
                      disabled={isGenerating || user?.credits! < creditCost()}
                    >
                      {isGenerating ? 'Generating...' : 'Generate Content'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Generated Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="lg:col-span-2"
          >
            {!generatedContent ? (
              <div className="h-full flex items-center justify-center bg-white dark:bg-dark-200 rounded-lg border border-dashed border-gray-300 dark:border-dark-400 p-8">
                <div className="text-center">
                  <Sparkles size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Your optimized content will appear here
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md">
                    Fill out the form and click "Generate Content" to create SEO-optimized YouTube content for your videos.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Titles Section */}
                {generatedContent.titles && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-xl">Optimized Titles</CardTitle>
                        <CardDescription>
                          5 SEO-optimized title variations for your video
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCopy(generatedContent.titles!.join('\n\n'), 'titles')}
                        >
                          {copied === 'titles' ? (
                            <>
                              <Check size={16} className="mr-1" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy size={16} className="mr-1" />
                              Copy All
                            </>
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <Download size={16} className="mr-1" />
                          Export
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {generatedContent.titles.map((title, index) => (
                          <li key={index} className="relative">
                            <div className="flex group">
                              <div className="flex-shrink-0 w-8 h-8 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mr-3">
                                <span className="text-primary-700 dark:text-primary-300 text-sm font-medium">
                                  {index + 1}
                                </span>
                              </div>
                              <div className="flex-1">
                                <p className="text-gray-900 dark:text-white font-medium py-1">
                                  {title}
                                </p>
                              </div>
                              <button
                                onClick={() => handleCopy(title, `title-${index}`)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                title="Copy"
                              >
                                {copied === `title-${index}` ? (
                                  <Check size={16} className="text-success-500" />
                                ) : (
                                  <Clipboard size={16} />
                                )}
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Description Section */}
                {generatedContent.description && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-xl">Video Description</CardTitle>
                        <CardDescription>
                          Keyword-rich description optimized for YouTube's algorithm
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCopy(generatedContent.description!, 'description')}
                        >
                          {copied === 'description' ? (
                            <>
                              <Check size={16} className="mr-1" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy size={16} className="mr-1" />
                              Copy
                            </>
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <Download size={16} className="mr-1" />
                          Export
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-50 dark:bg-dark-300/50 rounded-md p-4 text-gray-800 dark:text-gray-200 whitespace-pre-line text-sm">
                        {generatedContent.description}
                      </div>
                      <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <AlertCircle size={14} className="mr-1" />
                        Word count: {generatedContent.description.split(' ').length} words | Character count: {generatedContent.description.length} characters
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Tags Section */}
                {generatedContent.tags && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-xl">Video Tags</CardTitle>
                        <CardDescription>
                          Trending tags to help your video get discovered
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCopy(generatedContent.tags!.join(', '), 'tags')}
                        >
                          {copied === 'tags' ? (
                            <>
                              <Check size={16} className="mr-1" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy size={16} className="mr-1" />
                              Copy All
                            </>
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <Download size={16} className="mr-1" />
                          Export
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {generatedContent.tags.map((tag, index) => (
                          <div
                            key={index}
                            className="bg-gray-100 dark:bg-dark-300 rounded-md px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-700 dark:hover:text-primary-300 transition-colors cursor-pointer"
                            onClick={() => handleCopy(tag, `tag-${index}`)}
                            title="Click to copy"
                          >
                            {tag}
                            {copied === `tag-${index}` && (
                              <Check size={10} className="inline-block ml-1 text-success-500" />
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <InfoIcon size={14} className="mr-1" />
                        Total tags: {generatedContent.tags.length}
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 dark:bg-dark-300/30 border-t border-gray-200 dark:border-dark-300">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <p>
                          <span className="font-medium">Pro tip:</span> YouTube allows up to 500 characters for tags. This set uses approximately {generatedContent.tags.join(', ').length} characters.
                        </p>
                      </div>
                    </CardFooter>
                  </Card>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Generator;