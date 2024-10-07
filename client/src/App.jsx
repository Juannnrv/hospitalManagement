import { useState } from 'react'
import viteLogo from '/vite.svg'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <div className="mb-6">
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo h-16 w-16" alt="Vite logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-white mb-6">Vite + React</h1>
      <div className="card bg-white p-6 rounded-lg shadow-lg">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="text-gray-700">
          Edit <code className="bg-gray-200 p-1 rounded">src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-gray-400 mt-4">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
