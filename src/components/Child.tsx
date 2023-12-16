import React, { ComponentType } from 'react';

type ChildProps = {
	value: number;
	handleClick: () => void;
	hello: ComponentType;
};

export const Child = React.memo(
	({ value, handleClick, hello: Hello }: ChildProps) => {
		return (
			<>
				<Hello />
				<div onClick={handleClick}>{value}</div>
			</>
		);
	}
);
