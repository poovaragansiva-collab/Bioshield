import { useCountUp } from "../hooks";
import { Panel, Reveal, DataRow, RiskPill } from "./ui";
import { IconHash, IconCompass, IconSeal } from "./icons";
import { cn } from "../utils/cn";


type Incident = {
  incident_id: string;
  vessel_name: string;
  risk_level: string;
  threat_score: number;
  location: any;
  alerts: string[] | string;
  recommendation: string;
  timestamp?: string;
};


function gaugeColor(score:number){

  if(score >= 75) return "#ff6470";
  if(score >= 50) return "#f5b054";
  if(score >= 25) return "#41d6f0";

  return "#3ee6a4";
}


function ThreatGauge({score}:{score:number}){

const R=46;
const C=2*Math.PI*R;
const ARC=C*(240/360);

const frac=score/100;
const color=gaugeColor(score);

const display=Math.round(useCountUp(score,1000));


return(
<div className="relative h-[118px] w-[118px]">

<svg viewBox="0 0 120 120"
className="h-full w-full">


<circle
cx="60"
cy="60"
r={R}
fill="none"
stroke="#0e2c47"
strokeWidth="9"
strokeDasharray={`${ARC} ${C}`}
transform="rotate(150 60 60)"
/>


<circle
cx="60"
cy="60"
r={R}
fill="none"
stroke={color}
strokeWidth="9"
strokeLinecap="round"
strokeDasharray={`${ARC} ${C}`}
strokeDashoffset={ARC-frac*ARC}
transform="rotate(150 60 60)"
/>


</svg>


<div className="absolute inset-0 grid place-items-center">

<div className="text-center">

<p
className="font-display text-[26px] font-bold"
style={{color}}
>

{display}

</p>


<p className="font-mono text-[8px] text-dim">
THREAT /100
</p>


</div>

</div>


</div>
)

}



export default function IncidentPanel({

selectedId,
onSelect

}:{

selectedId:string;
onSelect:(id:string)=>void;

}){


const incidents:Incident[] =
JSON.parse(localStorage.getItem("incidents") || "[]");


const inc =
incidents.find(
(i)=>i.incident_id===selectedId
)
||
incidents[0];


if(!inc){

return (

<Panel
index="03"
title="Incident Details"
>

<p className="text-dim">
Waiting for n8n telemetry...
</p>

</Panel>

)

}



const riskColor:Record<string,string>={

HIGH:"bg-red-500",
CRITICAL:"bg-red-600",
MEDIUM:"bg-yellow-400",
LOW:"bg-green-400"

};



return(

<Reveal delay={120} className="h-full">


<Panel

index="03"

title="Incident Details"

aside={
<RiskPill level={inc.risk_level}/>
}

>


<div className="mb-4 grid grid-cols-3 gap-2">


{
incidents.map((i)=>(
<button

key={i.incident_id}

onClick={()=>onSelect(i.incident_id)}

className={cn(

"border rounded p-2 text-xs",

selectedId===i.incident_id
?
"border-cyan-400 text-cyan-300"
:
"border-line text-dim"

)}

>

<span
className={cn(
"h-2 w-2 inline-block rounded-full mr-2",
riskColor[i.risk_level] || "bg-gray-400"
)}
/>


{i.incident_id.slice(-4)}

</button>
))
}


</div>



<div className="flex gap-4 items-center border border-line p-4 rounded">


<ThreatGauge score={inc.threat_score}/>


<div>


<p className="font-mono text-xs text-dim">
VESSEL TRACK
</p>


<h2 className="text-lg font-bold">
{inc.vessel_name}
</h2>


<p className="text-sm text-haze">
Marine Surveillance
</p>


<p className="flex gap-2 mt-2 text-xs text-dim">

<IconCompass/>

{typeof inc.location==="string"
?
inc.location
:
inc.location?.marine_area || 
"Unknown Location"}

</p>


</div>

</div>



<dl className="mt-4">


<DataRow label="Incident ID">

<span className="font-mono text-cyan-300">

<IconHash className="inline"/>

{inc.incident_id}

</span>

</DataRow>



<DataRow label="Vessel">

{inc.vessel_name}

</DataRow>



<DataRow label="Risk">

<RiskPill level={inc.risk_level}/>

</DataRow>



<DataRow label="Threat Score">

{inc.threat_score}/100

</DataRow>



<DataRow label="Recommendation">

<span className="text-yellow-300">

{inc.recommendation}

</span>

</DataRow>



</dl>




<div className="mt-4 border border-line rounded p-3">


<p className="flex gap-2 text-xs font-mono text-dim">

<IconSeal/>

ALERTS

</p>


<ul className="mt-2 text-sm">

{

Array.isArray(inc.alerts)

?

inc.alerts.map((a,i)=>(

<li key={i}>
• {a}
</li>

))

:

<li>
{inc.alerts}
</li>

}


</ul>


</div>



</Panel>


</Reveal>


)

}
