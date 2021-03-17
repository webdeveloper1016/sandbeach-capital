import React from 'react';
import { usePopper } from 'react-popper';
import Link from 'next/link';
import { labels } from './AccountBalanceHeader';
import { AirTableAccountRoutes } from '../ts';

const accountLinks: AirTableAccountRoutes[] = [
  'robinhood-core',
  'robinhood-moon',
  'robinhood-income',
  'robinhood-aw',
  'crypto',
  'bryan-roth',
];

const MobileMenu = ({ active }: { active: AirTableAccountRoutes }) => {
  const [showPopper, setShowPopper] = React.useState(false);
  const [arrowRef, setArrowRef] = React.useState(null);
  const buttonRef = React.useRef(null);
  const popperRef = React.useRef(null);

  const { styles, attributes } = usePopper(
    buttonRef.current,
    popperRef.current,
    {
      modifiers: [
        {
          name: 'arrow',
          options: {
            element: arrowRef,
          },
        },
        {
          name: 'offset',
          options: {
            offset: [0, 10],
          },
        },
      ],
    },
  );

  return (
    <div className="sm:hidden">
      <div
        className={`border border-current rounded py-1 px-2 ${
          showPopper && 'bg-gray-900'
        }`}
        ref={buttonRef}
        onClick={() => setShowPopper(!showPopper)}
      >
        Accounts
      </div>
      {showPopper ? (
        <div
          ref={popperRef}
          style={styles.popper}
          {...attributes.popper}
          className="w-full"
        >
          <div ref={setArrowRef} style={styles.arrow} id="arrow" />
          <div className="mx-7 bg-black border border-current rounded px-3 py-1">
            <div className="flex flex-col">
              {accountLinks.map((l) => (
                <Link href={`/account/${l}`} key={l}>
                  <a
                    className={`border border-current rounded py-1 px-2 my-2 ${
                      active === l && 'text-green-500'
                    }`}
                    onClick={() => setShowPopper(false)}
                  >
                    {labels[l]}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const AccountWatchlistLinks = ({
  active,
}: {
  active: AirTableAccountRoutes;
}) => {
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
      <MobileMenu active={active} />
    </div>
  );
};

export default AccountWatchlistLinks;
