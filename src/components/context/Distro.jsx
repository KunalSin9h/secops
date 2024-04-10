import {createContext, useState} from 'react';
export const  DistroContext = createContext(null);
export const  DistroProvider = (props) => {
	const [distro, setDistro] = useState('Ubuntu');
	return(
		<DistroContext.Provider value={{distro, setDistro}}>
		{props.children}
		</DistroContext.Provider>

	)
}


