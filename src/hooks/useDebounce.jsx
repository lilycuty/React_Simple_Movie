import { useEffect, useState } from 'react';
export default function useDebounce(initialValue = '', delay = 1000) {
	//Lấy 1 giá trị nào đó sau 1 khoảng thời gian mà ta muốn
	const [debounceValue, setDebounceValue] = useState(initialValue);
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebounceValue(initialValue);
		}, delay);
		return () => {
			clearTimeout(timer);
		};
	}, [delay, initialValue]);
	return debounceValue;
}
