import { useState, useEffect } from "react";

const Calculator = () => {
  const [kurs, setKurs] = useState(12000);
  const [summa, setSumma] = useState(5.7);
  const [kursBaza, setKursBaza] = useState(13000);
  const [keyingiSumma, setKeyingiSumma] = useState(0);
  const [deductions, setDeductions] = useState([
    { id: 1, foiz: 17 },
    { id: 2, foiz: 15 },
  ]);

  // Keyingi summani hisoblash (foizsiz)
  useEffect(() => {
    const result = (summa / kursBaza) * kurs;
    setKeyingiSumma(result);
  }, [kurs, summa, kursBaza]);

  // Har bir foiz uchun sof natijani hisoblash
  const calculateNetResult = (foiz) => {
    const result = (summa / kursBaza) * kurs * (1 - foiz / 100);
    return result.toFixed(2);
  };

  // Foizni yangilash
  const updateDeduction = (id, newFoiz) => {
    setDeductions(
      deductions.map((d) =>
        d.id === id ? { ...d, foiz: parseFloat(newFoiz) || 0 } : d
      )
    );
  };

  // Yangi ayrilma qo'shish
  const addDeduction = () => {
    const newId = Math.max(...deductions.map((d) => d.id), 0) + 1;
    setDeductions([...deductions, { id: newId, foiz: 0 }]);
  };

  // Ayrilmani o'chirish
  const removeDeduction = (id) => {
    if (deductions.length > 1) {
      setDeductions(deductions.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4 sm:mb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Kalkulyator
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Variant 2 • Manual Percentages
          </p>
        </div>
        <button className="p-2 sm:p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition flex-shrink-0">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>

      {/* Kurs and Summa Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
          <label className="text-gray-400 text-xs sm:text-sm uppercase tracking-wide block mb-2">
            Kurs
          </label>
          <input
            type="number"
            value={kurs}
            onChange={(e) => setKurs(parseFloat(e.target.value) || 0)}
            className="text-2xl sm:text-3xl font-bold text-blue-500 w-full bg-transparent outline-none"
          />
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
          <label className="text-gray-400 text-xs sm:text-sm uppercase tracking-wide block mb-2">
            Summa
          </label>
          <input
            type="number"
            step="0.1"
            value={summa}
            onChange={(e) => setSumma(parseFloat(e.target.value) || 0)}
            className="text-2xl sm:text-3xl font-bold text-blue-500 w-full bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Kurs Baza (Fixed) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border-2 border-dashed border-gray-300 mb-6 relative">
        <label className="text-gray-400 text-xs sm:text-sm block mb-2">
          Kurs baza (Doimiy)
        </label>
        <div className="text-2xl sm:text-3xl font-bold text-gray-900">
          {kursBaza.toLocaleString()}
        </div>
        <div className="absolute top-4 right-4 p-2 bg-gray-100 rounded-lg">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Keyingi Summa Result */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg mb-6 text-white text-center">
        <div className="text-xs sm:text-sm uppercase tracking-wider mb-2 opacity-90">
          Keyingi Summa
        </div>
        <div className="text-4xl sm:text-6xl font-bold mb-2">
          {keyingiSumma.toFixed(2)}
        </div>
        <div className="text-xs sm:text-sm opacity-75">
          Hisoblangan natija (0% ayrilma)
        </div>
      </div>

      {/* Ayrilmalar Bilan Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-400 uppercase text-sm tracking-wide font-semibold">
            Ayrilmalar Bilan
          </h2>
          <button
            onClick={addDeduction}
            className="text-blue-500 text-sm font-medium hover:text-blue-600"
          >
            + Qo'shish
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {deductions.map((deduction) => (
            <div
              key={deduction.id}
              className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm relative"
            >
              {deductions.length > 1 && (
                <button
                  onClick={() => removeDeduction(deduction.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}

              <div className="flex justify-between items-center mb-3">
                <label className="text-gray-400 text-xs uppercase">
                  Foiz Kiritish
                </label>
                <button className="text-gray-300 hover:text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>

              <div
                className={`inline-flex items-baseline gap-2 px-2 sm:px-3 py-1 rounded-lg mb-3 sm:mb-4 ${
                  deduction.foiz < 0 ? "bg-red-50" : "bg-orange-50"
                }`}
              >
                <input
                  type="number"
                  value={deduction.foiz}
                  onChange={(e) =>
                    updateDeduction(deduction.id, e.target.value)
                  }
                  className={`text-lg sm:text-xl font-bold w-12 sm:w-16 bg-transparent outline-none ${
                    deduction.foiz < 0 ? "text-red-500" : "text-orange-500"
                  }`}
                />
                <span
                  className={`text-base sm:text-lg font-medium ${
                    deduction.foiz < 0 ? "text-red-500" : "text-orange-500"
                  }`}
                >
                  %
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {calculateNetResult(deduction.foiz)}
              </div>
              <div className="text-gray-400 text-xs uppercase">Sof Natija</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
