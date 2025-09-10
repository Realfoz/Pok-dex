

export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
  #cache = new Map<string, CacheEntry<unknown>>();
  #reapIntervalId:  NodeJS.Timeout | undefined = undefined;
  #interval: number;

 constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
 }

  add<T>(key: string, input: T): void {
    const entry: CacheEntry<T> = {
      createdAt: Date.now(),
      val: input,
    };
    this.#cache.set(key, entry as CacheEntry<unknown>);
  }

  get<T>(key: string): T | undefined {
    const entry = this.#cache.get(key);
    if (entry) {
        return entry.val as T // i really dont like T types...
    } else {
        return undefined
    }
  }

  
#reap() {
  const cutoff = Date.now() - this.#interval;
  const toDelete: string[] = [];

  for (const [key, entry] of this.#cache) {
    if (entry.createdAt <= cutoff) {
      toDelete.push(key);
    }
  }

  for (const key of toDelete) {
    this.#cache.delete(key);
  }
}

  #startReapLoop() {
    if (this.#reapIntervalId) return; // stops writing over timers and collisons
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval); // runs #reap every X interval
    }

  stopReapLoop() {
    if (this.#reapIntervalId) {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}
  
}
  

