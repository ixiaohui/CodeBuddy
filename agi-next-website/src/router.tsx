import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import ExpertList from '@/pages/experts/ExpertList'
import ExpertDetail from '@/pages/experts/ExpertDetail'
import ConceptList from '@/pages/ConceptList'
import ConceptDetail from '@/pages/concepts/ConceptDetail'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'experts',
        element: <ExpertList />,
      },
      {
        path: 'experts/:id',
        element: <ExpertDetail />,
      },
      {
        path: 'concepts',
        element: <ConceptList />,
      },
      {
        path: 'concepts/:id',
        element: <ConceptDetail />,
      },
    ],
  },
])
