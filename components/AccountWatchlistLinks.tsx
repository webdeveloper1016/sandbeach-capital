import React from 'react';
import { usePopper } from 'react-popper';
import Link from 'next/link';
import { MenuItemModel } from '../ts';

const MobileMenu = ({
  active,
  items,
}: {
  active: string;
  items: MenuItemModel[];
}) => {
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
              {items.map((l) => (
                <Link href={`/account/${l.id}`} key={l.id}>
                  <a
                    className={`border border-current rounded py-1 px-2 my-2 ${
                      active === l.id && 'text-green-500'
                    }`}
                    onClick={() => setShowPopper(false)}
                  >
                    {l.nickname}
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
  items,
}: {
  active: string;
  items: MenuItemModel[];
}) => {
  return (
    <div className="mb-4 mt-2">
      <div className="hidden md:flex justify-between items-center">
        {items.map((l) => (
          <Link href={`/account/${l.id}`} key={l.id}>
            <a
              className={`border border-current rounded py-1 px-2 hover:bg-gray-900 ${
                active === l.id && 'text-green-500'
              }`}
            >
              {l.nickname}
            </a>
          </Link>
        ))}
      </div>
      <MobileMenu active={active} items={items} />
    </div>
  );
};

export default AccountWatchlistLinks;
