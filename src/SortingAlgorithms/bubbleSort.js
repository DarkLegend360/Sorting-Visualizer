export const getBubbleSortAnimation = (arr) => {
    const res=[];
    let n=arr.length;
    for(let i=0;i<n-1;i++) {
        let j=0;
        for(j=0;j<n-i-1;j++) {
            res.push([j,j+1,false]);
            if(arr[j]>arr[j+1]) {
                res.push([j,arr[j+1],j+1,arr[j]]);
                [arr[j],arr[j+1]]=[arr[j+1],arr[j]];
            } else {
                res.push([-1,-1,-1,-1]);
            }
            if(j===n-i-2)
                res.push([j,j+1,true]);
            else
                res.push([j,j+1,false]);
        }
    }
    return res;
}