import {useEffect} from 'react';

type Options<T extends EventTarget> = (AddEventListenerOptions & { target?: T | null, isStartAction?: boolean })

function useEventListener<K extends keyof HTMLElementEventMap>(
    eventName: K,
    handler: (ev: HTMLElementEventMap[K]) => void,
    options?: Options<HTMLElement>,
): void;
function useEventListener<K extends keyof ElementEventMap>(
    eventName: K,
    handler: (ev: ElementEventMap[K]) => void,
    options?: Options<Element>,
): void;
function useEventListener<K extends keyof DocumentEventMap>(
    eventName: K,
    handler: (ev: DocumentEventMap[K]) => void,
    options?: Options<Document>,
): void;
function useEventListener<K extends keyof WindowEventMap>(
    eventName: K,
    handler: (ev: WindowEventMap[K]) => void,
    options?: Options<Window>,
): void;
function useEventListener(
    eventName: string,
    handler: (event: Event) => void,
    options?: Options<EventTarget>,
): void;
function useEventListener(
    eventName: string | string[],
    handler: (event: Event) => void,
    options?: Options<EventTarget>,
): void {
    useEffect(() => {
        // @ts-ignore
        const target = options?.target ?? window;

        const events = Array.isArray(eventName) ? eventName : [eventName];

        if (!target || ( options?.isStartAction !== undefined  && options?.isStartAction === false)) return;

        const listeners = events.map((event) => {
            const listener = (e: Event) => handler(e);
            target.addEventListener(event, listener, options);
            return { event, listener };
        });

        return () => {
            listeners.forEach(({ event, listener }) => {
                target.removeEventListener(event, listener, options);
            });
        };
    }, [eventName, handler, options]);
}

export default useEventListener