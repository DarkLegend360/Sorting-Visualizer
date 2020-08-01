export const getQuickSortAnimation = temp =>{
    const arr=temp;
    const anims=[];
    quickSort(arr,0,arr.length-1,anims);
    return anims;
}

const quickSort = (arr,l,r,anims) =>{
    if(l>=r) return;
    const piv = partition(arr,l,r,anims);
    quickSort(arr,l,piv-1,anims);
    quickSort(arr,piv+1,r,anims);
}

const partition = (arr,l,r,anims) =>{
    const piv = arr[r];
    let idx=l;
    for(let i=l;i<r;i++) {
        anims.push([i,r,true]);
        anims.push([i,r,false]);
        if(arr[i]<piv) {
            anims.push([i,arr[idx],idx,arr[i]]);
            [arr[i],arr[idx]]=[arr[idx],arr[i]];
            idx++;
        } else {
            anims.push([-1,-1,-1,-1]);
        }
    }
    anims.push([idx,arr[r],r,arr[idx]]);
    [arr[idx],arr[r]]=[arr[r],arr[idx]];
    //anims.push([idx,true]);
    return idx;
}