import { ChangeEvent, useMemo, useRef, useState } from 'react';
import './App.css';
import React from 'react';
import { mockData } from './mockData/mockData';
import { focusPosition } from './utils/helpers/helper';
// import { ReactForm } from './components/ReactForm';

function App() {
	const [inputData, setInputData] = useState(mockData);

	const inputRef = useRef(
		inputData.map((input) =>
			input.children.map(() => React.createRef<HTMLInputElement>())
		)
	);
	const totalSum = useMemo(() => {
		return inputData
			.flatMap((input) => input.children)
			.reduce((acc, curr) => {
				return acc + curr.sum;
			}, 0);
	}, [inputData]);

	const handleChange = (
		event: ChangeEvent<HTMLInputElement>,
		parentIndex: number,
		childIndex: number
	) => {
		const copiedData = [...inputData];
		if (parentIndex === 0) {
			copiedData[parentIndex].children[childIndex].sum = Number(
				event.target.value
			);

			copiedData[parentIndex].totalSum = copiedData[
				parentIndex
			].children.reduce((acc, curr) => {
				return acc + curr.sum;
			}, 0);
		} else {
			const findPreviousParentDataTotalSum: number =
				copiedData[parentIndex - 1].totalSum;

			copiedData[parentIndex].children[childIndex].sum = Number(
				event.target.value
			);
			copiedData[parentIndex].totalSum =
				copiedData[parentIndex].children.reduce((acc, curr) => {
					return acc + curr.sum;
				}, 0) + findPreviousParentDataTotalSum;
		}

		setInputData(copiedData);
		focusPosition(parentIndex, childIndex, inputRef, inputData.length);
	};
	return (
		<>
			{inputData.map((input, parentIndex) => {
				return (
					<div key={parentIndex} style={{ display: 'flex' }}>
						{input.children.map((_child, childIndex) => {
							return (
								<input
									id={`${parentIndex}${childIndex}`}
									ref={inputRef.current[parentIndex][childIndex]}
									type="number"
									key={childIndex}
									onChange={(event) =>
										handleChange(event, parentIndex, childIndex)
									}
								/>
							);
						})}
						<h2>{input.totalSum === 0 ? '-' : input.totalSum}</h2>
					</div>
				);
			})}
			<h3>{totalSum ? totalSum : '-'}</h3>
		</>
	);
}

export default App;
