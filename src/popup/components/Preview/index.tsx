import { FC } from "react";

const Preview: FC = () => {
    return (
        <section className="preview-section">
            <h2>数据预览</h2>
            <div className="data-preview">
                {/* <pre>{JSON.stringify(sampleData, null, 2)}</pre> */}
                {/* {sampleData.length > 2 && <div>...还有 {sampleData.length - 2} 条记录</div>} */}
            </div>
        </section>
    )
}

export default Preview