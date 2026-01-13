import { useState, useEffect } from 'react'

const Currency = () => {
  const [rates, setRates] = useState([])
  const [loading, setLoading] = useState(true)
  const [baseCurrency, setBaseCurrency] = useState('USD')

  const currencies = [
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
    { code: 'RUB', name: 'Russian Ruble', flag: '🇷🇺' },
    { code: 'UZS', name: "O'zbek So'm", flag: '🇺🇿' },
    { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
  ]

  useEffect(() => {
    fetchRates()
  }, [baseCurrency])

  const fetchRates = async () => {
    setLoading(true)
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
      const data = await response.json()
      
      const formattedRates = currencies
        .filter(c => c.code !== baseCurrency)
        .map(currency => ({
          ...currency,
          rate: data.rates[currency.code]
        }))
      
      setRates(formattedRates)
    } catch (error) {
      console.error('Error fetching rates:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Valyuta</h1>
      <p className="text-gray-500 mb-6">Real vaqtda valyuta kurslari</p>

      {/* Base Currency Selector */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <label className="text-gray-400 text-sm block mb-2">Bazaviy valyuta</label>
        <select
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
          className="w-full text-xl font-bold text-gray-900 bg-transparent outline-none cursor-pointer"
        >
          {currencies.map(currency => (
            <option key={currency.code} value={currency.code}>
              {currency.flag} {currency.code} - {currency.name}
            </option>
          ))}
        </select>
      </div>

      {/* Currency Rates List */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-gray-400 mt-2">Yuklanmoqda...</p>
          </div>
        ) : (
          rates.map(currency => (
            <div key={currency.code} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currency.flag}</span>
                <div>
                  <div className="font-bold text-gray-900">{currency.code}</div>
                  <div className="text-sm text-gray-400">{currency.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-blue-500">
                  {currency.rate ? currency.rate.toFixed(4) : 'N/A'}
                </div>
                <div className="text-xs text-gray-400">1 {baseCurrency}</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Refresh Button */}
      <button
        onClick={fetchRates}
        disabled={loading}
        className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-md transition-all disabled:opacity-50"
      >
        {loading ? 'Yuklanmoqda...' : '🔄 Kurslarni yangilash'}
      </button>
    </div>
  )
}

export default Currency

