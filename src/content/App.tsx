import {JSX, useEffect, useState} from "react";
import IntelligentRecognitionModal from "./components/IntelligentRecognitionModal";
import CreateRuleArea from "./components/RuleArea/CreateRuleArea";
import {UpdateRuleArea} from "./components/RuleArea/UpdateRuleArea";

const App: () => JSX.Element = () => {

    const [state, setState] = useState<{ currentView: 'Intelligent' | 'initial' | 'CreateRule' | 'UpdateRule', props: Record<string, any> }>({
        currentView: 'initial',
        props: {}
    });

    console.log('初始化准备完毕')

    useEffect(() => {
        const handleMessage = (event: CustomEvent) => {
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
            {
                state.currentView === 'UpdateRule' && (
                    <UpdateRuleArea />
                )
            }
        </>
    )
}

export default App