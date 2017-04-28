//1. 冒泡排序
function bubbleSort(arr) {
    if (Array.isArray(arr) && arr.length) {
        var ret = arr.slice(0);
        var len = ret.length;
        var isSwaped = false;
        for (var i = 0; i < len - 1; i++) {
            isSwaped = false;
            for (var j = len - 1; j > i; j--) {
                if (ret[j] < ret[j-1]) {
                    swap(ret, j, j - 1);
                    isSwaped = true;
                }
            }
            if (!isSwaped) {
                break;
            }
        }
        return ret;
    }
}

//2. 插入排序
function insertSort(arr) {
    if (Array.isArray(arr) && arr.length) {
        var ret = arr.slice(0);
        for (var i = 1, len = ret.length; i < len; i++) {
            var target = ret[i];
            for (var j = i - 1; j >= 0; j--) {
                if (target < ret[j]) {
                    ret[j+1] = ret[j];
                } else {
                    break;
                }
            }
            ret[j+1] = target;
        }
        return ret;
    }
}

//3. 二分插入排序
/**
* 第k个元素要插入到前面拍好序的k-1个元素里，采用二分比较法。
* 当low==high时，目标元素要么在high所指的位置（此时high-1），要么在其后面一位(此时low+1)，这样low > high
* 是退出循环条件。不管是上述两种情况中的哪个，都是high+1到k-1的数向后移一位。目标元素的正确位置为high+1
**/
function twoInertSort(arr) {
    if (Array.isArray(arr) && arr.length) {
        var ret = arr.slice(0);
        var i, len, low, high, middle, target;
        for (i = 1, len = ret.length; i < len; i++) {
            target = ret[i];
            low = 0;
            high = i - 1;

            while (low <= high) {
                middle = parseInt((low + high) / 2, 10);
                if (target < ret[middle]) {
                    high = middle - 1;
                } else {
                    low = middle + 1;
                }
            }
            for (j = i - 1; j > high; j--) {
                ret[j+1] = ret[j];
            }
            ret[high+1] = target;
        }
        return ret;
    }
}

// 选择排序
function selectSort(arr) {
    var len = arr.length;
    var min;
    var minIndex;
    for (var i = 0; i < len - 1; i++) {
        min = arr[i];
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < min) {
                min = arr[j];
                minIndex = j;
            }
        }
        if (i !== minIndex) {
            swap(arr, i, minIndex);
        }
    } 
}

// 快速排序 方法一
function quickSort1(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];

    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return quickSort1(left).concat([pivot], quickSort1(right));
}

// 快速排序 方法二
function quickSort2(arr, l, r) {
    if (l < r) {
        var i = l;
        var j = r;
        var target = arr[l];

        while (i < j) {
            while (i < j && arr[j] >= target) {
                j--;
            }
            if (i < j) {
                arr[i++] = arr[j];  
            }
            while (i < j && arr[i] < target) {
                i++;
            }
            if (i < j) {
                arr[j--] = arr[i];
            }  
        }
        arr[i] = target;

        quickSort2(arr, l, i - 1);
        quickSort2(arr, i + 1, r);
    }
}

function mergeSort(arr, first, last, temp) {
    if (first < last) {
        var mid = Math.floor((first + last) / 2);
        mergeSort(arr, first, mid, temp);
        mergeSort(arr, mid + 1, last, temp);
        mergeArray(arr, first, mid, last, temp);
    }
}

function mergeArray(arr, first, mid, last, temp) {
    var i = first,
        // m = mid,
        j = mid + 1,
        // n = last,
        k = 0;

    while (i <= mid && j <= last) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++]
        } else {
            temp[k++] = arr[j++];
        }
    }
    while (i <= mid) {
        temp[k++] = arr[i++];
    }
    while (j <= last) {
        temp[k++] = arr[j++];
    }

    for (i = 0; i < k; i++) {
        arr[first + i] = temp[i];
    }
}

function swap(arr, i, j) {
    var _temp = arr[i];
    arr[i] = arr[j];
    arr[j] = _temp;
}