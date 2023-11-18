import { rest } from 'msw'

import { getResponse } from '../testUtils/response'
import { nearbyStorage } from '../mockData/nearbyStorage'

const baseUrl = process.env.NEXT_PUBLIC_API_URL

const nearbyStorageHandler = [
  rest.get(`${baseUrl}/api/channel/group/nearby`, async (req, res, ctx) => {
    return res(ctx.json(getResponse('근처 창고 조회 성공', { nearbyStorage }, true)))
  }),
]

export default nearbyStorageHandler
