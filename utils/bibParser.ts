import { Publication, PublicationType } from '../types';

export function parseBibTex(bibtex: string): Publication[] {
  const publications: Publication[] = [];
  
  // Clean up input and split by entries
  // Matches @type{id, ...}
  const rawEntries = bibtex.split(/@(\w+)\s*{/g).slice(1);

  for (let i = 0; i < rawEntries.length; i += 2) {
    try {
      const typeStr = rawEntries[i].toLowerCase();
      const content = rawEntries[i + 1];
      
      // Extract ID (everything before the first comma)
      const idMatch = content.match(/^\s*([^,]+),/);
      if (!idMatch) continue;
      const id = idMatch[1].trim();

      // Extract fields
      const getField = (field: string) => {
        // Matches field = {value} or field = "value" or field = value
        const regex = new RegExp(`${field}\\s*=\\s*(?:{([\\s\\S]*?)}|"([\\s\\S]*?)"|([\\w-]+))`, 'i');
        const match = content.match(regex);
        if (!match) return '';
        // Return whichever group matched
        return (match[1] || match[2] || match[3] || '').replace(/\s+/g, ' ').trim();
      };

      const title = getField('title').replace(/[{}]/g, ''); // Remove LaTeX braces
      const authorStr = getField('author');
      const yearStr = getField('year');
      const journal = getField('journal');
      const booktitle = getField('booktitle');
      const url = getField('url');
      const doi = getField('doi');
      const eprint = getField('eprint');
      const abstract = getField('abstract');

      if (!title) continue;

      // Parse authors
      const authors = authorStr.split(/\s+and\s+/i).map(a => {
        // Clean up LaTeX chars and normalize spaces
        const clean = a.replace(/[{}]/g, '').trim();
        // Handle "Last, First" -> "First Last"
        if (clean.includes(',')) {
          const [last, first] = clean.split(',').map(s => s.trim());
          return `${first} ${last}`;
        }
        return clean;
      });

      let type = PublicationType.JOURNAL;
      let venue = journal;

      if (typeStr === 'inproceedings' || typeStr === 'conference') {
        type = PublicationType.CONFERENCE;
        venue = booktitle;
      } else if (typeStr === 'misc' || typeStr === 'unpublished' || typeStr === 'techreport') {
        type = PublicationType.PREPRINT;
        venue = eprint ? `arXiv:${eprint}` : 'Preprint';
      }

      // Prefer DOI link if URL is missing
      const finalUrl = url || (doi ? `https://doi.org/${doi}` : undefined) || (eprint ? `https://arxiv.org/abs/${eprint}` : '#');

      publications.push({
        id,
        title,
        authors,
        venue: venue || 'Unknown Venue',
        year: parseInt(yearStr) || new Date().getFullYear(),
        type,
        url: finalUrl,
        abstract: abstract || undefined
      });
    } catch (e) {
      console.warn("Error parsing bibtex entry", e);
    }
  }

  return publications.sort((a, b) => b.year - a.year);
}