
export const HIGHLIGHT_ID = 'data-ai-highlight';

/**
 * 高亮传入的元素
 * @param elements 元素集合
 */
export function highlightElements(elements: HTMLElement[]): void {
    elements.forEach(el => {
        el.setAttribute(HIGHLIGHT_ID, 'true');
        el.style.setProperty('box-shadow', '0 0 0 3px #FF6B6B', 'important');
        el.style.setProperty('background-color', 'rgba(255, 215, 0, 0.3)', 'important');
        el.style.setProperty('border-radius', '3px', 'important');
        el.style.setProperty('transition', 'all 0.3s ease', 'important');
        el.style.setProperty('animation', 'pulse 1.5s infinite', 'important');
    });

    if (!document.getElementById('ai-highlight-animation')) {
        const style = document.createElement('style');
        style.id = 'ai-highlight-animation';
        style.textContent = `
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7); }
                70% { box-shadow: 0 0 0 10px rgba(255, 107, 107, 0); }
                100% { box-shadow: 0 0 0 0 rgba(255, 107, 107, 0); }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * 批量取消高亮
 * @param highlightId 高亮标记的ID（需与高亮时一致）
 */
export function unHighlightElements(highlightId: string = 'data-ai-highlight'): void {
    // 找到所有高亮元素
    const highlightedElements = document.querySelectorAll(`[${highlightId}]`);

    highlightedElements.forEach(el => {
        // 移除标记和内联样式
        el.removeAttribute(highlightId);
        (el as HTMLElement).style.removeProperty('box-shadow');
        (el as HTMLElement).style.removeProperty('background-color');
        (el as HTMLElement).style.removeProperty('border-radius');
        (el as HTMLElement).style.removeProperty('animation');
        (el as HTMLElement).style.removeProperty('transition');
    });

    // 可选：移除动画样式（如果不再需要）
    const styleTag = document.getElementById('ai-highlight-animation');
    if (styleTag) styleTag.remove();
}

/**
 * 将HTMLElement转为简洁路径字符串（格式：tag>tag.class#id）
 * @param element HTML元素
 * @param options 配置项
 *   - withParents: 是否包含父级路径（默认true）
 *   - withChildren: 是否包含子级路径（默认false）
 *   - maxDepth: 最大递归深度（默认5）
 * @returns 字符串化的路径（如 "div#header>ul.list>li.item"）
 */
export function elementToPathString(element: HTMLElement, options: {
        withParents?: boolean;
        withChildren?: boolean;
        maxDepth?: number;
    } = {}): string {
    // 参数默认值
    const { withParents = true, withChildren = false, maxDepth = 5 } = options;

    // 获取单个元素的选择器标识（tag.class#id）
    const getSelector = (el: Element): string => {
        let selector = el.tagName.toLowerCase();

        // 添加ID（如果有）
        if (el.id) selector += `#${el.id}`;

        // 添加Class（如果有且有效）
        const className = el.className;
        if (typeof className === 'string' && className.trim().length > 0) {
            const validClasses = className.split(/\s+/).filter(c => c.length > 0);
            if (validClasses.length > 0) selector += `.${validClasses.join('.')}`;
        }

        return selector;
    };

    // 构建父级路径（从当前元素向上到根元素）
    const getParentPath = (el: Element): string[] => {
        const path: string[] = [];
        let current: Element | null = el;
        let depth = 0;

        while (current && depth < maxDepth) {
            path.unshift(getSelector(current));
            current = current.parentElement;
            depth++;
        }

        return path;
    };

    // 构建子级路径（从当前元素向下递归）
    const getChildPath = (el: Element, depth = 0): string => {
        if (depth >= maxDepth || !el.children || el.children.length === 0) {
            return getSelector(el);
        }

        const childSelectors = Array.from(el.children).map(child =>
            getChildPath(child, depth + 1)
        );

        return `${getSelector(el)}>${childSelectors.join('>')}`;
    };

    // 根据选项组合路径
    if (withParents && withChildren) {
        const parentPath = getParentPath(element).slice(0, -1); // 排除当前元素自身
        const childPath = getChildPath(element);
        return parentPath.length > 0 ? `${parentPath.join('>')}>${childPath}` : childPath;
    } else if (withParents) {
        return getParentPath(element).join('>');
    } else if (withChildren) {
        return getChildPath(element);
    } else {
        return getSelector(element);
    }
}