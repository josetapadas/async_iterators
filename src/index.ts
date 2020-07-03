// Synchronous iterable interface
interface SynchronousIterable<T> {
  [Symbol.iterator](): SynchronousIterator<T>;
}

interface SynchronousIterator<T> {
  next(): SynchronousIteratorResult<T>;
}

interface SynchronousIteratorResult<T> {
  value: T | undefined;
  done: boolean;
}

// Manual iteration over an Array object
const iterableSource = [1, 2, 3];
const synchronousIterator = iterableSource[Symbol.iterator]();

console.log(synchronousIterator.next());  // { value: 1, done: false }
console.log(synchronousIterator.next());  // { value: 2, done: false }
console.log(synchronousIterator.next());  // { value: 3, done: false }
console.log(synchronousIterator.next());  // { value: undefined, done: true }

for (const element of iterableSource) {
  console.log(element); // 1, 2, 3
}

// Custom iterable object
interface RangedIterable extends SynchronousIterable<number> {
  start: number;
  end: number;
}

const rangedIterableSource: RangedIterable = {
  start: 1,
  end: 3,

  [Symbol.iterator]() {
    return {
      next: () => {
        return this.start <= this.end
          ? { done: false, value: this.start++ }
          : { done: true, value: undefined };
      },
    };
  },
};

for (const element of rangedIterableSource) {
  console.log(element); // 1, 2, 3
}
