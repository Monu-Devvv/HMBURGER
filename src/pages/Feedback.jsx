import { useState } from "react";

export default function Feedback({ onClose }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const handleSubmit = () => {
    const feedbackData = {
      rating,
      text,
      date: new Date().toISOString(),
    };

   
    const old = JSON.parse(localStorage.getItem("feedbacks")) || [];
    localStorage.setItem("feedbacks", JSON.stringify([...old, feedbackData]));

    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-lg bg-black/40 flex items-center justify-center z-50">
      
      <div className="bg-white/20 backdrop-blur-xl p-6 rounded-2xl shadow-xl w-[90%] md:w-[400px] text-white">

        <h2 className="text-2xl font-bold mb-4 text-center">
          🎉 Order Delivered
        </h2>

        <div className="flex justify-center gap-2 mb-4">
          {[1,2,3,4,5].map((i) => (
            <span
              key={i}
              onClick={() => setRating(i)}
              className={`cursor-pointer text-2xl ${
                i <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ⭐
            </span>
          ))}
        </div>

        <textarea
          placeholder="Your feedback..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 rounded bg-white/30 text-white mb-4"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 py-2 rounded"
        >
          Submit 🚀
        </button>

      </div>
    </div>
  );
}