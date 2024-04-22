import React from 'react'
import Button from '../../components/Button/Button'
import Container from '../../components/Container/Container'
import Title from '../../components/Title/Title'
import css from './HomePage.module.css'
import { Link } from 'react-router-dom'

const HomePage = props => {
	// Вміст компонента

	return (
		<>
			<Container>
				<section className={css.hero}>
					<div className={css.heroContentWrapper}>
						<div className={css.heroTextBg}>
							<div className={css.heroTitle}>
								<Title size={'large'}>Онлайн бібліотека</Title>
							</div>
							<p className={css.schoolText}>Виноградівська ЗОШ Ⅰ-Ⅲ №1</p>
							<div className={css.heroBtn}>
								<Link to='books'>
									<Button>РОЗПОЧАТИ</Button>
								</Link>
							</div>
						</div>
					</div>
				</section>
			</Container>
		</>
	)
}

export default HomePage
