
export function groupBy<T, TKey extends string | number>(list: T[], keyGetter : (t: T) => TKey) : { [key: string] : T[]} {
    const map : { [key: string] : T[]} = {} 
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map[key];
         if (!collection) {
             map[key] = [item];
         } else {
             collection.push(item);
         }
    });
    return map;
}

export function updateIndex<T>(array : T[], updateValue : any, ind : number) : T[] {
    return array.map((a, i) => i === ind ? { ...a, ...updateValue} : a );
}