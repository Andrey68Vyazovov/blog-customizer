import { ReactNode, useRef } from 'react';
import { useSideBarClose } from './hooks/useSideBarClose';

type TSideBarProps = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	children: ReactNode;
};

export function SideBarClose({ isOpen, setIsOpen, children }: TSideBarProps) {
	const rootRef = useRef(null);
	useSideBarClose(rootRef, isOpen, setIsOpen);
	return <div ref={rootRef}>{children}</div>;
}
