import { createContext, FC, ReactElement, useState } from "react";

const AppContext = createContext({})

/**
 * 全局状态管理组件
 * @returns 
 */
const AppContextProvider: FC<{ children?: ReactElement }> = (props) => {

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