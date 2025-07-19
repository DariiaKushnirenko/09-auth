import { nextServer } from './api';
import { User } from '../../types/user';
import { Note, NewNoteData, NotesResponse } from '../../types/note';

export type RegisterRequest = {
  email: string;
  password: string;
};

export const checkSession = async (): Promise<boolean> => {
  try {
    await nextServer.get('/auth/session');
    return true;
  } catch {
    return false;
  }
};

export const register = async (payload: RegisterRequest) => {
  const { data } = await nextServer.post<User>(`/auth/register`, payload)
  return data
}

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export type UpdateUserRequest = {
  username?: string;
  photoUrl?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
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

export const fetchNoteById = async (noteId: number): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${noteId}`);
  return response.data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", noteData);
  return response.data;
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  const response = await nextServer.delete(`/notes/${noteId}`);
  return response.data;
};
