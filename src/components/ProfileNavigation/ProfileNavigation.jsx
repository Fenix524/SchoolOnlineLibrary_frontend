import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUser } from '../../redux/auth/authSelectors'
import Button from '../Button/Button'
import css from './ProfileNavigation.module.css'
import { baseValues } from '../../util/enums'

const ProfileNavigation = ({ isLogedIn }) => {
	const curentUser = useSelector(selectUser)

	return (
		<div>
			{isLogedIn && (
				<Link to={'/profile'}>
					<div className={css.loggedIn}>
						<div className={css.textInfo}>
							<p
								className={css.name}
							>{`${curentUser.firstName}  ${curentUser.lastName}`}</p>
							<p className={css.email}>{curentUser.email}</p>
						</div>
						<img
							className={css.userLogo}
							src={curentUser.profilePictureUrl || baseValues.UserLogo}
							alt=''
						/>
					</div>
				</Link>
			)}
			{!isLogedIn && (
				<div className={css.notLoggedIn}>
					<Link to={'/authorization'} className='login'>
						<Button style='transparent'>Увійти</Button>
					</Link>
					<Link to={'/registration'} className='signup'>
						<Button>Реєстрація</Button>
					</Link>
				</div>
			)}
		</div>
	)
}

export default ProfileNavigation
