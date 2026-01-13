import { useState } from 'react'
import Calculator from './components/Calculator'
import History from './components/History'
import Currency from './components/Currency'
import Profile from './components/Profile'

function App() {
  const [activeTab, setActiveTab] = useState('calculator')

  const renderContent = () => {
    switch (activeTab) {
      case 'calculator':
        return <Calculator />
      case 'history':
        return <History />
      case 'currency':
        return <Currency />
      case 'profile':
        return <Profile />
      default:
        return <Calculator />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Main Content */}
      <div className="max-w-md mx-auto">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
        <div className="flex justify-around items-center py-3">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              activeTab === 'calculator' ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span className="text-xs">Kalkulyator</span>
          </button>
          
          <button
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              activeTab === 'history' ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs">Tarix</span>
          </button>
          
          <button
            onClick={() => setActiveTab('currency')}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              activeTab === 'currency' ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs">Valyuta</span>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              activeTab === 'profile' ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs">Profil</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default App

