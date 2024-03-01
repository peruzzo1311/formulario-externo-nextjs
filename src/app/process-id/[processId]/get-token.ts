export default async function getToken() {
  const body = JSON.stringify({
    username: 'externo.bpm@prisma-demo.com.br.seniorx',
    password: 'Amsirp@98fm',
  })

  const res = await fetch(
    'https://platform.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/authentication/actions/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    }
  )

  const data = await res.json()

  const token = JSON.parse(data.jsonToken)
    .access_token as string

  return token
}
