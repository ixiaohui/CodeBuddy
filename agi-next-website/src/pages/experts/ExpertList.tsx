import { motion } from 'framer-motion'
import { Search, Users } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import expertsData from '@/data/experts.json'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function ExpertList() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredExperts = expertsData.filter(expert =>
    expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expert.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expert.summary.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          专家分享
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          来自AI行业顶尖专家的深度洞察
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="搜索专家..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="pl-12 glass-effect border-none text-white placeholder:text-gray-500 h-12"
          />
        </div>
      </motion.div>

      {/* Experts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperts.map((expert, index) => (
          <motion.div
            key={expert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/experts/${expert.id}`}>
              <Card className="glass-effect border-none h-full hover:scale-105 transition-transform cursor-pointer">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {expert.name[0]}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-xl mb-1">{expert.name}</CardTitle>
                      <CardDescription className="text-indigo-300 text-sm">
                        {expert.title}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold text-white mb-2">{expert.subtitle}</h3>
                  <p className="text-gray-400 text-sm line-clamp-4 mb-4">{expert.summary}</p>
                  <div className="flex items-center space-x-2 text-indigo-300 text-sm">
                    <Users className="w-4 h-4" />
                    <span>{expert.relatedConcepts.length} 个相关概念</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredExperts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-gray-400 text-xl">没有找到匹配的专家</p>
        </motion.div>
      )}
    </div>
  )
}
