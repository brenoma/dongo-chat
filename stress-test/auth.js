import { check } from 'k6';
import http from 'k6/http';
import { Rate } from 'k6/metrics';
import faker from 'https://unpkg.com/faker@5.1.0/dist/faker.js';

const loginFailedRate = new Rate('failed login request');
const registerFailedRate = new Rate('failed register request');
const emailDomain =  Math.random().toString(36).substring(2, 15) + '.lol';

export function requestLogin(baseUrl) {
  const payload = JSON.stringify({
    username: 'breno1@breno.com',
    password: '123',
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const res = http.post(`${baseUrl}/users/login`, payload, params);

  const result = check(res, {
    'Login successfully': res => res.status === 201,
    'JSON response': res => /json/.test(res.headers['Content-Type']),
  });
  loginFailedRate.add(!result);
}

export function requestRegister(baseUrl) {
  const payload = JSON.stringify({
    name: faker.name.findName(),
    email: `stress_${__VU}+${__ITER}@${emailDomain}`,
    password: faker.internet.password(),
    role: 'admin'
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const res = http.post(`${baseUrl}/users/create`, payload, params);

  const result = check(res, {
    'Register successfully': res => res.status === 201,
    'Authorization header': /Bearer\s+.*/.test(res.headers.Authorization),
    'JSON response': res => /json/.test(res.headers['Content-Type']),
  });
  registerFailedRate.add(!result);
}

export function requestFind(baseUrl) {
  const payload = JSON.stringify({
    email: 'breno1@breno.com',
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const res = http.post(`${baseUrl}/users/find`, payload, params);

  check(res, {
    'Get user session': res => res.status === 201,
  });
}