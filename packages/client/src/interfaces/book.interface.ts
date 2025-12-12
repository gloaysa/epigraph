export interface IEntry {
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
}

export interface IBook {
  id: string;
  /** Book title as reported by KOReader/metadata. */
  title: string;
  number_of_pages: string;

  /** Book author string; may contain multiple authors separated by newlines. */
  author: string;

  /** Path to the book file on the device or filesystem. */
  file: string;

  /** List of all highlights/notes/bookmarks for this book. */
  entries: IEntry[];
}
