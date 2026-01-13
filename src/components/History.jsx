import { useState, useEffect } from "react";

const History = () => {
  const [history, setHistory] = useState([]);

  // Tarixni yuklash
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const stored = localStorage.getItem("calculatorHistory");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Tarixni yuklashda xato:", error);
    }
  };

  // Tarixni tozalash
  const clearHistory = () => {
    if (window.confirm("Barcha tarixni o'chirmoqchimisiz?")) {
      localStorage.removeItem("calculatorHistory");
      setHistory([]);
    }
  };

  // Bitta yozuvni o'chirish
  const deleteEntry = (id) => {
    const updated = history.filter((entry) => entry.id !== id);
    localStorage.setItem("calculatorHistory", JSON.stringify(updated));
    setHistory(updated);
  };

  if (history.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Tarix</h1>
        <div className="text-center py-20">
          <svg
            className="w-24 h-24 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-400 text-lg">Hozircha tarix mavjud emas</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Tarix</h1>
        <button
          onClick={clearHistory}
          className="text-red-500 hover:text-red-600 text-sm font-medium"
        >
          Hammasini o'chirish
        </button>
      </div>

      <div className="space-y-3">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-xs text-gray-400">{entry.date}</div>
              </div>
              <button
                onClick={() => deleteEntry(entry.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>

            {/* Main values */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <div className="text-xs text-gray-400 uppercase">Kurs</div>
                <div className="text-lg font-bold text-gray-900">
                  {entry.kurs.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase">Summa</div>
                <div className="text-lg font-bold text-gray-900">
                  {entry.summa}
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="bg-blue-50 rounded-lg p-3 mb-3">
              <div className="text-xs text-gray-600 mb-1">Keyingi Summa</div>
              <div className="text-2xl font-bold text-blue-600">
                {entry.keyingiSumma}
              </div>
            </div>

            {/* Deductions */}
            {entry.deductions && entry.deductions.length > 0 && (
              <div>
                <div className="text-xs text-gray-400 uppercase mb-2">
                  Ayrilmalar
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {entry.deductions.map((deduction, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-lg p-2 text-center"
                    >
                      <div className="text-sm text-orange-500 font-medium">
                        {deduction.foiz}%
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {deduction.result}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;

