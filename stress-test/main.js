import http from 'k6/http';
import { sleep, check, group } from 'k6';

import { requestLogin, requestRegister, requestFind } from './auth.js';

const baseUrl = 'http://localhost:3000';

export const options = {
  vus: 30,
  duration: '30s',
  discardResponseBodies: true,
  thresholds: {
    checks: ['rate>0.9'],
    'failed login request': ['rate < 0.1'],
    'failed register request': ['rate < 0.1'],
  },
};

// export function setup() {
//   const res = http.post(`${baseUrl}/users/login`, {
//     username: 'breno1@breno.com',
//     password: '123',
//   });
//   const [, token] = res.body.token

//   return { token };
// }

export default function (data) {
  const res = http.get(baseUrl);

  check(res, {
    'status is OK': res => res.status === 200,
  });
  group('Authorization', () => {
    requestLogin(baseUrl);
    // requestRegister(baseUrl);
    requestFind(baseUrl);
  });
  sleep(1);
}