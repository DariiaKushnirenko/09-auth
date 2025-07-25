
import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '../../types/user';
import { NotesResponse, Note } from '../../types/note';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {

      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const getServerNoteById = async (noteId: number): Promise<Note> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const getServerNotes = async ({
  page,
  perPage = 12,
  search,
  tag,
}: {
  page: number;
  perPage?: number;
  search: string;
  tag?: string;
}): Promise<NotesResponse> => {
  const cookieStore = cookies();

  const { data } = await nextServer.get<NotesResponse>('/notes', {
    headers: {
      Cookie: cookieStore.toString(),
    },
    params: {
      page,
      perPage,
      ...(search === '' ? {} : { search }),
      ...(tag === 'All' ? {} : { tag }),
    },
  });

  return data;
};
