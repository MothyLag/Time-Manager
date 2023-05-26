export const useTimeParser = ()=>(seconds:number) =>{
    var minus = ""
    if(seconds < 0) {
        seconds = seconds * -1
        minus = "-"
    }
    if(seconds < 60) return `${minus} 00:${pad(seconds)}`
    else if(seconds < 60 *60) return `${minus}  ${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)}`
    else return `${minus}  ${pad(Math.floor(seconds / (60 * 60)))}:${pad(Math.floor(seconds % 60 * 60))}:${pad(seconds % 60)}`
}

function pad(num) {
    const size = 2;
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}