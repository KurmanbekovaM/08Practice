const { test, expect } = require('@playwright/test');

test('Отправить запрос к API lalafo с Bearer токеном и дополнительными заголовками', async ({ request }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTU1OTg5NTcsImFjY2Vzc190b2tlbiI6InZJTzJOekU2R0hSNENoTmlYWThEdlZLRkhLQzZWeEpyIiwiYXZhdGFyIjoiaHR0cHM6XC9cL2ltZzUubGFsYWZvLmNvbVwvaVwvYXZhdGFyXC9jOFwvNGVcLzk2XC8zN2UzZmI1Nzg5NzFhZDQ0NDAxYzYzZTk5Zi5qcGVnIiwidXNlcm5hbWUiOiJNYWxpa2EgS3VybWFuYmVrb3ZhIiwicHJvIjpmYWxzZX0.QCCPPXURykpR-PspMHxYnZSxwgq4XlLr0rBkot7j5IQ',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Accept-Language': 'en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7',
    'Cache-Control': 'no-cache',
    'Cookie': '_hjSessionUser_3562562=eyJpZCI6IjY4NzgwNWQyLWNiOTUtNTNlMy1iZTZiLTg0ZjgwZjY1YzZhNSIsImNyZWF0ZWQiOjE3MTM1NzU5NDI1NzUsImV4aXN0aW5nIjp0cnVlfQ==; event_user_hash=4f6c987e-a31a-40ff-9dd5-e36711b5df7d; _gcl_au=1.1.1756865749.1725805451; onboarding_wallet_balance_in_header=true; event_session_id=3d6f59f1f74971f3d3af9b0d09a469a2; _hjSession_3562562=eyJpZCI6ImE2YTM2ZTM4LWIyNzEtNDY2OC1iODE3LTc1ODI4MTgxYmQ3NiIsImMiOjE3MzM0MTY1Mzk4NTMsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; _gid=GA1.2.1803782299.1733418611; _ga=GA1.1.1140734327.1725805451; cf_clearance=Wd_nrN1ah4Idj8fOiU_jQfxMDxqYyF40pqT0GZ2LStg-1733423524-1.2.1.1-JvVAsWGXJ17ENAEEKJ.4I87pBdGXs.Qw8ZF_udr5qamSTlUH4tcSVub6ifKOrbor_ObBS0wefUA3CSqZwcWFf5_DQ7_yU4KiCeEw63iabpCho07OEH0xl82cGBc77GPvRX.K.PXaZgYr3OVUejl9DPKI.JTfPXS5M5_kFGEjdncULNSrP0yDFWh8WSR2bx7cMK3WjUFx9WTjdUEbe5HN8zGqfQ__PfRACorts.pHAEzv.vxBHqQk_n5AE0HoVTPv5HaRQmhP4L1cgAG509GYTZB3I8N9W9RGxXh9ARarOhV50ugZjUbf_kszic7IIUX7NcLgeg4wUpYdK7IByYewHO4k5x91g0dkDE.XArDZ_tx2qu5pRf0VfsAk5ZIljUAybTzq2G.uAOqhMwPqg96Z7A; device_fingerprint=2757441c9fcc66ad6de0ee79046c8aa1; experiment=novalue; _ga_Z4VRYJ4XGN=GS1.1.1733416539.28.1.1733423623.0.0.0',
    'Country-ID': '12',
    'Device': 'pc',
    'Language': 'ru_RU',
    'Referer': 'https://lalafo.kg/',
    'Request-ID': 'react-client_eae36bb8-1a5f-4707-8e05-85660de31a51',
    'Sec-CH-UA': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'Sec-CH-UA-Mobile': '?0',
    'Sec-CH-UA-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Hash': '4f6c987e-a31a-40ff-9dd5-e36711b5df7d',
  };

  const response = await request.get(
    'https://lalafo.kg/api/proxy/catalog/v3/categories/tree',
    { headers: headers }
  );

  console.log(await response.text()); 

  // Проверка успешного статуса
  expect(response.status()).toBe(200);

  // Проверка на отсутствие XSS
  const responseText = await response.text();
  expect(responseText).not.toMatch(/<script.*?>.*?<\/script>/i); // Убедитесь, что в ответе нет тегов <script>

  // Проверка, что чувствительные данные не возвращаются в ответе
  const responseJson = await response.json();
  expect(responseJson).not.toHaveProperty('password'); // Например, если не должно быть пароля в ответе

  // Проверка на правильные заголовки CORS
  const corsHeader = response.headers()['access-control-allow-origin'];
  expect(corsHeader).toBe('*'); // Или конкретный домен, если используется ограничение

});
