import Pusher from 'pusher-js';

export function createPusherClient(token) {
  return new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    authEndpoint: '/api/pusher/auth',
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}
