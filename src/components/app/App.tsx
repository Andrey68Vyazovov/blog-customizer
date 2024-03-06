import { CSSProperties, useState } from 'react';
import { defaultArticleState } from '../../constants/articleProps';
import styles from '../../styles/index.module.scss';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { Article } from '../article/Article';
import '../../styles/index.scss';

export const App = () => {
	const dataStorage = JSON.parse(String(localStorage.getItem('state')));

	const [option, setOption] = useState({
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

	function handleChangeOptions(option: typeof defaultArticleState) {
		setOption({
			fontFamilyOption: option.fontFamilyOption,
			fontColor: option.fontColor,
			backgroundColor: option.backgroundColor,
			contentWidth: option.contentWidth,
			fontSizeOption: option.fontSizeOption,
		});
	}

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': option.fontFamilyOption.value,
					'--font-size': option.fontSizeOption.value,
					'--font-color': option.fontColor.value,
					'--container-width': option.contentWidth.value,
					'--bg-color': option.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm props={option} onChange={handleChangeOptions} />
			<Article />
		</main>
	);
};
