'use client';

import * as Clerk from '@clerk/elements/common';
import * as SignUp from '@clerk/elements/sign-up';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/ui/icons';
import { Footer } from '@/components/Layout/Footer';

export default function Page() {
	return (
		<div className='flex flex-col w-full grow items-center p-4 sm:justify-center min-h-screen bg-muted/40'>
			<SignUp.Root>
				<Clerk.Loading>
					{(isGlobalLoading) => (
						<>
							<SignUp.Step name='start'>
								<Card className='w-full sm:w-96'>
									<CardHeader>
										<CardTitle>Create your account</CardTitle>
										<CardDescription>
											Welcome! Please fill in the details to get started.
										</CardDescription>
									</CardHeader>
									<CardContent className='grid gap-y-4'>
										<div className='grid gap-x-4'>
											<Clerk.Connection
												name='apple'
												asChild>
												<Button
													size='sm'
													variant='outline'
													type='button'
													disabled={isGlobalLoading}>
													<Clerk.Loading scope='provider:apple'>
														{(isLoading) =>
															isLoading ? (
																<Icons.spinner className='size-4 animate-spin' />
															) : (
																<>
																	<Icons.apple className='mr-2 size-4' />
																	Continue with Apple
																</>
															)
														}
													</Clerk.Loading>
												</Button>
											</Clerk.Connection>
										</div>
									</CardContent>
									<CardFooter>
										<div className='grid w-full gap-y-4'>
											<Button
												variant='link'
												size='sm'
												asChild>
												<Link href='/sign-in'>
													Already have an account? Sign in
												</Link>
											</Button>
										</div>
									</CardFooter>
								</Card>
							</SignUp.Step>

							<SignUp.Step name='continue'>
								<Card className='w-full sm:w-96'>
									<CardHeader>
										<CardTitle>Continue registration</CardTitle>
									</CardHeader>
									<CardContent>
										<Clerk.Field
											name='firstName'
											className='space-y-2'>
											<Clerk.Label>
												<Label>First name</Label>
											</Clerk.Label>
											<Clerk.Input
												type='text'
												required
												asChild>
												<Input />
											</Clerk.Input>
											<Clerk.FieldError className='block text-sm text-destructive' />
										</Clerk.Field>
										<Clerk.Field
											name='lastName'
											className='space-y-2'>
											<Clerk.Label>
												<Label>Last name</Label>
											</Clerk.Label>
											<Clerk.Input
												type='text'
												required
												asChild>
												<Input />
											</Clerk.Input>
											<Clerk.FieldError className='block text-sm text-destructive' />
										</Clerk.Field>
									</CardContent>
									<CardFooter>
										<div className='grid w-full gap-y-4'>
											<SignUp.Action
												submit
												asChild>
												<Button disabled={isGlobalLoading}>
													<Clerk.Loading>
														{(isLoading) => {
															return isLoading ? (
																<Icons.spinner className='size-4 animate-spin' />
															) : (
																'Continue'
															);
														}}
													</Clerk.Loading>
												</Button>
											</SignUp.Action>
										</div>
									</CardFooter>
								</Card>
							</SignUp.Step>
						</>
					)}
				</Clerk.Loading>
			</SignUp.Root>

			<Footer />
		</div>
	);
}
