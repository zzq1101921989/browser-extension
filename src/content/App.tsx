import {JSX, useEffect, useState} from "react";
import IntelligentRecognitionModal from "./components/IntelligentRecognitionModal";
import CreateRuleArea from "./components/mountCreateRuleArea/CreateRuleArea";

const App: () => JSX.Element = () => {

    const [state, setState] = useState<{ currentView: 'Intelligent' | 'initial' | 'CreateRule', props: Record<string, any> }>({
        currentView: 'initial',
        props: {}
    });

    console.log('APP组件挂载完成')

    useEffect(() => {
        const handleMessage = (event: CustomEvent) => {
            console.log('有动静嘛？')
            setState({
                currentView: event.detail.action,
                props: event.detail.data || {}
            });
        };

        window.addEventListener('pluginMessage', handleMessage as EventListener);
        return () => window.removeEventListener('pluginMessage', handleMessage as EventListener);
    }, []);

    return (
        <>
            {
                state.currentView === 'Intelligent' && (
                    <IntelligentRecognitionModal />
                )
            }
            {
                state.currentView === 'CreateRule' && (
                    <CreateRuleArea />
                )
            }
        </>
    )
}

export default App