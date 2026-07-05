import type { ReactElement } from 'react'
import styles from './Sidebar.module.css'
import { clsx } from 'clsx'
import { users } from '@/shared/api/users'
import { Menu } from '@/entities/sidebar/Menu/Menu'
import { Button } from '@/shared/ui/Button/Button.component'

export const Sidebar = async (): Promise<ReactElement> => {
  const userId = await users.getId()

  // const { ok, data: subscriptions } = await request<{ ok: boolean; data: { id: number; username: string }[] }>(
  //   'subscriptions'
  // )

  return (
    <div className={styles.sidebar}>
      <ul className={clsx(styles.menu, styles.list)}>
        {userId && (
          <>
            <li>
              <Button as="link" className={styles.button} appearance="transparent" href="/" icon="home">
                Главная
              </Button>
            </li>

            {/*<Menu
              icon='group'
              opened='desktop'
              title='Подписки'
              list={
                ok &&
                !!subscriptions.length &&
                subscriptions.map(item => (
                  <li className={styles.subscription} key={item.id}>
                    <Button as="link"
                      className={clsx(styles.subscription, styles.button)}
                      href={`/user/${item.username}`}
                      appearance='transparent'
                    >
                      {item.username}
                    </Button>
                  </li>
                ))
              }
            />*/}

            <li>
              <Button as="link" className={styles.button} appearance="transparent" href="/editor?new" icon="add_circle">
                Создать
              </Button>
            </li>
            <li>
              <Button as="link" className={styles.button} appearance="transparent" href="/profile" icon="person">
                Профиль
              </Button>
            </li>

            <Menu
              icon="more_horiz"
              opened="desktop"
              title="Другое"
              list={
                <>
                  <li>
                    <Button
                      as="link"
                      className={styles.button}
                      appearance="transparent"
                      href="/profile/settings"
                      icon="settings"
                    >
                      Настройки
                    </Button>
                  </li>
                  <li>
                    <Button
                      as="link"
                      className={styles.button}
                      appearance="transparent"
                      href="https://github.com/fb24m/link/issues"
                      icon="bug_report"
                    >
                      Нашли ошибку?
                    </Button>
                  </li>
                </>
              }
            />
          </>
        )}
      </ul>

      {/* {ownedCommunities.length > 0 && <>
				<strong className={styles.title}>Сообщества</strong>

				<ul className={styles.list}>
					{ownedCommunities.map((item) =>
						<li key={item.id}><Button href={`/communities/${item.id}`} appearance="transparent">{item.name}</Button></li>
					)}
				</ul>
			</>} */}

      {!userId && (
        <Button as="link" appearance="primary" href="/login" className={styles.loginButton}>
          Войти
        </Button>
      )}

      <div className={styles.cookies}>
        <span>🍪</span>NextLink тоже использует Cookies
      </div>
    </div>
  )
}
