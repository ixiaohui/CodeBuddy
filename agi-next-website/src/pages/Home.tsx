import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Users, Brain, Lightbulb } from 'lucide-react'
import expertsData from '@/data/experts.json'
import conceptsData from '@/data/concepts.json'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  const featuredConcepts = conceptsData.slice(0, 6)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-12 h-12 text-indigo-400" />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AGI-Next 研讨会实录
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            探索AI的未来,理解关键技术概念
          </p>
          
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            基于2026年AGI-Next研讨会实录创建的互动学习平台,汇集了中国AI行业顶尖专家的智慧分享,
            通过可视化方式帮助非技术背景用户理解AI领域的核心概念。
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/experts">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>探索专家分享</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            
            <Link to="/concepts">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm flex items-center space-x-2"
              >
                <Brain className="w-5 h-5" />
                <span>理解关键概念</span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Users, label: '专家分享', value: '5位' },
            { icon: Brain, label: '关键概念', value: '13个' },
            { icon: Lightbulb, label: '核心议题', value: '多场' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-effect border-none">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-indigo-500/20 rounded-lg">
                      <stat.icon className="w-8 h-8 text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-gray-400">{stat.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experts Section */}
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            专家分享
          </h2>
          <p className="text-gray-400">来自AI行业顶尖专家的深度洞察</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertsData.map((expert, index) => (
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
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
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
                    <p className="text-gray-400 text-sm line-clamp-3">{expert.summary}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Concepts Section */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            关键概念
          </h2>
          <p className="text-gray-400">理解AI领域的核心技术</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredConcepts.map((concept, index) => (
            <motion.div
              key={concept.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/concepts/${concept.id}`}>
                <Card className="glass-effect border-none hover:scale-105 transition-transform cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-xl">{concept.name}</CardTitle>
                      <span className="px-3 py-1 text-xs font-medium bg-indigo-500/20 text-indigo-300 rounded-full">
                        #{concept.importance}
                      </span>
                    </div>
                    <CardDescription className="text-gray-400">
                      {concept.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm line-clamp-3 mb-3">{concept.description}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>分享专家:</span>
                      <div className="flex flex-wrap gap-1">
                        {concept.experts.map((expertId) => {
                          const expert = expertsData.find(e => e.id === expertId)
                          return expert ? (
                            <span key={expertId} className="px-2 py-1 bg-white/5 rounded">
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link to="/concepts">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm inline-flex items-center space-x-2"
            >
              <span>查看全部概念</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
