/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import {useRef,useEffect,DependencyList} from 'react';
import * as d3 from 'd3';

export const useD3 = (render:(svg:d3.Selection<any,any,any,any>)=>void, dependencies:DependencyList) => {
    const ref = useRef<any>();

    useEffect(() => {
        render(d3.select(ref.current));
        return () => {};
      }, dependencies);
    return ref;
}
