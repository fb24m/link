import { ProfileMenu } from '@/entities/profile/ProfileMenu/ProfileMenu'
import { exists } from '@/shared/utils/exists'
import { posts } from '@/shared/api/posts'
import { users } from '@/shared/api/users'
import { UserProfile } from '@/widgets/UserProfile/UserProfile.component'
import { ReactNode } from 'react'

const ProfileLayout = async ({ children }: { children: ReactNode }) => {
  const user = await users.getMe()
  const myposts = await posts.getMine()

  if (!user) {
    // redirect('/auth/login')
  }

  return (
    <>
      <UserProfile postsCount={exists<number>(myposts?.length)} selfProfile user={user} />
      <ProfileMenu />
      {children}
    </>
  )
}

export default ProfileLayout
