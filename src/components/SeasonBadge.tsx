import { Tag } from "primereact/tag";
import { Season } from "../pages/MenuCalendarPage";

interface SeasonBadgeProps {
    season: string
}

const SeasonBadge = ({ season }: SeasonBadgeProps) => {
    if(season == Season.All) return null;
    
    const severity = season == Season.Winter ? "info" : "warning";
    const text = season == Season.Winter ? "Invernale" : "Estivo";
    
    return <Tag severity={severity} value={text}></Tag>
}

export default SeasonBadge;