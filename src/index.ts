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

console.log(synchronousIterator.next()); // { value: 1, done: false }
console.log(synchronousIterator.next()); // { value: 2, done: false }
console.log(synchronousIterator.next()); // { value: 3, done: false }
console.log(synchronousIterator.next()); // { value: undefined, done: true }

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

// Sample generator function
function* sequenceGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

console.log(sequenceGenerator().next()); // { value: 1, done: false }

const sequence = sequenceGenerator();

for (const element of sequence) {
  console.log(element); // 1, 2, 3
}

// Custom iterable but with generators
const rangedIterableGeneratorSource = {
  start: 1,
  end: 3,

  *[Symbol.iterator]() {
    for (let current = this.start; current <= this.end; current++) {
      yield current;
    }
  },
};

for (const element of rangedIterableGeneratorSource) {
  console.log(element); // 1, 2, 3
}

// Asynchronous iterable interface
interface AsynchronousIterable<T> {
  [Symbol.asyncIterator](): AsynchronousIterator<T>;
}

interface AsynchronousIterator<T> {
  next(): Promise<AsynchronousIteratorResult<T>>;
}

interface AsynchronousIteratorResult<T> {
  value: T | undefined;
  done: boolean;
}

// Custom asynchronous iterable
interface AsynchronousRangedIterable extends AsynchronousIterable<number> {
  start: number;
  end: number;
}

const rangedIterableAsyncSource: AsynchronousRangedIterable = {
  start: 1,
  end: 3,

  [Symbol.asyncIterator]() {
    return {
      next: async () => {
        // a sample asynchronicity
        await new Promise((resolve) => setTimeout(resolve, 100));

        return this.start <= this.end
          ? { done: false, value: this.start++ }
          : { done: true, value: undefined };
      },
    };
  },
};

const sampleAsynchronousIteration = async () => {
  for await (const element of rangedIterableAsyncSource) {
    console.log(element);
  }
};

sampleAsynchronousIteration(); // 1, 2, 3

const rangeIterableAsyncGeneratorSsource = {
  start: 1,
  end: 3,
  async *[Symbol.asyncIterator]() {
    for (let current = this.start; current <= this.end; current++) {
      // a sample asynchronicity
      await new Promise((resolve) => setTimeout(resolve, 100));

      yield current;
    }
  },
};

const sampleAsyncGeneratorIteration = async () => {
  for await (const element of rangeIterableAsyncGeneratorSsource) {
    console.log(element);
  }
};

sampleAsyncGeneratorIteration(); // 1, 2, 3

// hacker news posts as an interation
import fetch from "node-fetch";

const hackerNewsTopPostsGeneratorSource = {
  limit: 10,
  async *[Symbol.asyncIterator]() {
    const topStoriesRequest = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );

    const topStories = await topStoriesRequest.json();

    for (const storyID of topStories.slice(0, this.limit)) {
      const storyRequest = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${storyID}.json`
      );
      
      const { title, url } = await storyRequest.json();
      yield { title, url }
    }
  }
};

const hackerNewsGenerator = async () => {
  for await (const story of hackerNewsTopPostsGeneratorSource) {
    console.log(story);
  }
};

hackerNewsGenerator();
