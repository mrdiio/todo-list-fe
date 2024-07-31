import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menu = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Todo',
    href: '/todos',
  },
  {
    title: 'Users',
    href: '/users',
  },
]

export default function HeaderMenu({ display }) {
  const pathname = usePathname()

  return (
    <>
      {display === 'desktop'
        ? menu.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`transition-colors hover:text-foreground ${
                pathname.split('/')[1] === item.href.split('/')[1]
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {item.title}
            </Link>
          ))
        : display === 'mobile' &&
          menu.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`hover:text-foreground ${
                pathname.split('/')[1] === item.href.split('/')[1]
                  ? ''
                  : 'text-muted-foreground'
              }`}
            >
              {item.title}
            </Link>
          ))}
    </>
  )
}
