import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useRef, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const dataStorage = JSON.parse(String(localStorage.getItem('state')));
	const optionsRef = useRef({
		fontFamilyOption: dataStorage
			? dataStorage.fontFamilyOption
			: defaultArticleState.fontFamilyOption,
		fontColor: dataStorage
			? dataStorage.fontColor
			: defaultArticleState.fontColor,
		backgroundColor: dataStorage
			? dataStorage.backgroundColor
			: defaultArticleState.backgroundColor,
		contentWidth: dataStorage
			? dataStorage.contentWidth
			: defaultArticleState.contentWidth,
		fontSizeOption: dataStorage
			? dataStorage.fontSizeOption
			: defaultArticleState.fontSizeOption,
	});

	const [option, setOption] = useState(optionsRef.current);

	function handleChangeOptions({
		fontFamilyOption,
		fontColor,
		backgroundColor,
		contentWidth,
		fontSizeOption,
	}: typeof defaultArticleState) {
		optionsRef.current = {
			fontFamilyOption: fontFamilyOption,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSizeOption,
		};
		setOption(optionsRef.current);
	}

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': option.fontFamilyOption.value,
					'--font-size': option.fontSizeOption.value,
					'--font-color': option.fontColor.value,
					'--container-width': option.contentWidth.value,
					'--bg-color': option.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				props={optionsRef.current}
				onChange={handleChangeOptions}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
