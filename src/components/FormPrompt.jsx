"use client";

import { useState } from "react";

function FormPromt() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("api/generate/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      console.log(data);
      setResult(data);
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
    setPrompt("");
  };

  return (
    <section>
      <form
        onSubmit={submitHandler}
        className="border border-slate-500 flex flex-col items-center justify-center mt-10 mx-2 h-52 gap-5 rounded w-full md:w-2/6 md:mx-auto"
      >
        <div className="w-11/12 ">
          <label htmlFor="prompt">Programming toppic</label>
          <input
            id="prompt"
            type="text"
            className="block h-9 rounded w-full mt-3 ps-2"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          />
        </div>
        <button
          className="px-4 py-2 bg-slate-500 text-white hover:bg-slate-400 w-11/12 disabled:opacity-50"
          disabled={!prompt || loading}
        >
          {loading ? "Thinking..." : "Generate"}
        </button>
      </form>
      {result && (
        <p className="text-green mx-auto max-w-sm mt-5 text-center">{result}</p>
      )}
    </section>
  );
}
export default FormPromt;
