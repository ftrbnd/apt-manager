'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

interface Props {
	onSheet?: boolean;
}

export function ThemeToggle({ onSheet }: Props) {
	const { theme, setTheme } = useTheme();

	if (onSheet) {
		return (
			<Accordion
				type='single'
				collapsible>
				<AccordionItem value='item-1'>
					<AccordionTrigger className='hover:no-underline'>
						Toggle theme
					</AccordionTrigger>
					<AccordionContent>
						<RadioGroup
							defaultValue={theme}
							onValueChange={setTheme}>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem
									value='light'
									id='light'
									checked={theme === 'light'}
								/>
								<Label htmlFor='light'>Light</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem
									value='dark'
									id='dark'
									checked={theme === 'dark'}
								/>
								<Label htmlFor='dark'>Dark</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem
									value='system'
									id='system'
									checked={theme === 'system'}
								/>
								<Label htmlFor='system'>System</Label>
							</div>
						</RadioGroup>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className='hidden md:inline-flex'
					variant='outline'
					size='icon'>
					<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Theme</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => setTheme('light')}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
