export const getMergeSortAnimation = (arr)=> {
    const shifts=[]
    let n = arr.length;
    const temp=arr.slice();
    const arr2 = arr.slice();
    mergeSort(arr2,0,n-1,temp,shifts);
    return shifts;
}

const mergeSort = (arr,low,high,temp,shifts)=>{
    if(low===high) return;
    let mid = Math.floor(low+(high-low)/2);
    mergeSort(temp,low,mid,arr,shifts);
    mergeSort(temp,mid+1,high,arr,shifts);
    merge(arr,low,mid,high,temp,shifts);
}

const merge = (arr,low,mid,high,temp,shifts)=>{
    let i=low,j=mid+1,k=low;
    while(i<=mid && j<=high) {
        shifts.push([i,j]);
        shifts.push([i,j]);
        if(temp[i]<temp[j]) {
            shifts.push([k,temp[i]]);
            arr[k++]=temp[i++];
        } else {
            shifts.push([k,temp[j]]);
            arr[k++]=temp[j++];
        }
    }
    while(i<=mid) {
        shifts.push([i,i]);
        shifts.push([i,i]);
        shifts.push([k,temp[i]]);
        arr[k++]=temp[i++];
    }
    while(j<=high) {
        shifts.push([j,j]);
        shifts.push([j,j]);
        shifts.push([k,temp[j]]);
        arr[k++]=temp[j++];
    }
}