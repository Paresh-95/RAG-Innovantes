const cache = new Map();

export function getCachedAnswer(question){
    console.log("🧠 Cache initialized :  Getter");
    return cache.get(question);
}

export function setCachedAnswer(question,answer){
    console.log("🧠 Cache initialized : Setter");
    cache.set(question,answer);
}