const fs = require('fs')
const readline = require('readline')
const path = require('path')

// Створення інтерфейсу для зчитування з консолі
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

// Функція для створення компоненту
function createComponent(dirPath, type, componentNames) {
	componentNames.forEach(componentName => {
		const componentDir = path.join(dirPath, componentName)
		if (fs.existsSync(componentDir)) {
			console.error(`Компонент ${componentName} вже існує.`)
			return
		}

		fs.mkdirSync(componentDir, { recursive: true })

		const extension = type === 'ts' ? 'tsx' : 'jsx'
		const componentContent =
			type === 'ts' ? tsxTemplate(componentName) : jsxTemplate(componentName)

		fs.writeFileSync(
			path.join(componentDir, `${componentName}.${extension}`),
			componentContent
		)
		fs.writeFileSync(path.join(componentDir, `${componentName}.module.css`), '')

		console.log(`Компонент ${componentName} було успішно створено!`)
	})

	rl.close()
}

// Шаблон для файлу .jsx
function jsxTemplate(componentName) {
	return `import React from 'react';
import css from './${componentName}.module.css';

const ${componentName} = () => {
  return (
    <div className={css.${componentName}}>
      
    </div>
  );
};

export default ${componentName};
`
}

// Шаблон для файлу .tsx
function tsxTemplate(componentName) {
	return `import React from 'react';
	import css from './${componentName}.module.css';
	
	interface ${componentName}Props {
		// Оголошення пропсів компонента
	}
	
	const ${componentName}: React.FC<${componentName}Props> = (props) => {
		// Вміст компонента
	
		return (
			<div>
				{/* Вміст компонента */}
			</div>
		);
	};
	
	export default ${componentName};	
`
}

// Запит шляху для створення компоненту
rl.question('Введіть шлях для створення компонентів: ', answer => {
	const dirPath = answer.trim() !== '' ? answer.trim() : 'src/components'
	console.log('Шлях', dirPath)

	// Запит типу компоненту (js або ts)
	rl.question('Введіть тип компонентів (js або ts): ', type => {
		const validTypes = ['js', 'ts']
		type = validTypes.includes(type.trim().toLowerCase())
			? type.trim().toLowerCase()
			: 'ts'
		console.log('Тип файлу', type)
		if (!validTypes.includes(type)) {
			console.error('Непідтримуваний тип компонентів. Введіть "js" або "ts".')
			rl.close()
			return
		}

		// Запит назв компонентів
		rl.question('Введіть назви компонентів (розділені пробілом): ', names => {
			const componentNames = names.trim().split(' ')

			// Створення компонентів
			createComponent(dirPath, type, componentNames)
		})
	})
})
