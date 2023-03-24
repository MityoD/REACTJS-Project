import { ToolCard } from "./ToolCard"
import { useState, useEffect } from "react"
import { getAll } from "../../services/toolService";

export const AllTools = () => {
    const [tools, setTools] = useState([]);
    useEffect(() => {
        getAll()
            .then(result => {
                setTools(result)
            })
    }, []);

    return (
        <div style={{display:'flex', justifyContent:'space-between'}} >
            {tools.map(x => <ToolCard key={x._id} {...x}/>)}
        </div>
    )
}