import { motion } from 'framer-motion'
import { Search, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import conceptsData from '@/data/concepts.json'
import expertsData from '@/data/experts.json'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function ConceptList() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredConcepts = conceptsData.filter(concept =>
    concept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    concept.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      '基础技术层': 'from-blue-500/20 to-cyan-500/20',
      '核心能力层': 'from-indigo-500/20 to-purple-500/20',
      '学习方法层': 'from-purple-500/20 to-pink-500/20',
      '应用形态层': 'from-pink-500/20 to-rose-500/20',
      '未来方向层': 'from-emerald-500/20 to-teal-500/20',
    }
    return colors[category] || 'from-gray-500/20 to-gray-600/20'
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          关键概念探索
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          理解AI领域的核心技术,从基础架构到未来方向
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="搜索概念..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="pl-12 glass-effect border-none text-white placeholder:text-gray-500 h-12"
          />
        </div>
      </motion.div>

      {/* Concepts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConcepts.map((concept, index) => (
          <motion.div
            key={concept.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <Link to={`/concepts/${concept.id}`}>
              <Card className="glass-effect border-none h-full hover:scale-105 transition-transform cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-white text-xl">{concept.name}</CardTitle>
                    <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full">
                      <TrendingUp className="w-3 h-3 text-indigo-300" />
                      <span className="text-xs font-medium text-indigo-300">#{concept.importance}</span>
                    </div>
                  </div>
                  <CardDescription className={`text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(concept.category)}`}>
                    {concept.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm line-clamp-4 mb-4">{concept.description}</p>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-400">
                      <span className="font-medium">专家观点:</span>
                      <p className="mt-1 line-clamp-2">{concept.context}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {concept.experts.map((expertId) => {
                        const expert = expertsData.find(e => e.id === expertId)
                        return expert ? (
                          <span key={expertId} className="px-2 py-1 text-xs bg-white/5 text-gray-300 rounded-full">
                            {expert.name}
                          </span>
                        ) : null
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredConcepts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-gray-400 text-xl">没有找到匹配的概念</p>
        </motion.div>
      )}
    </div>
  )
}
