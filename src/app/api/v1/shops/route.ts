import generateShopsData from '@utils/generate-shops-data'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request, response: Response) {
  const data = generateShopsData()
  return Response.json(data)
}
