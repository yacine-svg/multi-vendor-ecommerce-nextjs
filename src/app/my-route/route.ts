import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  })
  await payload.find({
    collection: 'categories',
  })

  return Response.json({
    message: 'This is an example of a custom route.',
  })
}
