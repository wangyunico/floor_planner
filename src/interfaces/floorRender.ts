import {Context} from "../render/context"
interface FloorRender {
    render: <T extends Context>(context:T)=> void
}