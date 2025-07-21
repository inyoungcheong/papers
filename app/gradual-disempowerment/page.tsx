// First, install: npm install bibtex-parser

'use client'
import { useState, useEffect } from 'react'

// Define proper types for citations
type BookCitation = {
  type: 'book'
  author: string
  title: string
  publisher: string
  year: string
}

type ArticleCitation = {
  type: 'article'
  author: string
  title: string
  journal: string
  volume?: string
  number?: string
  pages?: string
  year: string
}

type Citation = BookCitation | ArticleCitation

type CitationData = Record<string, Citation>

// This would be your parsed .bib data (from build time or static import)
// You can fetch this from GitHub raw URL or import locally
const bibData: CitationData = {
  "russell2019human": {
    type: "book",
    author: "Russell, Stuart",
    title: "Human Compatible: Artificial Intelligence and the Problem of Control",
    publisher: "Viking Press",
    year: "2019"
  },
  "bostrom2014superintelligence": {
    type: "book", 
    author: "Bostrom, Nick",
    title: "Superintelligence: Paths, Dangers, Strategies",
    publisher: "Oxford University Press",
    year: "2014"
  },
  "bengio2024governance": {
    type: "article",
    author: "Bengio, Yoshua",
    title: "International governance of AI research",
    journal: "Nature Machine Intelligence",
    volume: "6",
    number: "2", 
    pages: "123--135",
    year: "2024"
  }
}

// Citation mapping - maps citation keys to display numbers
const citationMap = {
  "russell2019human": 1,
  "bostrom2014superintelligence": 2,
  "bengio2024governance": 3
}

// Function to fetch and parse .bib file from GitHub
async function fetchBibFromGitHub(url: string): Promise<CitationData> {
  try {
    await fetch(url)
    // You'd use a BibTeX parser here like 'bibtex-parser'
    // const parsedBib = parseBibTeX(bibText)
    // return parsedBib
    
    return bibData // For now, return static data
  } catch (error) {
    console.error('Failed to fetch .bib file:', error)
    return bibData
  }
}

// Citation component with BibTeX data
function Citation({ 
  bibKey, 
  className = "" 
}: { 
  bibKey: string, 
  className?: string 
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [citations, setCitations] = useState(bibData)
  
  // Load .bib file on component mount
  useEffect(() => {
    async function loadBib() {
      // Replace with your GitHub raw URL
      const githubBibUrl = 'https://raw.githubusercontent.com/username/repo/main/references.bib'
      const loadedCitations = await fetchBibFromGitHub(githubBibUrl)
      setCitations(loadedCitations)
    }
    
    loadBib()
  }, [])
  
  const citation = citations[bibKey as keyof typeof citations]
  const citationNumber = citationMap[bibKey as keyof typeof citationMap]
  
  if (!citation || !citationNumber) {
    console.warn(`Citation not found: ${bibKey}`)
    return <span className="text-red-500">[?]</span>
  }

  const formatCitation = (cite: Citation) => {
    const authors = cite.author?.replace(/,\s*([^,]+)$/g, ' and $1') || 'Unknown Author'
    
    if (cite.type === 'book') {
      return `${authors} (${cite.year}). ${cite.title}. ${cite.publisher}.`
    } else if (cite.type === 'article') {
      let formatted = `${authors} (${cite.year}). ${cite.title}. ${cite.journal}`
      if (cite.volume) formatted += `, ${cite.volume}`
      if (cite.number) formatted += `(${cite.number})`
      if (cite.pages) formatted += `, ${cite.pages.replace('--', '–')}`
      return formatted + '.'
    } else {
      // This handles any unexpected citation types
      return `${authors} (${cite.year}). ${cite.title}.`
    }
  }

  return (
    <span className="relative inline-block">
      <button 
        type="button"
        className={`text-blue-600 hover:text-neutral-700 transition-all duration-200 font-medium text-sm bg-transparent border-none cursor-pointer p-0 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          const element = document.getElementById(bibKey);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        [{citationNumber}]
      </button>
      
      {/* BibTeX Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 max-w-sm z-50">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-sm text-gray-700 font-sans leading-relaxed">
            <div className="text-sm">{formatCitation(citation)}</div>
            
            {/* BibTeX entry preview */}
            <details className="mt-3">
              <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
                Show BibTeX
              </summary>
              <pre className="text-xs text-gray-600 mt-2 bg-gray-50 p-2 rounded overflow-x-auto">
{`@${citation.type}{${bibKey},
  author = {${citation.author}},
  title = {${citation.title}},
  year = {${citation.year}},${citation.type === 'book' ? `
  publisher = {${citation.publisher}}` : `
  journal = {${citation.journal}}`}
}`}
              </pre>
            </details>
            
            {/* Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
              <div className="w-2 h-2 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
            </div>
          </div>
        </div>
      )}
    </span>
  )
}

// Usage in your main page:
export default function MainPage() {
  // ... rest of your component

  return (
    <div className="min-h-screen bg-white font-serif">
      {/* ... your existing content ... */}
      
      <main className="max-w-4xl mx-auto px-6 py-12 lg:ml-80">
        <article className="prose prose-lg max-w-none">
          {/* Example usage with BibTeX keys */}
          <p>
            This loss of human influence will be centrally driven by having more competitive 
            machine alternatives to humans in almost all societal functions{' '}
            <Citation bibKey="russell2019human" />.
          </p>
          
          <p>
            A growing body of research points to the possibility that artificial intelligence 
            might eventually pose a large-scale or even existential risk to humanity{' '}
            <Citation bibKey="bostrom2014superintelligence" />.
          </p>
          
          <p>
            If systems become less reliant on human labor and cognition, human ability to 
            align them would decrease substantially{' '}
            <Citation bibKey="bengio2024governance" />.
          </p>
        </article>
      </main>
    </div>
  )
}
