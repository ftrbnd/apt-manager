'use client';

import { ProfileForm } from './ProfileForm';
import { useState } from 'react';
import { Button } from '../ui/button';
import { SecurityForm } from './SecurityForm';
import { ShieldCheck, User } from 'lucide-react';

type Tab = 'profile' | 'security';

export function AccountDashboard() {
	const [tab, setTab] = useState<Tab>('profile');

	const textColor = (cur: Tab) =>
		cur === tab ? 'text-primary' : 'text-muted-foreground';

	return (
		<div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
			<nav className='grid gap-4'>
				<Button
					variant='ghost'
					onClick={() => setTab('profile')}
					className={`justify-start text-primary ${textColor('profile')}`}>
					<User className='mr-2 h-4 w-4' />
					Profile
				</Button>
				<Button
					variant='ghost'
					onClick={() => setTab('security')}
					className={`justify-start text-primary ${textColor('security')}`}>
					<ShieldCheck className='mr-2 h-4 w-4' />
					Security
				</Button>
			</nav>
			<div className='grid gap-6'>
				{tab === 'profile' && <ProfileForm />}
				{tab === 'security' && <SecurityForm />}
			</div>
		</div>
	);
}
