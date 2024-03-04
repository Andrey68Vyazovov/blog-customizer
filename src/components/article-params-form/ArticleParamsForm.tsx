import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Select } from '../select/Select';
import { RadioGroup } from '../radio-group/RadioGroup';
import { Separator } from '../separator/Separator';
import { SideBarClose } from '../SideBarClose/SideBarClose';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type TArticleProps = {
	props: ArticleStateType;
	onChange: (options: ArticleStateType) => void;
};

function useLocalStorage<T>(
	key: string,
	initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
	const [value, setValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch {
			return initialValue;
		}
	});
	useEffect(() => {
		try {
			const item = JSON.stringify(value);
			window.localStorage.setItem(key, item);
		} catch (error: any) {
			console.log(error.message);
		}
	}, [value]);
	return [value, setValue];
}

export const ArticleParamsForm = ({ props, onChange }: TArticleProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [state, setState] = useLocalStorage<ArticleStateType>('state', props);

	function toogleArrowButton() {
		setIsOpen(!isOpen);
	}

	function submitForm(e: React.SyntheticEvent) {
		e.preventDefault();
		onChange({
			fontFamilyOption: state.fontFamilyOption,
			fontColor: state.fontColor,
			backgroundColor: state.backgroundColor,
			contentWidth: state.contentWidth,
			fontSizeOption: state.fontSizeOption,
		});
	}

	function resetForm() {
		setState(defaultArticleState);
		onChange({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontSizeOption: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});
	}

	return (
		<SideBarClose isOpen={isOpen} setIsOpen={setIsOpen}>
			<ArrowButton isOpen={isOpen} onClick={toogleArrowButton} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={submitForm}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						options={fontFamilyOptions}
						selected={state.fontFamilyOption}
						title='шрифт'
						onChange={(selected) =>
							setState({ ...state, fontFamilyOption: selected })
						}
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						name='radio'
						onChange={(selected) =>
							setState({ ...state, fontSizeOption: selected })
						}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={state.fontColor}
						title='Цвет шрифта'
						onChange={(selected) => setState({ ...state, fontColor: selected })}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={state.backgroundColor}
						title='Цвет фона'
						onChange={(selected) =>
							setState({ ...state, backgroundColor: selected })
						}
					/>
					<Select
						options={contentWidthArr}
						selected={state.contentWidth}
						title='Ширина контента'
						onChange={(selected) =>
							setState({ ...state, contentWidth: selected })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</SideBarClose>
	);
};
