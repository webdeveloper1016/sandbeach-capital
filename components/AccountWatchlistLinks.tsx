import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import Link from 'next/link';
import { labels } from './AccountBalanceHeader';
import { AirTableAccountRoutes } from '../ts';

const accountLinks: AirTableAccountRoutes[] = [
  'm1-taxable',
  'crypto',
  'bryan-roth',
  'm1-emergency',
];

// TODO: fix watchlist menu on mobile
const AccountWatchlistLinks = ({
  active,
}: {
  active: AirTableAccountRoutes;
}) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  });
  return (
    <div className="mb-4 mt-2">
      <div className="hidden md:flex justify-between items-center">
        {accountLinks.map((l) => (
          <Link href={`/account/${l}`} key={l}>
            <a
              className={`border border-current rounded py-1 px-2 hover:bg-gray-900 ${
                active === l && 'text-green-500'
              }`}
            >
              {labels[l]}
            </a>
          </Link>
        ))}
      </div>
      <div
        className="sm:hidden border border-current rounded py-1 px-2 hover:bg-gray-900"
        ref={setReferenceElement}
      >
        Accounts
      </div>
      <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        Popper element
        <div ref={setArrowElement} style={styles.arrow} />
      </div>
    </div>
  );
};

export default AccountWatchlistLinks;
