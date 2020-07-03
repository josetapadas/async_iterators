// synchronous iterable interface
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

console.log("*** manual iteration over a simple array:")

const iterableSource = [1, 2, 3];
const synchronousIterator = iterableSource[Symbol.iterator]();

console.log(synchronousIterator.next());
console.log(synchronousIterator.next());
console.log(synchronousIterator.next());
console.log(synchronousIterator.next());

for (const element of iterableSource) {
  console.log(element);
}

console.log("\n*** custom iterable object:")

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
  console.log(element);
}
