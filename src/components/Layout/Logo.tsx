import { NotebookText } from 'lucide-react';

interface Props {
	width?: number;
	height?: number;
}

export function Logo({ width, height }: Props) {
	return (
		<NotebookText
			className={`${width === undefined ? 'w-6' : `w-${width}`} ${
				height === undefined ? 'h-6' : `h-${height}`
			}`}
		/>
	);
}
