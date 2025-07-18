import axios from 'axios';
import type { Note, NotesResponse, NewNoteData} from "../types/note";

// const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const nextServer = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true, // дозволяє axios працювати з cookie
});


export const fetchNoteById = async (noteId: number): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${noteId}`, {

  });

  return response.data;
};

export const createNote = async (noteData: NewNoteData) => {
  const response = await nextServer.post<Note>("/notes", noteData, {
  });
  return response.data;
  
};


export const deleteNote = async (noteId: number) : Promise<Note>  => {
  const response = await nextServer.delete(`/notes/${noteId}`, {
  });
  return response.data;
};

export interface NotesParams {
  search: string;
  tag?: string;
  page: number;
  perPage?: number;
}

export const getNotes = async ({
  page,
  perPage = 12,
  search,
  tag,
}: NotesParams): Promise<NotesResponse> => {
  const response = await nextServer.get<NotesResponse>('/notes', {
    params: {
      page,
      perPage,
      ...(search === "" ? {} : { search }),
      ...(tag === "All" ? {} : { tag }),
    },
  });

  return response.data;
};

export { nextServer };