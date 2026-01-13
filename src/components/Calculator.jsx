import { useState, useEffect } from "react";

const Calculator = () => {
  // Default qiymatlar
  const DEFAULT_KURS = 12000;
  const DEFAULT_SUMMA = 5.7;

  // LocalStorage dan yuklash
  const getStoredValue = (key, defaultValue) => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? parseFloat(stored) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  };

  const [kurs, setKurs] = useState(() => getStoredValue("kurs", DEFAULT_KURS));
  const [summa, setSumma] = useState(() =>
    getStoredValue("summa", DEFAULT_SUMMA)
  );
  const [kursBaza, setKursBaza] = useState(13000);
  const [keyingiSumma, setKeyingiSumma] = useState(0);
  const [deductions, setDeductions] = useState([
    { id: 1, foiz: 17 },
    { id: 2, foiz: 15 },
  ]);

  // Display values (what user sees while typing)
  const [kursDisplay, setKursDisplay] = useState(() => {
    const stored = getStoredValue("kurs", DEFAULT_KURS);
    return stored.toString();
  });
  const [summaDisplay, setSummaDisplay] = useState(() => {
    const stored = getStoredValue("summa", DEFAULT_SUMMA);
    return stored.toString();
  });

  // LocalStorage ga saqlash - kurs o'zgarganda
  useEffect(() => {
    try {
      localStorage.setItem("kurs", kurs.toString());
    } catch (error) {
      console.error("Kursni saqlashda xato:", error);
    }
  }, [kurs]);

  // LocalStorage ga saqlash - summa o'zgarganda
  useEffect(() => {
    try {
      localStorage.setItem("summa", summa.toString());
    } catch (error) {
      console.error("Summani saqlashda xato:", error);
    }
  }, [summa]);

  // Keyingi summani hisoblash (foizsiz)
  useEffect(() => {
    const result = (summa / kursBaza) * kurs;
    setKeyingiSumma(result);
  }, [kurs, summa, kursBaza]);

  // Har bir foiz uchun sof natijani hisoblash
  const calculateNetResult = (foiz) => {
    const result = (summa / kursBaza) * kurs * (1 - foiz / 100);
    return result.toFixed(3);
  };

  // Kasr raqamlarni cheklash (maksimal 3 ta)
  const limitDecimals = (value, maxDecimals = 3) => {
    const parts = value.split(".");
    if (parts.length === 2 && parts[1].length > maxDecimals) {
      return `${parts[0]}.${parts[1].slice(0, maxDecimals)}`;
    }
    return value;
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

  // Tarixga saqlash
  const saveToHistory = () => {
    try {
      const historyEntry = {
        id: Date.now(),
        date: new Date().toLocaleString("uz-UZ"),
        kurs,
        summa,
        kursBaza,
        keyingiSumma: keyingiSumma.toFixed(3),
        deductions: deductions.map((d) => ({
          foiz: d.foiz,
          result: calculateNetResult(d.foiz),
        })),
      };

      // Mavjud tarixni olish
      const existingHistory = JSON.parse(
        localStorage.getItem("calculatorHistory") || "[]"
      );

      // Yangi yozuvni boshiga qo'shish
      const updatedHistory = [historyEntry, ...existingHistory];

      // Faqat oxirgi 50 ta yozuvni saqlash
      const limitedHistory = updatedHistory.slice(0, 50);

      localStorage.setItem("calculatorHistory", JSON.stringify(limitedHistory));

      // Foydalanuvchiga bildirish
      alert("✅ Tarixga saqlandi!");
    } catch (error) {
      console.error("Tarixga saqlashda xato:", error);
      alert("❌ Xatolik yuz berdi!");
    }
  };

  return (
    <div className="p-3 sm:p-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Kalkulyator
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Variant 2 • Manual Percentages
          </p>
        </div>
        <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition flex-shrink-0">
          <svg
            className="w-5 h-5 text-gray-600"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
        <div className="bg-white rounded-lg p-2.5 shadow-sm">
          <label className="text-gray-400 text-xs uppercase tracking-wide block mb-0.5">
            Kurs
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={kursDisplay}
            onChange={(e) => {
              const displayValue = e.target.value;
              setKursDisplay(displayValue);
              const numericValue = displayValue.replace(",", ".");
              const parsed = parseFloat(numericValue);
              if (!isNaN(parsed)) {
                setKurs(parsed);
              } else if (displayValue === "" || displayValue === "-") {
                setKurs(0);
              }
            }}
            className="text-lg sm:text-xl font-bold text-blue-500 w-full bg-transparent outline-none"
          />
        </div>

        <div className="bg-white rounded-lg p-2.5 shadow-sm">
          <label className="text-gray-400 text-xs uppercase tracking-wide block mb-0.5">
            Summa
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={summaDisplay}
            onChange={(e) => {
              let displayValue = e.target.value;
              // Vergulni nuqtaga o'zgartirish
              displayValue = displayValue.replace(",", ".");
              // Maksimal 3 ta kasr raqamga cheklash
              displayValue = limitDecimals(displayValue, 3);
              setSummaDisplay(displayValue);
              const parsed = parseFloat(displayValue);
              if (!isNaN(parsed)) {
                setSumma(parsed);
              } else if (displayValue === "" || displayValue === "-") {
                setSumma(0);
              }
            }}
            className="text-lg sm:text-xl font-bold text-blue-500 w-full bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Kurs Baza (Fixed) */}
      <div className="bg-white rounded-lg p-2.5 shadow-sm border-2 border-dashed border-gray-300 mb-3 relative">
        <label className="text-gray-400 text-xs block mb-0.5">
          Kurs baza (Doimiy)
        </label>
        <div className="text-lg sm:text-xl font-bold text-gray-900">
          {kursBaza.toLocaleString()}
        </div>
        <div className="absolute top-2 right-2 p-1.5 bg-gray-100 rounded-lg">
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
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg sm:rounded-xl p-4 shadow-lg mb-3 text-white text-center">
        <div className="text-xs uppercase tracking-wider mb-0.5 opacity-90">
          Keyingi Summa
        </div>
        <div className="text-2xl sm:text-3xl font-bold mb-0.5">
          {keyingiSumma.toFixed(3)}
        </div>
        <div className="text-xs opacity-75">
          Hisoblangan natija (0% ayrilma)
        </div>
      </div>

      {/* Ayrilmalar Bilan Section */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-gray-400 uppercase text-xs tracking-wide font-semibold">
            Ayrilmalar Bilan
          </h2>
          <button
            onClick={addDeduction}
            className="text-blue-500 text-xs font-medium hover:text-blue-600"
          >
            + Qo'shish
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {deductions.map((deduction) => (
            <div
              key={deduction.id}
              className="bg-white rounded-lg p-2.5 shadow-sm relative"
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

              <div className="flex justify-between items-center mb-1.5">
                <label className="text-gray-400 text-xs uppercase">
                  Foiz Kiritish
                </label>
              </div>

              <div
                className={`inline-flex items-baseline gap-1 px-2 py-0.5 rounded-lg mb-1.5 ${
                  deduction.foiz < 0 ? "bg-red-50" : "bg-orange-50"
                }`}
              >
                <input
                  type="text"
                  inputMode="decimal"
                  value={deduction.foiz}
                  onChange={(e) => {
                    const value = e.target.value.replace(",", ".");
                    updateDeduction(deduction.id, value);
                  }}
                  className={`text-sm sm:text-base font-bold w-10 sm:w-12 bg-transparent outline-none ${
                    deduction.foiz < 0 ? "text-red-500" : "text-orange-500"
                  }`}
                />
                <span
                  className={`text-xs sm:text-sm font-medium ${
                    deduction.foiz < 0 ? "text-red-500" : "text-orange-500"
                  }`}
                >
                  %
                </span>
              </div>

              <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-0.5">
                {calculateNetResult(deduction.foiz)}
              </div>
              <div className="text-gray-400 text-xs uppercase">Sof Natija</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tarixga saqlash tugmasi */}
      <button
        onClick={saveToHistory}
        className="w-full mt-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
      >
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
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
          />
        </svg>
        <span className="text-sm">Tarixga saqlash</span>
      </button>
    </div>
  );
};

export default Calculator;
