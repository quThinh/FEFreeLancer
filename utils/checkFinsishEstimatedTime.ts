export default function checkFinishEstimatedTime(e:number){
    if (e < 1440) return e;
    return Math.round(e/1440);
}