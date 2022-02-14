import React, {useEffect, useState} from 'react';
import {useRef, useCallback} from "react";
import throttle from "lodash/throttle";
import usePrevious from "./usePrevious";
// import useDebounce from "./useDebounce";


const UseScroll = (triggers, debounce, callback = () => {
}) => {
    //console.log("hook rerender")
    const containerRef = useRef(null);

    const [scrollTopPercents, setScrollPosition] = useState(null);
    const [scrollBottom, setScrollBottomState] = useState(null);
    const [scrollTop, setScrollTopState] = useState(null);
    const [pinBottom, setPinBottom] = useState(false);
    const [saveScrollPosition, setSaveScrollPosition] = useState(false);
    const previousScrollBottom = usePrevious(scrollBottom)

    useEffect(() => {
        if (containerRef) {
            if (pinBottom) scrollTo('bottom')
            if (saveScrollPosition) setScrollBottom(previousScrollBottom)
        }
    }, [...triggers])


const init = ()=>{
    setScrollPosition(null);
    setScrollBottomState(null);
    setScrollTopState(null);
    setPinBottom(null);
    setSaveScrollPosition(false);
}

    const onScroll = useCallback(
        throttle(() => {

            const scrollTopTemp =Math.round(containerRef.current.scrollTop);
            const containerHeight = containerRef.current.clientHeight;
            const scrollHeight = containerRef.current.scrollHeight;
            const scrollBottomTemp = scrollHeight - containerHeight - scrollTopTemp;
            const scrollTopPercentsTemp = Math.round((scrollTopTemp / (scrollHeight - containerHeight)) * 100)
           //console.log(containerScrollTop)

            setScrollPosition(scrollTopPercentsTemp);
            setScrollBottomState(scrollBottomTemp);
            setScrollTopState(scrollTopTemp);

            // console.log(`init-- scrollTop: ${scrollTopTemp},containerHeight: ${containerHeight},scrollHeight: ${scrollHeight},scrollBottom: ${scrollBottomTemp},scrollTopPercents: ${scrollTopPercentsTemp}`)

            // console.log(`2 scrollTop: ${scrollTop},containerHeight: ${containerHeight},scrollHeight: ${scrollHeight},scrollBottom: ${scrollBottom},scrollTopPercents: ${scrollTopPercents}`)

            // callback(scrollTopPercents, scrollTop, scrollBottom);
        }, debounce)
        , [containerRef]);

    const scrollTo = (destination = 'bottom', value) => {
        if (containerRef) {
            switch (destination) {
                case 'bottom': {
                    if (value) {
                        setScrollBottom(value);
                        break;
                    }
                    containerRef.current.scrollTop = containerRef.current.scrollHeight;
                    break;
                }
                case 'top': {
                    if (value) {
                        containerRef.current.scrollTop = value;
                        break;
                    }
                    containerRef.current.scrollTop = 0;
                    break;
                }
            }
            // console.log("finish 1")
            onScroll();
        }

    }


    const setScrollBottom = (scrollBottom) => {
        // console.log(`set sb-- ${scrollBottom}`)
        const containerHeight = containerRef.current.clientHeight;
        const scrollHeight = containerRef.current.scrollHeight;
        containerRef.current.scrollTop = scrollHeight - containerHeight - scrollBottom;
        onScroll();
    }


    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        container.addEventListener("scroll", onScroll);
        return () => container.removeEventListener("scroll", onScroll);

    }, [containerRef]);

    return {containerRef, scrollTopPercents, scrollTo, setPinBottom, setScrollBottom, setSaveScrollPosition, scrollBottom, scrollTop, init};
};

export default UseScroll;