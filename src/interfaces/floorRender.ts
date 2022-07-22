import {Context} from "../render/context"
export interface FloorRender {
    render: <T extends Context>(context:T)=> void
}