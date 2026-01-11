import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Lightbulb, Users } from 'lucide-react'
import conceptsData from '@/data/concepts.json'
import expertsData from '@/data/experts.json'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function ConceptDetail() {
  const { id } = useParams<{ id: string }>()
  const concept = conceptsData.find(c => c.id === id)

  if (!concept) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">未找到概念</h1>
          <Link to="/concepts">
            <button className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
              返回概念列表
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const currentIndex = conceptsData.findIndex(c => c.id === id)
  const prevConcept = currentIndex > 0 ? conceptsData[currentIndex - 1] : null
  const nextConcept = currentIndex < conceptsData.length - 1 ? conceptsData[currentIndex + 1] : null

  const renderVisualDiagram = () => {
    switch (concept.visualType) {
      case 'flow':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4">
              {concept.visualData.steps?.map((step: any, index: number) => (
                <div key={index} className="flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="p-4 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg backdrop-blur-sm border border-indigo-500/30 w-32 h-32 flex items-center justify-center text-center"
                  >
                    <div className="text-indigo-300 font-medium text-sm mb-2">{step.label}</div>
                    <div className="text-gray-300 text-xs">{step.content}</div>
                  </motion.div>
                  {index < (concept.visualData.steps?.length || 0) - 1 && (
                    <ArrowRight className="text-indigo-400 w-6 h-6" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )

      case 'comparison':
        // Handle short/long comparison (like Long Context)
        if (concept.visualData.short && concept.visualData.long) {
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-red-500/10 rounded-lg border border-red-500/30">
                <h4 className="text-red-400 font-semibold mb-3">{concept.visualData.short.label}</h4>
                <p className="text-gray-300 text-sm mb-3">{concept.visualData.short.description}</p>
                <div className="text-xs text-gray-400 p-3 bg-red-500/10 rounded">
                  {concept.visualData.short.example}
                </div>
              </div>
              <div className="p-6 bg-green-500/10 rounded-lg border border-green-500/30">
                <h4 className="text-green-400 font-semibold mb-3">{concept.visualData.long.label}</h4>
                <p className="text-gray-300 text-sm mb-3">{concept.visualData.long.description}</p>
                <div className="text-xs text-gray-400 p-3 bg-green-500/10 rounded">
                  {concept.visualData.long.example}
                </div>
              </div>
            </div>
          )
        }
        // Handle systemOne/systemTwo comparison (like System One vs System Two)
        if (concept.visualData.systemOne && concept.visualData.systemTwo) {
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <h4 className="text-blue-400 font-semibold mb-3">{concept.visualData.systemOne.label}</h4>
                <p className="text-gray-300 text-sm mb-3">{concept.visualData.systemOne.description}</p>
                <div className="space-y-2 mt-3">
                  {concept.visualData.systemOne.examples.map((example: string, index: number) => (
                    <div key={index} className="text-xs text-gray-400 p-2 bg-blue-500/10 rounded">
                      {example}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-purple-500/10 rounded-lg border border-purple-500/30">
                <h4 className="text-purple-400 font-semibold mb-3">{concept.visualData.systemTwo.label}</h4>
                <p className="text-gray-300 text-sm mb-3">{concept.visualData.systemTwo.description}</p>
                <div className="space-y-2 mt-3">
                  {concept.visualData.systemTwo.examples.map((example: string, index: number) => (
                    <div key={index} className="text-xs text-gray-400 p-2 bg-purple-500/10 rounded">
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        }
        // Handle low/high comparison (like Token Efficiency)
        if (concept.visualData.low && concept.visualData.high) {
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-orange-500/10 rounded-lg border border-orange-500/30">
                <h4 className="text-orange-400 font-semibold mb-3">{concept.visualData.low.label}</h4>
                <p className="text-gray-300 text-sm mb-3">{concept.visualData.low.description}</p>
                <div className="text-xs text-gray-400 p-3 bg-orange-500/10 rounded">
                  {concept.visualData.low.example}
                </div>
              </div>
              <div className="p-6 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                <h4 className="text-emerald-400 font-semibold mb-3">{concept.visualData.high.label}</h4>
                <p className="text-gray-300 text-sm mb-3">{concept.visualData.high.description}</p>
                <div className="text-xs text-gray-400 p-3 bg-emerald-500/10 rounded">
                  {concept.visualData.high.example}
                </div>
              </div>
            </div>
          )
        }
        // Handle virtual/embodied comparison (like Embodied Reasoning)
        if (concept.visualData.virtual && concept.visualData.embodied) {
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                <h4 className="text-cyan-400 font-semibold mb-3">{concept.visualData.virtual.label}</h4>
                <p className="text-gray-300 text-sm mb-3">{concept.visualData.virtual.description}</p>
                <div className="text-xs text-gray-400 p-3 bg-cyan-500/10 rounded">
                  {concept.visualData.virtual.example}
                </div>
              </div>
              <div className="p-6 bg-rose-500/10 rounded-lg border border-rose-500/30">
                <h4 className="text-rose-400 font-semibold mb-3">{concept.visualData.embodied.label}</h4>
                <p className="text-gray-300 text-sm mb-3">{concept.visualData.embodied.description}</p>
                <div className="text-xs text-gray-400 p-3 bg-rose-500/10 rounded">
                  {concept.visualData.embodied.example}
                </div>
              </div>
            </div>
          )
        }
        // Handle specialist/generalist comparison (like Generalist Agent)
        if (concept.visualData.specialist && concept.visualData.generalist) {
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-orange-500/10 rounded-lg border border-orange-500/30">
                <h4 className="text-orange-400 font-semibold mb-3">{concept.visualData.specialist.label}</h4>
                <p className="text-gray-300 text-sm mb-3">{concept.visualData.specialist.description}</p>
                <div className="space-y-2 mt-3">
                  {concept.visualData.specialist.capabilities.map((cap: any, index: number) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-300">{cap[0]}</span>
                      <span className={cap[1] === '✓' ? 'text-green-400' : 'text-red-400'}>
                        {cap[1]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                <h4 className="text-emerald-400 font-semibold mb-3">{concept.visualData.generalist.label}</h4>
                <p className="text-gray-300 text-sm mb-3">{concept.visualData.generalist.description}</p>
                <div className="space-y-2 mt-3">
                  {concept.visualData.generalist.capabilities.map((cap: any, index: number) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-300">{cap[0]}</span>
                      <span className="text-emerald-400">{cap[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        }
        return null

      case 'chart':
        if (concept.visualData.data) {
          return (
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 text-center">
                {concept.visualData.description}
              </h3>
              <div className="space-y-3">
                {concept.visualData.data.map((item: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-32 text-sm text-gray-400 text-right">{item.label}</div>
                    <div className="flex-1 bg-white/5 rounded-full h-8 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      />
                    </div>
                    <div className="w-16 text-sm font-medium text-white text-left">{item.value}%</div>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        }
        return null

      case 'timeline':
        return (
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500"></div>
            <div className="space-y-6 ml-12">
              {(concept.visualData.rounds || concept.visualData.stages)?.map((item: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute left-[-36px] top-1 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="p-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg backdrop-blur-sm border border-indigo-500/30">
                    <div className="text-indigo-300 font-medium text-sm mb-1">
                      {item.round || item.stage}
                    </div>
                    <div className="text-white font-medium">{item.action || item.description}</div>
                    {(item.result || item.items) && (
                      <div className="text-gray-300 text-sm mt-1">
                        {item.result || item.items?.join(', ')}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <Link to="/concepts">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-8 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回概念列表</span>
        </motion.button>
      </Link>

      <AnimatePresence mode="wait">
        <motion.div
          key={concept.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Concept Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {concept.name}
                </h1>
                <div className="flex items-center space-x-3">
                  <span className="px-4 py-2 text-sm font-medium bg-indigo-500/20 text-indigo-300 rounded-full flex items-center space-x-2">
                    <Lightbulb className="w-4 h-4" />
                    <span>重要性 #{concept.importance}</span>
                  </span>
                  <span className="px-4 py-2 text-sm font-medium bg-purple-500/20 text-purple-300 rounded-full">
                    {concept.category}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description Card */}
          <Card className="glass-effect border-none mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                <Lightbulb className="w-6 h-6 text-indigo-400" />
                <span>概念解释</span>
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">{concept.description}</p>
            </CardContent>
          </Card>

          {/* Visual Diagram */}
          <Card className="glass-effect border-none mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <Users className="w-6 h-6 text-indigo-400" />
                <span>可视化理解</span>
              </h2>
              {renderVisualDiagram()}
            </CardContent>
          </Card>

          {/* Context Card */}
          <Card className="glass-effect border-none mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                <Users className="w-6 h-6 text-indigo-400" />
                <span>专家观点</span>
              </h2>
              <ScrollArea className="h-48">
                <p className="text-gray-300 leading-relaxed text-sm">{concept.context}</p>
              </ScrollArea>
              <div className="mt-6 flex flex-wrap gap-2">
                {concept.experts.map((expertId) => {
                  const expert = expertsData.find(e => e.id === expertId)
                  return expert ? (
                    <Link key={expertId} to={`/experts/${expertId}`}>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-full hover:bg-indigo-500/30 transition-colors cursor-pointer flex items-center space-x-2 text-sm"
                      >
                        <span>{expert.name}</span>
                      </motion.span>
                    </Link>
                  ) : null
                })}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            {prevConcept && (
              <Link to={`/concepts/${prevConcept.id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm flex items-center space-x-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>{prevConcept.name}</span>
                </motion.button>
              </Link>
            )}
            {nextConcept && (
              <Link to={`/concepts/${nextConcept.id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center space-x-2"
                >
                  <span>{nextConcept.name}</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
