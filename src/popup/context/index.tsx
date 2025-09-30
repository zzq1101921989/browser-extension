import {createContext, FC, JSX, ReactElement, useState} from "react";

const AppContext = createContext({})

/**
 * 全局状态管理组件
 * @returns 
 */
const AppContextProvider: (props: Record<string, any>) => JSX.Element = (props) => {

    const [rulesConfig, setRulesConfig] = useState({
        currentRules: null,
        rules: []
    })

    return <AppContext.Provider value={{ rulesConfig }}>
        {props.children}
    </AppContext.Provider>
}

export { AppContext };
export default AppContextProvider;