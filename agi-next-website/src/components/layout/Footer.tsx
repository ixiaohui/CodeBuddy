import { Github, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="mt-auto glass-effect">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
            >
              关于 AGI-Next
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-sm leading-relaxed"
            >
              基于AGI-Next研讨会实录创建的可视化网站,旨在向非技术背景用户展示AI领域的最新发展和关键概念。
            </motion.p>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg font-semibold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
            >
              快速链接
            </motion.h3>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-2 text-sm"
            >
              <li>
                <a href="/" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  首页
                </a>
              </li>
              <li>
                <a href="/experts" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  专家分享
                </a>
              </li>
              <li>
                <a href="/concepts" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  关键概念
                </a>
              </li>
            </motion.ul>
          </div>

          {/* Contact */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg font-semibold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
            >
              联系我们
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-indigo-400 transition-colors text-sm"
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500"
        >
          <div className="flex items-center space-x-2">
            <span>© 2025 AGI-Next</span>
            <Heart size={14} className="text-red-500 fill-red-500" />
            <span>Made with passion</span>
          </div>
          <div className="mt-2 md:mt-0">
            基于AGI-Next研讨会实录创建
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
