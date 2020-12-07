import Link from 'next/link';

const links = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/insights', label: 'Insights' },
  { href: '/savings', label: 'Savings' },
];

const Nav = () => (
  <nav>
    <ul className="flex items-center justify-between p-8">
      <li>
        <Link href="/">
          <a className="text-green-500 no-underline">Home</a>
        </Link>
      </li>
      <ul className="flex items-center justify-between space-x-4">
        {links.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <Link href={href}>
              <a className="no-underline px-4 py-2 font-bold text-white bg-green-500 rounded">
                {label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </ul>
  </nav>
);

export default Nav;
