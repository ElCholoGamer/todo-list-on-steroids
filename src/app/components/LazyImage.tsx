import React from 'react';

interface Props {
	src: string;
	alt?: string;
	fallback?: any;
	fallbackSrc?: string;
	className?: string;
	style?: React.CSSProperties;
	width?: number | string;
	height?: number | string;
}

const LazyImage: React.FC<Props> = ({
	src,
	fallback,
	fallbackSrc,
	alt,
	className,
	style,
	width,
	height,
}) => {
	const [loaded, setLoaded] = React.useState(false);

	return (
		<>
			{!loaded &&
				(fallbackSrc ? (
					<img
						src={fallbackSrc}
						alt={alt}
						className={className}
						width={width}
						height={height}
						style={style}
					/>
				) : (
					fallback
				))}
			<img
				src={src}
				onLoad={() => setLoaded(true)}
				alt={alt}
				width={width}
				height={height}
				className={className}
				style={!loaded ? { display: 'none' } : style}
			/>
		</>
	);
};

export default LazyImage;
