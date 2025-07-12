import type { Dispatch, SetStateAction } from 'react'

export const toggleState = (state: string, setState: Dispatch<SetStateAction<string>>, value: string): void => {
	if (state !== '') {
		setState('')
	} else {
		setState(value)
	}
}
