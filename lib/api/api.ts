import axios from 'axios';
import type { Note,  NewNoteData} from '../../types/note'


// const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
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

export { nextServer };