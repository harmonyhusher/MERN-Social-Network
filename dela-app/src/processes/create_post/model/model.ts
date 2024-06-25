import { api } from '@src/shared/api';
import { IUser } from '@src/shared/interfaces/entities/User.interface';

import { createMutation } from '@farfetched/core';
import { createEvent, sample } from 'effector';

type PostMutationType = {
  userId: string;
  descirption: string;
};

export const createPost = createMutation({
  handler: async (post: PostMutationType) => {
    const response = await api.post<PostMutationType>('posts', post);
    return response.data;
  },
});

const sendPost = createEvent<PostMutationType>();

sample({
  clock: sendPost,
  target: createPost.start,
});

export { sendPost };