import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import expertsData from '@/data/experts.json'
import { Card, CardContent } from '@/components/ui/card'

export default function ExpertDetail() {
  const { id } = useParams<{ id: string }>()
  const expert = expertsData.find(e => e.id === id)

  if (!expert) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">未找到专家</h1>
          <Link to="/experts">
            <button className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
              返回专家列表
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <Link to="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-8 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回首页</span>
        </motion.button>
      </Link>

      {/* Expert Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="glass-effect rounded-2xl p-8">
          <div className="flex items-start space-x-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
              {expert.name[0]}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{expert.name}</h1>
              <p className="text-indigo-300 text-lg mb-2">{expert.title}</p>
              <p className="text-gray-400 text-xl">{expert.subtitle}</p>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed">{expert.summary}</p>
        </div>
      </motion.div>

      {/* Content Sections */}
      <div className="space-y-8">
        {expert.content.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-effect border-none">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {section.title}
                </h2>
                <div className="prose prose-invert max-w-none">
                  {section.text.split('\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-300 leading-relaxed mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
