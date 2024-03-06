import { RefObject, useEffect } from 'react';

export function useSideBarClose(
	rootRef: RefObject<HTMLElement>,
	isOpen: boolean,
	setIsOpen: (isOpen: boolean) => void
) {
	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (
				rootRef.current &&
				!rootRef.current.contains(event.target as HTMLElement)
			) {
				setIsOpen(false);
			}
		}
		if (isOpen) {
			window.addEventListener('mousedown', handleClick);
		}
		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen]);
}
