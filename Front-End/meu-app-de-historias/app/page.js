"use client";

import { useState } from 'react';

// Componente de Ícone (SVG embutido para não precisar de bibliotecas externas)
const BookOpenIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const SparklesIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9L12 21l1.9-5.8 5.8-1.9-5.8-1.9L12 3z" />
        <path d="M5 3v4" />
        <path d="M19 17v4" />
        <path d="M3 5h4" />
        <path d="M17 19h4" />
    </svg>
);

export default function StoryGeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError("Por favor, digite uma ideia para a história.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setStory('');

    try {
      const response = await fetch('http://localhost:8000/api/v1/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: `Crie uma história seguindo essas ideias, por favor, faça uma história lúdica e divertida, com personagens cativantes e um enredo envolvente sobre: ${prompt}. Use uma linguagem simples e acessível para crianças, incorporando elementos de fantasia e aventura. Certifique-se de que a história tenha um começo, meio e fim claros, com uma mensagem positiva ou lição no final. Evite temas complexos ou assustadores, mantendo o tom leve e alegre. A história deve ter no máximo 100 tokens.` }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || `Ocorreu um erro no servidor: ${response.statusText}`);
      }

      const data = await response.json();
      setStory(data.response);

    } catch (err) {
      console.error("Falha ao chamar a API:", err);
      setError(err.message || 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl bg-slate-800 rounded-xl shadow-2xl p-6 md:p-8 space-y-6">

        <div className="flex items-center space-x-3">
          <BookOpenIcon className="h-8 w-8 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold">Gerador de Histórias Infantis</h1>
            <p className="text-slate-400">Transforme sua imaginação em uma pequena história.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">
              Descreva sua ideia
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: Um leão medroso que fez amizade com um rato corajoso..."
              className="w-full h-28 p-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow duration-200 resize-none"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center px-4 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold rounded-md transition-colors duration-200"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Gerando História...
              </>
            ) : (
              'Gerar História'
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-700">
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-md">
              <p className="font-semibold">Ops, algo deu errado!</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          {story && !error && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <SparklesIcon className="h-6 w-6 text-amber-400"/>
                <span>Sua História Mágica</span>
              </h2>
              <div className="bg-slate-700/50 p-4 rounded-md whitespace-pre-wrap text-slate-300">
                {story}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
