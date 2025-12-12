import { hashString } from '../utils/hash-string';
import { z } from 'zod';

export const EntrySchema = z.object({
  pn_xp: z.string(),
  drawer: z.string(),
  color: z.string(),
  time: z.number().int(), // unix seconds
  sort: z.string(),
  chapter: z.string(),
  page: z.number().int(),
  text: z.string(),
  note: z.string().optional(),
});

const BookSchema = z.object({
  title: z.string().default(''),
  author: z.string().default(''),
  number_of_pages: z.number(),
  file: z.string(),
  entries: z.array(EntrySchema).default([]),
});

const FileExport = z.object({
  version: z.number(),
  exported_at: z.string(),
  books: z.array(BookSchema).default([]),
});

type TBookSchema = z.infer<typeof BookSchema>;
type TEntrySchema = z.infer<typeof EntrySchema>;

export class KoReaderExport {
  static parse(jsonString: string) {
    const data = FileExport.parse(JSON.parse(jsonString));

    return {
      version: data.version,
      exported_at: data.exported_at,
      books: data.books.map((b) => new BookResponse(b)),
    };
  }
}

export class BookResponse {
  id: string;
  title: string;
  authors: string[];
  numberOfPages: number;
  file: string;
  entries: EntryResponse[];

  constructor(book: TBookSchema) {
    this.id = hashString(`${book.title} - ${book.author}`);
    this.authors = this.formatAuthors(book.author);
    this.title = book.title;
    this.numberOfPages = book.number_of_pages;
    this.file = book.file;
    this.entries = book.entries.map((e) => new EntryResponse(e));
  }

  private formatAuthors(authors: string): string[] {
    if (!authors) {
      return [];
    }

    return authors
      .split('\n')
      .map((a) => a.trim())
      .filter(Boolean);
  }
}

export class EntryResponse {
  id: string;
  /** Internal KOReader position identifier. */
  pn_xp: string;

  /** Type of mark, e.g. "lighten" for highlight, "underline", etc. */
  drawer: string;

  /** Color used for the highlight/mark (e.g. "gray"). */
  color: string;

  /** Unix timestamp (in seconds) when the entry was created. */
  time: number;

  /** Kind of entry, e.g. "highlight", "note", "bookmark". */
  sort: string;

  /** Chapter title or section where this entry belongs. */
  chapter: string;

  /** Page number in the book where this entry appears. */
  page: number;

  /** The highlighted text or main content of the clipping. */
  text: string;

  /** Optional user note attached to this clipping. */
  note?: string;

  constructor(entry: TEntrySchema) {
    this.id = hashString(`${entry.time}`);
    this.pn_xp = entry.pn_xp;
    this.drawer = entry.drawer;
    this.color = entry.color;
    this.time = entry.time;
    this.sort = entry.sort;
    this.chapter = entry.chapter;
    this.page = entry.page;
    this.text = entry.text;
    this.note = entry.note;
  }
}
