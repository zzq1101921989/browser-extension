import BasicRuleArea from "./components/BasicRuleArea";
import React from "react";


const CreateRuleArea: React.FC = () => {
    return (
        <BasicRuleArea
            onOk={async (formData) => {
                console.log(formData, 'formData')
                console.log('确定了')
            }}
            visible
        />
    )
};

export default CreateRuleArea;