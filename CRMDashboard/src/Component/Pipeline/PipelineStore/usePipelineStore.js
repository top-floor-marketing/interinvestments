import { useContext } from "react";

import PipelineContext from "./pipelineContext";

const usePipelineStore = () => {
    const { state, actions } = useContext(PipelineContext);
    return {
        state, 
        actions
    }
}

export default usePipelineStore;