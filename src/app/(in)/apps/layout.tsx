// import { users } from '@/shared/api/users'
import type { ReactElement, ReactNode } from 'react'

const AppsLayout = async ({ children }: { children: ReactNode }): Promise<ReactElement> => {
  // const user = await users.getMe()

  return <div>{children}</div>
}

export default AppsLayout
