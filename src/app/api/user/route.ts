// import { getUserByEmail } from '@services/db/read.services'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const email = await req.text()
  //   const user = await getUserByEmail(email)

  console.log(email)
}
