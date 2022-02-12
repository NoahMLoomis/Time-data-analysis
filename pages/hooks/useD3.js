import React from 'react';

import * as d3 from 'd3';


const useD3 = (renderChartFn, dependencies) => {
    const ref = React.useRef();
    React.useEffect(() => {
        renderChartFn(d3.select(ref.current)
            .attr('viewBox', '0 0 ' + Math.min(500, 500) + ' ' + Math.min(500, 500))
            .attr('preserveAspectRatio', 'xMinYMin')
            .attr("width", '100%')
            .attr("height", '100%'));
        return () => { };
    }, dependencies);
    return ref;
}

export default useD3