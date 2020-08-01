export const getSelectionSortAnimation = temp => {
    const res=[];
    const arr = temp;
    let n = arr.length;
    for(let i=0;i<n-1;i++) {
        let mn=i;
        let j;
        for(j=i+1;j<n;j++) {
            res.push([i,j,true]);
            res.push([i,j,false]);
            if(arr[mn]>arr[j])
                mn=j;
        }
        if(mn!==i) {
            res.push([i,arr[mn],mn,arr[i]]);
            [arr[i],arr[mn]]=[arr[mn],arr[i]];
        } else
            res.push([i,-1,-1,-1]);
        if(i===n-2)
            res.push([i+1,-1,-1,-1]);
    }
    return res;
} 